// Resolved from this module's own URL, carrying its ?v= across to the
// stylesheet. That keeps the cache-busting version in exactly one place -
// CARD_VERSION in __init__.py - so the two can never drift apart.
const HOCKEY_CSS_URL = new URL(
  "hockey-scorebug-card.css" + new URL(import.meta.url).search,
  import.meta.url
).href;

// The stylesheet cannot live in document.head: Home Assistant renders the
// dashboard inside shadow roots, and a global stylesheet does not cross a
// shadow boundary. It has to be a <style> inside the card's own subtree, the
// way this card has always done it - the only change here is that the text now
// comes from a real .css file instead of a literal in this module.
//
// Fetched once, at module load, and shared by every card instance. Starting it
// here rather than on first render means it has long since landed by the time
// a dashboard is on screen.
let hockeyCssText = null;
const hockeyCssReady = fetch(HOCKEY_CSS_URL)
  .then((r) => {
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    return r.text();
  })
  .then((text) => {
    hockeyCssText = text;
  })
  .catch((err) => {
    console.error(`Failed to load ${HOCKEY_CSS_URL}`, err);
  });

const HOCKEY_EDITOR_SCHEMA = [
  {
    name: "entity",
    required: true,
    selector: { entity: { domain: "sensor", integration: "hockey" } },
  },
  // {
  //   name: "layout",
  //   selector: {
  //     select: {
  //       mode: "dropdown",
  //       options: [
  //         { value: "auto", label: "Automatic" },
  //         { value: "stacked", label: "Stacked" },
  //         { value: "side_by_side", label: "Side by side" },
  //         { value: "split", label: "Split" },
  //       ],
  //     },
  //   },
  // },
];

const HOCKEY_LAYOUTS = ["stacked", "side_by_side", "split"];

/** Sensors belonging to this integration, for the picker and the stub config. */
function hockeyEntities(hass) {
  if (!hass) return [];
  const registry = Object.values(hass.entities || {});
  const fromRegistry = registry
    .filter((e) => e.platform === "hockey" && String(e.entity_id).startsWith("sensor."))
    .map((e) => e.entity_id);
  if (fromRegistry.length) return fromRegistry;
  // Older cores expose no entity registry to the frontend; fall back to the
  // attributes only this integration sets.
  return Object.keys(hass.states || {}).filter((id) => {
    const a = hass.states[id].attributes || {};
    return id.startsWith("sensor.") && ("head_to_head" in a || "game_type" in a);
  });
}

class hockeyScorebugCard extends HTMLElement {
  setConfig(config) {
    // The visual editor treats a throw here as "config not valid yet".
    if (!config || !config.entity) {
      throw new Error("You need to pick a hockey sensor entity");
    }
    if (config.layout && config.layout !== "auto" && !HOCKEY_LAYOUTS.includes(config.layout)) {
      throw new Error("layout must be 'stacked', 'side_by_side' or 'split'");
    }
    this.config = config;
  }

  // Explicit config wins; otherwise keep the long-standing per-state look
  // (upcoming games stacked, live/final games side by side).
  layoutClass(isLive, isFinal) {
    const l = this.config && this.config.layout;
    const layout = HOCKEY_LAYOUTS.includes(l) ? l : "side_by_side";
    return ` hockey-layout-${layout.replace(/_/g, "-")}`;
  }

  set hass(hass) {
    this.hassObj = hass;
    const entity = hass.states[this.config.entity];
    
    if (!entity) {
      this.innerHTML = `<div style="padding: 16px; color: red;">Entity not found: ${this.config.entity}</div>`;
      return;
    }

    // Theme is part of the key so switching light/dark re-renders and swaps
    // the logo variant; state is included so a state-only change still paints.
    const currentAttributesStr =
      JSON.stringify(entity.attributes) + "|" + entity.state + "|" + this.isDarkMode();
    if (this.lastAttributesStr !== currentAttributesStr) {
      this.lastAttributesStr = currentAttributesStr;
      this.render(entity);
    }
  }

  startCountdown(initialTime, clockElement) {
    // Clear any existing interval
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    // Parse time in MM:SS format, removing leading zeros from minutes
    const parseTime = (timeStr) => {
      const parts = timeStr.split(':');
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    };

    let secondsRemaining = parseTime(initialTime);

    // Update the clock every second
    this.countdownInterval = setInterval(() => {
      if (secondsRemaining <= 0) {
        clearInterval(this.countdownInterval);
        return;
      }

      secondsRemaining--;
      const minutes = Math.floor(secondsRemaining / 60);
      const seconds = secondsRemaining % 60;
      const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;
      
      if (clockElement) {
        clockElement.textContent = formattedTime;
      }
    }, 1000);
  }

  render(entity) {
    // console.log(entity)
    const state = entity.state;
    const attrs = entity.attributes;

    // The sensor drops its game attributes whenever the coordinator has no
    // data (no game scheduled) or the last update failed (entity goes
    // unavailable). Bail out before dereferencing attrs.home / attrs.away.
    if (!attrs || !attrs.home || !attrs.away) {
      this.renderPlaceholder(state, entity);
      return;
    }

    // Extract game information
    const homeScore = attrs.home_score !== undefined ? attrs.home_score : "";
    const awayScore = attrs.away_score !== undefined ? attrs.away_score : "";
    // Use a null check, not ||, so a genuine 0 renders as "0" rather than blank.
    const homeSOG = attrs.home_sog ?? "";
    const awaySOG = attrs.away_sog ?? "";
    
    // Handle both hockey (period_number) and NHL (current_period.number) formats
    const periodNumber = attrs.periodNumber || "";
    const periodType = attrs.periodType || "";
    let periodTime = attrs.time_remaining || attrs.periodTimeRemaining || "";
    // Remove leading zero from minutes if present (e.g., "05:30" -> "5:30")
    if (periodTime && periodTime[0] === "0") {
      periodTime = periodTime.substring(1);
    }
    const nextGameDateTime = attrs.datetime || "";
    const nextGameTime = this.formatGameTime(nextGameDateTime);
    const clockRunning = attrs.clock_running || false;
    const broadcasts = Array.isArray(attrs.broadcasts) ? attrs.broadcasts.filter(Boolean) : [];

    const isIntermission = attrs.isIntermission || false;

    // Determine if game is live
    const isLive = state == "LIVE" || state == "CRIT" ;
    const isFinal = state === "FINAL" || state === "UnofficialFinal" || state === "OFF" ;

    // Play is stopped: a whistle, or an intermission. Tested against `false`
    // rather than for falsiness because HockeyTech publishes no clock_running
    // at all, and an absent value must not claim the clock has stopped.
    const clockStopped = isLive && (attrs.clock_running === false || isIntermission);

    // Build time section
    const gameTypeTag = this.renderGameType(attrs);
    let timeHTML = "";
    const dateText = this.getFormattedGameDate(nextGameDateTime);
    const timeStr = nextGameTime || "";  
    const formattedPeriod = this.formatPeriodNumber(periodNumber, periodType, isIntermission);
    if (isLive) {
      timeHTML = `
        <div class="hockey-time-section">
          ${gameTypeTag}
          <div class="hockey-period">${formattedPeriod}</div>
          <div class="hockey-clock${clockStopped ? " hockey-time-stopped" : ""}" id="hockey-clock">${periodTime}</div>
          ${this.renderStrength(attrs)}
        </div>
      `;
    } else if (isFinal) {
      let extraText = ""
      // Show "Final" for completed games
      if ( formattedPeriod.includes("OT") ) {
        extraText = `<br>OT`;
      }
      if ( formattedPeriod.includes("SO") ) {
        extraText = `<br>SO`;
      }
      timeHTML = `
        <div class="hockey-time-section">
          ${gameTypeTag}
          <div class="hockey-date">${dateText}</div>
          <div class="hockey-final">Final${extraText}</div>
        </div>
      `;
    } else {
      // Use intelligent date formatting for future games

      
      timeHTML = `
        <div class="hockey-time-section">
          ${gameTypeTag}
          <div class="hockey-date">${dateText}</div>
          <div class="hockey-time">${timeStr}</div>
          ${broadcasts.length ? `<div class="hockey-network">${this.escapeHtml(broadcasts.join(" \u00b7 "))}</div>` : ""}
        </div>
      `;
    }

    const extras = [
      this.renderShootout(attrs),
      // this.renderLastResult(attrs),
      this.renderHeadToHead(attrs),
    ].filter(Boolean).join("\n              ");

    // Only show scores for live or final games, hide for future games
    const displayAwayScore = (isLive || isFinal) ? awayScore : "";
    const displayHomeScore = (isLive || isFinal) ? homeScore : "";

    const html = `
      <div class="hockey-scorebug-wrapper${this.trackedClass(attrs)}${this.layoutClass(isLive, isFinal)}"${this.colorStyle(attrs)}>
        <ha-card class="hockey-scorebug${this.layoutClass(isLive, isFinal)} ${isLive ? 'hockey-live' : isFinal ? 'hockey-final' : 'hockey-upcoming'}${this.situationClass(attrs, isLive)}">
            <!-- Away Team (Left) -->
            <div class="hockey-team hockey-away-team">
              ${this.renderLogo(attrs.away)}
              <div class="hockey-team-name">${ ( attrs.away.nickname )?attrs.away.nickname : attrs.away.name}${this.renderRecord(attrs.away)}</div>
              <div class="hockey-score">${displayAwayScore}</div>
              <div class="hockey-sog">${awaySOG}</div>
            </div>

            <!-- Time Section (Center) -->
            ${timeHTML}

            <!-- Home Team (Right) -->
            <div class="hockey-team hockey-home-team">
              ${this.renderLogo(attrs.home)}
              <div class="hockey-team-name">${ ( attrs.home.nickname )?attrs.home.nickname : attrs.home.name}${this.renderRecord(attrs.home)}</div>
              <div class="hockey-score">${displayHomeScore}</div>
              <div class="hockey-sog">${homeSOG}</div>
            </div>
            ${extras ? `<div class="hockey-extra">
              ${extras}
            </div>` : ""}
        </ha-card>
      </div>
    `;

    this.innerHTML = html;
    this.applyStyles();

    const details = this.querySelector(".hockey-h2h");
    if (details) {
      details.addEventListener("toggle", () => { this._h2hOpen = details.open; });
    }

    // Start countdown timer if clock is running (during play or intermission)
    if (isLive && isIntermission) {
      setTimeout(() => {
        const clockElement = this.querySelector("#hockey-clock");
        if (clockElement && periodTime) {
          this.startCountdown(periodTime, clockElement);
        }
      }, 0);
    } else if (this.countdownInterval) {
      // Clear countdown if clock is not running
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  escapeHtml(value) {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    const str = value === null || value === undefined ? "" : String(value);
    return str.replace(/[&<>"']/g, (ch) => map[ch]);
  }

  // The integration resolves team defaults and per-team overrides, so the card
  // just maps whatever it is handed onto CSS variables.
  colorVars(attrs) {
    const colors = (attrs && attrs.colors) || {};
    const map = {
      home_background: "--home-background",
      home_text: "--home-text",
      home_accent: "--home-accent",
      away_background: "--away-background",
      away_text: "--away-text",
      away_accent: "--away-accent",
      home_team_background: "--home-team-background",
      home_team_text: "--home-team-text",
      away_team_background: "--away-team-background",
      away_team_text: "--away-team-text",
    };
    return Object.keys(map)
      .filter((k) => colors[k])
      .map((k) => `${map[k]}:${colors[k]}`);
  }

  // Which side of this matchup the tracked team is on, so a card can be styled
  // from the point of view of the team it belongs to. The coordinator decides
  // it; the abbreviation comparison is only a fallback for a payload written
  // before tracked_side existed.
  trackedSide(attrs) {
    if (!attrs) return null;
    if (attrs.tracked_side === "home" || attrs.tracked_side === "away") {
      return attrs.tracked_side;
    }
    const tracked = attrs.tracked_abbr;
    if (!tracked) return null;
    if (attrs.home && attrs.home.abbr === tracked) return "home";
    if (attrs.away && attrs.away.abbr === tracked) return "away";
    return null;
  }

  // Special-teams state on the ha-card, beside hockey-live / hockey-final, so it
  // is keyed the same way as every other game-state class.
  // Each condition gets a bare class and a side-specific one, e.g.
  // "hockey-power-play hockey-power-play-home". The integration has already
  // discounted a pulled goalie's extra attacker, so an empty net alone is not
  // reported as a power play. Live only: only the NHL publishes a situation,
  // and a finished game has none to show.
  situationClass(attrs, isLive) {
    const s = isLive && attrs && attrs.situation;
    if (!s) return "";
    const cls = [];
    const add = (name, side) => {
      if (side === "home" || side === "away") cls.push(name, `${name}-${side}`);
    };
    add("hockey-power-play", s.power_play);
    add("hockey-empty-net", s.empty_net);
    return cls.length ? " " + cls.join(" ") : "";
  }

  // Appended to an existing class attribute, so it carries its own leading
  // space rather than becoming a second class="" the parser would drop.
  trackedClass(attrs) {
    const side = this.trackedSide(attrs);
    return side ? ` hockey-tracked-${side}` : "";
  }

  colorStyle(attrs) {
    const decls = this.colorVars(attrs);
    return decls.length ? ` style="${this.escapeHtml(decls.join(";"))}"` : "";
  }

  renderGameType(attrs) {
    // An ordinary regular-season game gets no tag at all. Competition wins over
    // milestone, though the two cannot currently coincide: openers are only
    // tagged on regular-season games, which carry no competition tag.
    // Priority: Preseason, Playoffs, Home Opener, Season Opener, Division Game.
    // game_type covers the first two; the sensor already collapses the rest
    // into a single milestone in that order.
    const labels = {
      preseason: "Preseason",
      playoffs: "Playoffs",
      home_opener: "Home Opener",
      season_opener: "Season Opener",
      divisional: "Division Game",
    };
    const label = labels[attrs.game_type] || labels[attrs.milestone];
    return label ? `<div class="hockey-game-type">${this.escapeHtml(label)}</div>` : "";
  }

  formatShortDate(iso) {
    if (!iso) return "";
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso));
    if (!m) return String(iso);
    // Built in local time on purpose: new Date("2025-11-10") is UTC midnight
    // and would render as the previous day west of Greenwich.
    const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  renderResultRow(g) {
    // Away first, then home, the way a scoreline is read. A meeting still to
    // come keeps the same elements with nothing in them, so a row of scheduled
    // games lines up column for column with the ones already played.
    const played = this.isPlayed(g);
    const team = (abbr, score, won) =>
      `<span class="hockey-h2h-team${won ? " hockey-h2h-win" : ""}">` +
      `${this.escapeHtml(abbr)} <span class="hockey-h2h-score">${played ? this.escapeHtml(score) : ""}</span></span>`;
    // Both feeds report REG/OT/SO, and REG reads as "Final".
    const label = played ? (g.result && g.result !== "REG" ? g.result : "Final") : "";
    return `<span class="hockey-h2h-result">${this.escapeHtml(label)}</span>` +
      team(g.away_abbr, g.away_score, played && g.away_score > g.home_score) +
      team(g.home_abbr, g.home_score, played && g.home_score > g.away_score);
  }

  // Which side of this matchup an abbreviation belongs to. Matched against both
  // teams rather than only home, so a feed that omits an abbreviation reports
  // no side instead of silently calling every game an away win.
  sideOf(attrs, abbr) {
    if (!abbr) return "";
    if (attrs.home && attrs.home.abbr === abbr) return "home";
    if (attrs.away && attrs.away.abbr === abbr) return "away";
    return "";
  }

  // The team that won a listed meeting, or null when it is a tie or has not
  // been played. A season series is between the two teams on this card, so the
  // winner is one of them and its crest is already in the payload.
  winnerTeam(attrs, g) {
    if (!this.isPlayed(g) || g.home_score === g.away_score) return null;
    const abbr = g.home_score > g.away_score ? g.home_abbr : g.away_abbr;
    const side = this.sideOf(attrs, abbr);
    return side === "home" ? attrs.home : side === "away" ? attrs.away : null;
  }

  // The crest as CSS values, ready to paint. A url() cannot be assembled out of
  // a variable, so the whole function has to be the value; anything that could
  // close it early means the declaration is dropped rather than escaped. Leagues
  // that ship one logo simply get --logo, with no dark counterpart to offer.
  logoStyle(team) {
    if (!team) return "";
    const decls = [];
    const add = (name, url) => {
      if (url && !/["'()\\]/.test(url)) decls.push(`${name}:url("${url}")`);
    };
    add("--logo", team.logo);
    add("--logo-dark", team.logo_dark);
    return decls.length ? ` style="${this.escapeHtml(decls.join(";"))}"` : "";
  }

  // A playoff game the series may not need. Emitted only when true, so the
  // attribute's presence is the whole signal.
  ifNecessary(g) {
    return g.if_necessary ? ` data-if-necessary="true"` : "";
  }

  // `played` is set by the integration; the score check is what an older
  // payload, written before the flag existed, is judged on.
  isPlayed(g) {
    if (typeof g.played === "boolean") return g.played;
    return g.home_score != null && g.away_score != null;
  }

  renderStrength(attrs) {
    // Only the NHL feed reports on-ice strength, and only while the skaters
    // are uneven or a net is empty - even strength publishes nothing at all.
    const s = attrs.situation;
    if (!s || !s.strength) return "";
    const bits = [`<span class="hockey-strength-count">${this.escapeHtml(s.strength)}</span>`];
    if (s.descriptor) {
      bits.push(`<span class="hockey-strength-label">${this.escapeHtml(s.descriptor)}</span>`);
    }
    if (s.time_remaining) {
      let t = String(s.time_remaining);
      if (t[0] === "0") t = t.substring(1);
      bits.push(`<span class="hockey-strength-time">${this.escapeHtml(t)}</span>`);
    }
    return `<div class="hockey-strength" data-strength="${this.escapeHtml(s.strength)}"` +
      ` data-advantage="${this.escapeHtml(s.advantage || "even")}"` +
      (s.empty_net ? ` data-empty-net="${this.escapeHtml(s.empty_net)}"` : "") +
      `>${bits.join("")}</div>`;
  }

  renderShootout(attrs) {
    const so = attrs.shootout;
    if (!so || !Array.isArray(so.attempts) || !so.attempts.length) return "";

    const rounds = [...new Set(so.attempts.map((a) => a.round))].sort((x, y) => x - y);
    // away on top, home beneath, matching the away @ home order used elsewhere.
    const find = (side, round) => so.attempts.find((a) => a.side === side && a.round === round);
    const name = (team) => (team && (team.nickname || team.name)) || "";

    const cell = (side, round) => {
      const a = find(side, round);
      // A shootout stops the moment it is decided, so the last round can be
      // missing one side entirely - that cell is empty rather than a miss.
      if (!a) return `<td class="hockey-so-cell"></td>`;
      const cls = ["shot", "hockey-so-dot", a.scored ? "hockey-so-goal" : "hockey-so-miss"];
      if (a.winner) cls.push("hockey-so-winner");
      const who = [a.player, a.goalie ? `vs ${a.goalie}` : null].filter(Boolean).join(" ");
      const title = `${who || (a.side === "home" ? "Home" : "Away")} - ${a.scored ? "goal" : "save"}`;
      return `<td><div class="${cls.join(" ")}"></div><span class="hockey-shootout-narrative">${this.escapeHtml(title)}</span></td>`;
    };

    const row = (side) =>
      `<tr data-side="${side}">` +
      `<td class="hockey-so-team">${this.escapeHtml(name(attrs[side]))}</td>` +
      rounds.map((r) => cell(side, r)).join("") +
      `</tr>`;

    const head = rounds
      .map((r) => `<td class="hockey-so-num">Round ${this.escapeHtml(r)}</td>`)
      .join("");
    const tally = `${this.escapeHtml(so.away_goals)}-${this.escapeHtml(so.home_goals)}`;

    return `<div class="hockey-shootout">` +
      `<span class="hockey-so-label">Shootout ${tally}</span>` +
      `<table>` +
      `<thead><tr><td>Team</td>${head}</tr></thead>` +
      `<tbody>${row("away")}${row("home")}</tbody>` +
      `</table></div>`;
  }

  renderLastResult(attrs) {
    // Present only between the finished game leaving the main bug and the next
    // game getting close; the sensor decides, the card just renders it.
    const g = attrs.last_result;
    if (!g || g.home_score == null || g.away_score == null) return "";
    return `<div class="hockey-last-result">` +
      `<span class="hockey-h2h-date">${this.escapeHtml(this.formatShortDate(g.date))}</span>` +
      this.renderResultRow(g) + `</div>`;
  }

  seriesSummary(h2h) {
    // wins/losses are from the tracked team's point of view; the label names
    // whoever is ahead, so the score reads high-low regardless of who that is.
    const wins = h2h.wins || 0;
    const losses = h2h.losses || 0;
    const title = h2h.kind === "playoffs" ? "Playoff Series" : "Season Series";
    if (!wins && !losses) {
      return title;
    }
    if (wins === losses) {
      return `${title} Tied <strong>${wins}-${losses}</strong>`;
    }
    const leader = wins > losses ? h2h.team_abbr : h2h.opponent_abbr;
    const high = Math.max(wins, losses);
    const low = Math.min(wins, losses);
    const score = `<strong>${high}-${low}</strong>`;
    // Only the NHL says how many wins a playoff round takes; without it a
    // decided series still reads "Leads" rather than guessing it is over.
    const verb = h2h.needed_to_win && high >= h2h.needed_to_win ? "Wins" : "Leads";
    // Fall back to the plain record if the feed gave us no abbreviation.
    return leader ? `${title} ${this.escapeHtml(leader)} ${verb} ${score}` : `${title} ${score}`;
  }

  renderSeriesProgress(attrs) {
    // One marker per scheduled meeting, so the games still to come are
    // representable alongside the ones already played. Deliberately unstyled:
    // the outcome rides on the data attributes for the stylesheet to pick up.
    //
    // Two readings of the same result are offered because both get styled:
    // data-result is the tracked team's (win/loss), data-winner names the side
    // of *this* matchup that won, so a marker can take the same colour as the
    // team panel it belongs under.
    const h2h = attrs && attrs.head_to_head;
    if (!h2h || !h2h.scheduled) return "";
    const games = Array.isArray(h2h.games) ? h2h.games : [];

    const cells = games.map((g) => {
      const date = ` title="${this.escapeHtml(this.formatShortDate(g.date))}"`;
      if (!this.isPlayed(g)) {
        return `<span class="hockey-series-game" data-result="upcoming"${this.ifNecessary(g)}${date}></span>`;
      }
      const tie = g.home_score === g.away_score;
      const winnerAbbr = g.home_score > g.away_score ? g.home_abbr : g.away_abbr;
      const winner = tie ? "" : this.sideOf(attrs, winnerAbbr);
      const result = tie ? "tie" : g.tracked_won ? "win" : "loss";
      return `<span class="hockey-series-game" data-result="${result}"` +
        ` data-winner="${tie ? "tie" : winner}"` +
        ` data-winner-abbr="${this.escapeHtml(winnerAbbr || "")}"` +
        `${date}></span>`;
    });

    return `<div class="hockey-series"` +
      ` data-scheduled="${this.escapeHtml(h2h.scheduled)}"` +
      ` data-played="${games.filter((g) => this.isPlayed(g)).length}"` +
      ` data-remaining="${this.escapeHtml(h2h.remaining || 0)}">${cells.join("")}</div>`;
  }

  renderHeadToHead(attrs) {
    const h2h = attrs.head_to_head;
    if (!h2h || !Array.isArray(h2h.games) || !h2h.games.length) return "";

    // It takes more than one game to make a series. A lone meeting says so, in
    // the same spot, rather than an accordion holding a single row. `games`
    // lists every meeting on the calendar, played or not, so a length of one
    // means this is the only time the two teams meet.
    //
    // Two exceptions. A playoff round is a series however much of it has been
    // scheduled so far, so it always gets the accordion. And a preseason card
    // cannot vouch for "only meeting": the preseason game is never part of the
    // series, so a lone listed game is not this one, or the regular season is
    // not published yet - either way the line would claim more than is known.
    if (h2h.games.length === 1 && h2h.kind !== "playoffs") {
      if (attrs.game_type === "preseason") return "";
      return `<div class="hockey-single-meeting">Only meeting of the season</div>`;
    }

    const rows = h2h.games.map((g) =>
      `<li data-played="${this.isPlayed(g)}"${this.ifNecessary(g)}${this.logoStyle(this.winnerTeam(attrs, g))}>` +
      `<span class="hockey-h2h-date">${this.escapeHtml(this.formatShortDate(g.date))}</span>` +
      this.renderResultRow(g) + `</li>`
    ).join("");

    // `open` is restored from the instance so a live-game re-render every 15s
    // does not snap the accordion shut under the user.
    return `<details class="hockey-h2h"${this._h2hOpen ? " open" : ""}>` +
      `<summary>${this.seriesSummary(h2h)}${this.renderSeriesProgress(attrs)}</summary>` +
      `<ul>${rows}</ul></details>`;
  }

  recordTooltip(rec) {
    const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
    const parts = [];
    if (rec.wins != null) parts.push(plural(rec.wins, "win", "wins"));
    if (rec.losses != null) parts.push(plural(rec.losses, "loss", "losses"));
    // Leagues that split overtime and shootout losses report both, and the
    // record string shows them as separate digits, so name them separately.
    if (rec.ot_losses != null && rec.shootout_losses != null) {
      parts.push(plural(rec.ot_losses, "overtime loss", "overtime losses"));
      parts.push(plural(rec.shootout_losses, "shootout loss", "shootout losses"));
    } else if (rec.overtime_losses != null) {
      parts.push(plural(rec.overtime_losses, "overtime loss", "overtime losses"));
    }
    if (!parts.length) return "";

    let tip = parts.join(", ");
    if (rec.points != null && rec.games_played != null) {
      tip += ` (${plural(rec.points, "point", "points")} in ${plural(rec.games_played, "game", "games")})`;
    }
    return tip;
  }

  renderRecord(team) {
    const rec = team && team.record;
    if (!rec || !rec.record) return "";
    const tip = this.recordTooltip(rec);
    const title = tip ? ` title="${this.escapeHtml(tip)}"` : "";
    return `<span class="hockey-record"${title}>${this.escapeHtml(rec.record)}</span>`;
  }

  isDarkMode() {
    const themes = this.hassObj && this.hassObj.themes;
    if (themes && typeof themes.darkMode === "boolean") return themes.darkMode;
    // Home Assistant did not report a mode - fall back to the OS preference.
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  teamLogo(team) {
    // Leagues that ship one logo simply have no dark variant to prefer.
    if (!team) return "";
    return (this.isDarkMode() && team.logo_dark) || team.logo || "";
  }

  renderLogo(team) {
    const src = this.teamLogo(team);
    if (!src) return "";
    return `<img src="${this.escapeHtml(src)}" class="hockey-logo" alt="${this.escapeHtml(team.name || "")}">`;
  }

  placeholderText(state) {
    if (state === "unavailable") return "Unavailable";
    if (state === "unknown" || state === "No data") return "No game scheduled";
    return state ? this.escapeHtml(state) : "No game scheduled";
  }

  renderPlaceholder(state, entity) {
    // A placeholder replaces the scorebug, so any running clock is now orphaned.
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }

    // The sensor supplies the tracked team even with no game, so the card can
    // show who it is rather than just the entity name.
    const attrs = (entity && entity.attributes) || {};
    const team = attrs.team || null;
    const name = (team && (team.name || team.nickname)) || attrs.friendly_name || "";
    const logoSrc = this.teamLogo(team);
    const logo = logoSrc
      ? `<img src="${this.escapeHtml(logoSrc)}" class="hockey-logo" alt="${this.escapeHtml(name)}">`
      : "";
    const title = name ? `<div class="hockey-team-name">${this.escapeHtml(name)}</div>` : "";
    this.innerHTML = `
      <div class="hockey-scorebug-wrapper${this.trackedClass(attrs)}${this.layoutClass(false, false)}"${this.colorStyle(attrs)}>
        <ha-card class="hockey-scorebug${this.layoutClass(false, false)} hockey-empty">
          ${logo || title ? `<div class="hockey-team">
            ${logo}
            ${title}
          </div>` : ""}
          <div class="hockey-empty-text">${this.placeholderText(state)}</div>
        </ha-card>
      </div>
    `;
    this.applyStyles();
  }

  formatPeriodNumber(periodNumber, periodType, isIntermission) {
    if (!periodNumber && periodNumber !== 0) return "";
    
    let IntermissionText = ""
    if (isIntermission){
      IntermissionText = " Int"
    }
    const num = parseInt(periodNumber, 10);
    
    // Check period type first
    if (periodType === "SO") {
      return "SO" + IntermissionText;
    }
    
    if (periodType === "OT") {
      // For overtime, calculate OT number: periodNumber - 3
      const otNumber = num - 3;
      return `OT ${otNumber} ${IntermissionText}`;
    }
    
    // Regular periods: 1st, 2nd, 3rd
    if (num === 1) return "1st" + IntermissionText;
    if (num === 2) return "2nd" + IntermissionText;
    if (num === 3) return "3rd" + IntermissionText;
    
    // Fallback for unexpected periods
    return `P${periodNumber}`;
  }

  getFormattedGameDate(isoDateTimeString) {
    if (!isoDateTimeString) return "";
    
    try {
      const gameDate = new Date(isoDateTimeString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      // Normalize dates to compare just the date part
      const gameDateNormalized = new Date(gameDate.getFullYear(), gameDate.getMonth(), gameDate.getDate());
      const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const tomorrowNormalized = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
      
      // Check if game is today
      if (gameDateNormalized.getTime() === todayNormalized.getTime()) {
        // determine if the game should be labeled as today or tonight
        if (gameDate.getHours() < 18) {
          return "Today";
        } else {
          return "Tonight";
        }
      }
      
      // Check if game is tomorrow
      if (gameDateNormalized.getTime() === tomorrowNormalized.getTime()) {
        return "<span class=\"tomorrow\">Tomorrow</span>";
      }
      
      // For dates further out, use short format: "Mon, Dec 31"
      const dayOfWeek = gameDate.toLocaleDateString("en-US", { weekday: "short" });
      const month = gameDate.toLocaleDateString("en-US", { month: "short" });
      const day = gameDate.getDate();
      
      return `<span class="weekday">${dayOfWeek}, </span>${month} ${day}`;
    } catch (e) {
      console.error("Error formatting game date:", e);
      return "";
    }
  }

  formatGameTime(isoDateTimeString) {
    if (!isoDateTimeString) return "";
    
    try {
      const gameDate = new Date(isoDateTimeString);
      const hours = gameDate.getHours();
      const minutes = gameDate.getMinutes();
      
      // Determine AM/PM
      const period = hours >= 12 ? "PM" : "AM";
      
      // Convert to 12-hour format
      let displayHours = hours % 12;
      displayHours = displayHours === 0 ? 12 : displayHours;
      
      // Only show minutes if not 00
      const timeString = minutes === 0 ? `${displayHours} ${period}` : `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
      
      return timeString;
    } catch (e) {
      console.error("Error formatting game time:", e);
      return "";
    }
  }

  applyStyles() {
    // innerHTML wiped whatever was here, so a fresh node goes in every render.
    // Unlike before, the 9 KB of CSS is not rebuilt each time - it is one
    // cached string, so this is a cheap assignment even with a running clock.
    const style = document.createElement("style");
    if (hockeyCssText !== null) {
      style.textContent = hockeyCssText;
    } else {
      // Only the very first render can land here, before the fetch resolves.
      hockeyCssReady.then(() => {
        if (hockeyCssText !== null) style.textContent = hockeyCssText;
      });
    }
    this.insertBefore(style, this.firstChild);
  }

  getCardSize() {
    return 3;
  }

  

  static async getConfigElement() {
    // Creating a built-in card editor pulls ha-form and its selectors into the
    // page; without it the element can be undefined on a cold dashboard load.
    try {
      const helpers = await window.loadCardHelpers();
      const card = await helpers.createCardElement({ type: "entities", entities: [] });
      await card.constructor.getConfigElement();
    } catch (e) {
      // Non-fatal: the editor falls back to a plain picker below.
    }
    return document.createElement("hockey-scorebug-card-editor");
  }

  static getStubConfig(hass) {
    // `title` is deliberately absent: the card never renders one.
    const found = hockeyEntities(hass);
    return {
      type: "custom:hockey-scorebug-card",
      ...(found[0] ? { entity: found[0] } : {}),
    };
  }
}

class hockeyScorebugCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config || {};
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _emit(config) {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  _render() {
    if (!this._config || !this._hass) return;

    if (customElements.get("ha-form")) {
      if (!this._form) {
        this._form = document.createElement("ha-form");
        this._form.computeLabel = (schema) =>
          ({ entity: "Hockey sensor", layout: "Layout" })[schema.name] || schema.name;
        this._form.addEventListener("value-changed", (ev) => {
          ev.stopPropagation();
          // ha-form only manages the entity, so merge instead of replacing -
          // otherwise picking a team would wipe the colour overrides.
          const next = { ...this._config, ...ev.detail.value };
          if (!next.layout || next.layout === "auto") delete next.layout;
          this._emit(next);
        });
        this.innerHTML = "";
        this.appendChild(this._form);
      }
      this._form.hass = this._hass;
      this._form.schema = HOCKEY_EDITOR_SCHEMA;
      this._form.data = {
        entity: this._config.entity,
        layout: this._config.layout || "auto",
      };
    } else {
      this._renderFallback();
    }
  }

  _renderFallback() {
    // ha-form unavailable: a native picker still beats hand-writing YAML.
    if (!this._select) {
      this.innerHTML = `<label style="display:block;padding:8px 0">Hockey sensor</label>`;
      this._select = document.createElement("select");
      this._select.style.width = "100%";
      this._select.addEventListener("change", () => {
        this._emit({ ...this._config, entity: this._select.value });
      });
      this.appendChild(this._select);
    }
    const options = hockeyEntities(this._hass);
    if (this._config.entity && !options.includes(this._config.entity)) {
      options.unshift(this._config.entity);
    }
    this._select.innerHTML = options
      .map((id) => `<option value="${id}">${(this._hass.states[id]?.attributes?.friendly_name) || id}</option>`)
      .join("");
    this._select.value = this._config.entity || "";
  }
}

customElements.define("hockey-scorebug-card", hockeyScorebugCard);
customElements.define("hockey-scorebug-card-editor", hockeyScorebugCardEditor);

// Register card with Home Assistant's card registry for discovery.
// Guard against duplicate registrations when the module is re-evaluated.
window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "hockey-scorebug-card")) {
  window.customCards.push({
    type: "hockey-scorebug-card",
    name: "Hockey Scorebug",
    description: "Display hockey game scorebugs with live game information",
    preview: true,
  });
}
