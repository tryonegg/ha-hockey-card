// Resolved from this module's own URL, carrying its ?v= across to the
// stylesheet. That keeps the cache-busting version in exactly one place -
// CARD_VERSION in __init__.py - so the two can never drift apart.
const hockeyCssText = ".hockey-scorebug-wrapper {\n\tcontainer-type: inline-size;\n\tcontainer-name: hockeyCard;\n\n\t/* Defaults to the team's home colours - also what an untracked-side\n\tcard (no game scheduled / unavailable) gets, since neither tracked\n\tclass is present there. */\n\t--background-color: var(--home-background);\n\t--text-color: var(--home-text);\n\t--accent-color: var(--home-accent);\n\n\t&.hockey-tracked-away {\n\t\t--background-color: var(--away-background);\n\t\t--text-color: var(--away-text);\n\t\t--accent-color: var(--away-accent);\n\t}\n\n}\n\n.hockey-scorebug{\n\twidth: 100%;\n\tdisplay: grid;\n\n\talign-items: center;\n\tjustify-content: center;\n\tgap: 0 8px;\n\tbox-sizing: border-box;\n\tpadding: 8px;\n\n\tborder-radius: var(--ha-card-border-radius, var(--ha-border-radius-lg));\n\ttransition: none;\n\n\t* {\n\t\tbox-sizing: border-box;\n\t}\n\n\t.hockey-team{\n\t\tposition: relative;\n\n\t\t.hockey-record {\n\t\t\tdisplay: block;\n\t\t\tcursor: help;\n\t\t\tfont-size: 0.8em;\n\t\t\tfont-weight: normal;\n\t\t\topacity: 0.6;\n\n\t\t}\n\t}\n\n\t.hockey-extra{\n\t\tz-index: 1;\n\t\tgrid-area: extra;\n\t}\n\n\t.hockey-h2h{\n\t\t.hockey-series{\n\t\t\tmargin-top: 5px;\n\t\t\tdisplay: flex;\n\t\t\tflex-wrap: nowrap;\n\t\t\tgap: 10px;\n\t\t\tdisplay: none;\n\t\t\t.hockey-series-game{\n\t\t\t\tflex-grow: 1;\n\t\t\t\theight: 10px;\n\t\t\t\tbackground: #DCD9D2;\n\t\t\t\tdisplay: block;\n\t\t\t\t&[data-result=\"win\"]{\n\t\t\t\t\tbackground: var(--accent-color);\n\t\t\t\t}\n\t\t\t\t&[data-result=\"loss\"]{\n\t\t\t\t\tbackground: repeating-linear-gradient(135deg,#EDEBE6 0 3px,#E2DFD8 3px 6px);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tul{\n\t\t\tlist-style: none;\n\t\t\tpadding: 0;\n\t\t\tmargin-top: 2em;\n\t\t\tgap: 1em;\n\t\t\tdisplay: grid;\n\t\t\tgrid-template-columns: repeat(auto-fit, minmax(90px, 1fr));\n\t\t}\n\t\tli{\n\t\t\tborder: 1px solid color-mix(in srgb, currentColor, transparent 75%);\n\t\t\tborder-radius: var(--ha-border-radius-lg);\n\t\t\tpadding: 8px;\n\t\t\tdisplay: flex;\n\t\t\tflex-wrap: wrap;\n\t\t\tgap: 5px;\n\t\t\toverflow: hidden;\n\t\t\tposition: relative;\n\t\t\t&:before{\n\t\t\t\tz-index: -1;\n\t\t\t\tdisplay: block;\n\t\t\t\tposition: absolute;\n\t\t\t\tcontent: \"\";\n\t\t\t\ttop: 0;\n\t\t\t\tright: 0;\n\t\t\t\tbottom: 0;\n\t\t\t\tleft: 0;\n\t\t\t\topacity: 0.10;\n\t\t\t\tscale: 1.5;\n\t\t\t\tbackground: var(--logo);\n\t\t\t\tbackground-size: contain;\n\t\t\t\tbackground-repeat: no-repeat;\n\t\t\t\tbackground-position: center;\n\t\t\t}\n\t\t\t.hockey-h2h-team {\n\t\t\t\tdisplay: flex;\n\t\t\t\tjustify-content: space-between;\n\t\t\t\tflex-basis: 100%;\n\t\t\t\tflex-grow: 1;\n\t\t\t\tflex-shrink: 1;\n\t\t\t\tfont-size: 1.2em;\n\t\t\t\t&:not(.hockey-h2h-win){\n\t\t\t\t\tcolor: color-mix(in srgb, currentColor, transparent 40%);\n\t\t\t\t}\n\t\t\t}\n\t\t\t.hockey-h2h-win{\n\t\t\t\tfont-weight: 900;\n\t\t\t}\n\t\t\t.hockey-h2h-result{\n\t\t\t\tdisplay: none;\n\t\t\t\tflex-basis: 40%;\t\t\t\n\t\t\t\torder: 4;\n\t\t\t\tflex-grow: 1;\n\t\t\t\tcolor: color-mix(in srgb, currentColor, transparent 60%);\n\n\t\t\t}\n\t\t\t.hockey-h2h-date{\n\t\t\t\tflex-basis: 50%;\n\t\t\t\tflex-grow: 1;\n\t\t\t\torder: 0;\n\t\t\t\ttext-align: center;\n\t\t\t\t/* \t\t\t\tcolor: color-mix(in srgb, currentColor, transparent 60%); */\n\t\t\t}\n\t\t}\n\t}\t\n\n\t.hockey-shootout{\n\t\tfont-weight: 900;\n\t\ttext-transform: uppercase;\t\t\n\t\t.hockey-so-label{\n\t\t\ttext-align: center;\n\t\t\twidth: 100%;\n\t\t\tdisplay: block;\n\t\t\tposition: absolute;\n\t\t\tleft: -1000px;\n\t\t}\n\t\tthead{\n\t\t\tposition: absolute;\n\t\t\tleft: -1000px;\n\t\t}\n\t\ttd:first-of-type{\n\t\t\tpadding-right: 1em;\n\t\t}\n\t\t.hockey-so-dot{\n\t\t\tborder-radius: 100px;\n\t\t\theight: 16px;\n\t\t\twidth: 16px;\n\t\t\tbackground: #DCD9D2;\n\t\t\tdisplay: block;\n\t\t\t&.hockey-so-goal{\n\t\t\t\tbackground: currentColor;\n\t\t\t}\n\t\t}\n\t\t.hockey-shootout-narrative{\n\t\t\tdisplay: none;\n\t\t}\n\t}\t\n\n\t/* Unavailable / No game scheduled */\n\t&.hockey-empty{\n\t\tgrid-template: \"team\" \"extra\";\n\t\t--team-logo-size: 64px;\t\n\t\ttext-align: center;\n\t\tbackground: var(--background-color);\n\t\tcolor: var(--text-color);\n\t\tpadding: 1em;\n\t\t/* Tracks the same responsive sizing as the in-game logos. */\n\n\t\t.hockey-team{\n\t\t\tjustify-items: center;\n\t\t\t--team-layout: \"logo\" \"name\";\n\t\t}\n\n\t\t.hockey-logo {\n\t\t\theight: var(--team-logo-size);\n\t\t\twidth: var(--team-logo-size);\n\t\t\tobject-fit: contain;\n\t\t\tmargin-bottom: 6px;\n\t\t}\n\t\t.hockey-team-name {\n\t\t\tfont-size: 16px;\n\t\t\tfont-weight: bold;\n\t\t}\n\t\t.hockey-empty-text {\n\t\t\tfont-size: 14px;\n\t\t\topacity: 0.8;\n\t\t\tpadding-top: 4px;\n\t\t}\n\t}\n\n\t&.hockey-live{\n\t\t.hockey-home-team,\n\t\t.hockey-away-team{\n\t\t\t&:after,\n\t\t\t&:before{\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 50%;\n\t\t\t\twhite-space: nowrap;\n\t\t\t\ttransform: translate(-50%, -90%);\n\t\t\t\tfont-size: 0.8em;\n\t\t\t\tfont-weight: 900;\n\t\t\t\ttext-transform: uppercase;\n\t\t\t\tbackground: var(--accent-color);\n\t\t\t\tpadding: 0.25em 0.5em;\n\t\t\t\tborder-radius: 0 0 0.5em 0.5em;\n\t\t\t}\n\t\t\t&:after{\n\t\t\t\tbackground: none;\n\t\t\t\tcolor: var(--accent-color);\n\t\t\t\tfilter: invert(100%) saturate(0) contrast(1000%);\n\t\t\t}\n\t\t}\n\n\t\t/* power plays */\n\t\t&.hockey-power-play {\n\n\t\t\t&.hockey-power-play-home .hockey-home-team,\n\t\t\t&.hockey-power-play-away .hockey-away-team{\n\t\t\t\t&:after,\n\t\t\t\t&:before{\n\t\t\t\t\tcontent: \"Power Play\";\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t/* Empty Net */\n\t\t&.hockey-empty-net{\n\n\t\t\t&.hockey-empty-net-home .hockey-home-team,\n\t\t\t&.hockey-empty-net-away .hockey-away-team{\n\t\t\t\t&:after,\n\t\t\t\t&:before{\n\t\t\t\t\tcontent: \"Empty Net\";\t\t\t\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t&.hockey-power-play.hockey-empty-net{\n\t\t\toutline-color: blue;\n\t\t\t&.hockey-empty-net-home .hockey-home-team,\n\t\t\t&.hockey-empty-net-away .hockey-away-team{\n\t\t\t\t&:after,\n\t\t\t\t&:before{\n\t\t\t\t\tcontent: \"PP & EN\";\t\t\t\n\t\t\t\t}\n\t\t\t}\t\t\n\t\t}\n\n\t\t.hockey-strength{\n\t\t\tdisplay: flex;\n\t\t\tgap: 1em;\n\t\t\tjustify-content: center;\n\t\t}\n\t\t.hockey-strength-count{\n\t\t}\n\t\t.hockey-strength-label{\n\t\t\tdisplay: none;\n\t\t}\t\t\t\n\n\t}\n\n\t&.hockey-final{\n\t\t.hockey-game-type{\n\t\t\tdisplay: none;\n\t\t}\n\t}\n}\n\n\n/* Stacked */\n.hockey-scorebug.hockey-layout-stacked {\n\n\t.hockey-time-section {\n\t\tz-index: 1;\n\t\tgrid-area: time;\n\t\theight: 100%;\n\t}\n\n\t.hockey-team {\n\t\tz-index:1;\n\t\tdisplay: grid;\n\t\tgrid-template: var(--team-layout);\n\t\tgrid-template-columns: var(--team-column-size);\n\t\tgrid-template-rows: var(--team-row-size);\n\t\tgap: 0 8px;\n\n\t\t&.hockey-away-team {\n\t\t\tgrid-area: away;\n\t\t}\n\t\t&.hockey-home-team {\n\t\t\tgrid-area: home;\n\t\t}\n\t\t.hockey-team-name {\n\t\t\tfont-size: var(--team-name-font-size);\n\t\t\ttext-align: left;\n\t\t\twhite-space: nowrap;\n\t\t\ttext-overflow: ellipsis;\n\t\t\toverflow: hidden;\n\t\t\tgrid-area: name;\n\t\t\twidth: 100%;\n\t\t\tfont-size: 1.1em;\n\t\t\tfont-weight: 900;\n\t\t\ttext-transform: uppercase;\n\t\t}\n\n\n\t\t.hockey-logo {\n\t\t\theight: var(--team-logo-size);\n\t\t\twidth: var(--team-logo-size);\n\t\t\tgrid-area: logo;\n\t\t\toverflow: hidden;\n\t\t\t&[src*=\"nhl\"] {\n\t\t\t\tscale: 1.5;\n\t\t\t}\n\t\t}\n\n\t\t.hockey-score {\n\t\t\tfont-size: var(--team-score-font-size);\n\t\t\tfont-weight: bold;\n\t\t\tgrid-area: score;\n\t\t}\n\t\t.hockey-sog {\n\t\t\tfont-size: var(--team-sog-font-size);\n\t\t\tgrid-area: sog;\n\t\t}\t\t\n\t}\n\n\t/* Future Game */\n\t&.hockey-upcoming{\n\t\t--team-logo-size: 48px;\n\t\tpadding-right: 16px;\n\t\tgrid-template:\n\t\t\t\"time -\"\n\t\t\t\"time away\"\n\t\t\t\"time home\"\n\t\t\t\"time extra\";\n\t\tgrid-template-rows: 0px 1fr 1fr auto;\n\t\tgrid-template-columns: clamp(100px, 35%, 150px) 1fr;\n\t\tgap: 1em;\n\n\t\t.hockey-time-section{\n\t\t\tborder-radius: \n\t\t\t\tvar(--ha-card-border-radius, var(--ha-border-radius-lg))\n\t\t\t\t0\n\t\t\t\t0\n\t\t\t\tvar(--ha-card-border-radius, var(--ha-border-radius-lg));\n\t\t\tbackground: var(--background-color, #fff);\n\t\t\tcolor: var(--text-color, currentColor);\n\t\t\tpadding: 1.5em 8px;\n\t\t\tdisplay: flex;\n\t\t\tgap: 7px;\n\t\t\tflex-direction: column;\n\n\t\t\t.hockey-tracked-home & {\n\t\t\t\tfilter: var(--background-color, invert(1));\n\t\t\t}\t\t\n\n\t\t\tborder-right: 1px dotted color-mix(in srgb, currentColor, transparent 80%);\n\n\n\t\t\t.hockey-game-type {\n\t\t\t\tletter-spacing: 0.06em;\n\t\t\t\ttext-transform: uppercase;\n\t\t\t\tfont-size: 0.7em;\n\t\t\t}\n\t\t\t.hockey-date {\n\t\t\t\ttext-transform: uppercase;\n\t\t\t\tline-height: 1;\n\t\t\t\tfont-size: clamp(1em, 6cqw, 1.8em);\n\t\t\t\tfont-weight: 900;\n\t\t\t\t.tomorrow{\n\t\t\t\t\tfont-size: clamp(0.7em, 4.5cqw, 0.8em)\n\t\t\t\t}\n\t\t\t\t.weekday{\n\t\t\t\t\tdisplay: block;\n\t\t\t\t}\n\t\t\t}\t\t\n\t\t\t.hockey-time {\n\t\t\t\tfont-size: clamp(0.8em, 6cqw, 1em);\n\t\t\t\ttext-transform: uppercase;\n\t\t\t}\t\t\t\n\t\t\t.hockey-network {\n\t\t\t\tfont-size: 0.6em;\n\t\t\t\tfont-weight: bold;\n\t\t\t\tmax-width: 100%;\n\t\t\t\twhite-space: nowrap;\n\t\t\t\toverflow: hidden;\n\t\t\t\ttext-overflow: ellipsis;\n\t\t\t\topacity: 0.6;\n\t\t\t}\t\t\t\n\n\t\t}\t\t\n\n\t\t.hockey-team{\n\t\t\talign-items: center;\n\t\t\tjustify-items: start;\n\t\t\t--team-layout: \"logo name\";\n\t\t\t--team-column-size: var(--team-logo-size) 1fr;\n\t\t\t--team-row-size: 1fr;\t\n\t\t\t&.hockey-away-team {\n\t\t\t\talign-self: end;\n\t\t\t}\n\t\t\t&.hockey-home-team {\n\t\t\t\talign-self: start;\n\t\t\t}\n\t\t}\n\n\t\t.hockey-record{\n\t\t\tfont-size: 0.8rem;\n\t\t\topacity: 0.6;\n\t\t\tfont-weight: 600;\n\t\t\tdisplay: block;\n\t\t}\n\n\t\t.hockey-extra{\n\t\t\ttext-transform: uppercase;\n\t\t\tgrid-area: extra;\n\t\t\tborder-top: 1px solid var(--accent-color);\n\t\t\t/* \t\tcolor: color-mix(in srgb, currentColor, transparent 60%); */\n\t\t\tfont-size: 0.8rem;\n\t\t\tfont-weight: 600;\n\t\t\tpadding-top: 0.75em;\n\t\t\tpadding-bottom: 1em;\n\t\t\t&:empty{\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t}\n\n\t\t.hockey-sog{\n\t\t\tdisplay: none;\n\t\t}\n\n\n\t}\n\n\t/* Live Game */\n\t&.hockey-live,\n\t&.hockey-final{\n\n\t\tpadding: 16px;\n\t\tgrid-template: \"away time home\" \"extra extra extra\";\n\t\tgrid-template-columns: none;\n\t\tgrid-template-columns: 1fr 10em 1fr;\n\t\t--team-logo-size: 64px;\n\t\t--team-name-font-size: 22px;\n\t\t--team-score-font-size: 36px;\n\t\t--team-sog-font-size: 14px;\n\t\t--team-column-size: auto;\n\t\t--team-row-size: auto;\n\t\t--team-layout: \"logo score\" \"logo sog\" \"name extr\";\n\n\t\t.hockey-home-team{\n\t\t\t--team-layout: \" score logo\" \" sog logo\" \" extr name\";\t\n\t\t}\n\n\t\t/* \tGame Clock */\n\t\t.hockey-time-section{\n\t\t\ttext-align: center;\n\n\t\t\t.hockey-period{\n\t\t\t\tfont-weight: 900;\n\t\t\t}\n\n\t\t\t.hockey-clock,\n\t\t\t.hockey-date {\n\t\t\t\tfont-size: 18px;\n\t\t\t\tfont-size: var(--team-score-font-size);\n\t\t\t\tfont-weight: bold;\n\t\t\t\tposition: relative;\n\t\t\t\t&.hockey-time-stopped:before {\n\t\t\t\t\tcontent: var(--whistle);\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\twidth: 16px;\n\t\t\t\t\theight: 16px;\n\t\t\t\t\ttop: -1em;\n\t\t\t\t\tleft: 50%;\n\t\t\t\t\ttransform: translateX(-50%);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t.hockey-team{\n\t\t\tz-index: 1;\n\t\t\tdisplay: grid;\n\t\t\tgrid-template: var(--team-layout);\n\t\t\tgrid-template-columns: var(--team-column-size);\n\t\t\tgrid-template-rows: var(--team-row-size);\n\t\t\talign-items: center;\n\t\t\tjustify-items: center;\n\t\t\tgap: 0 8px;\n\t\t\t.hockey-team-name{\n\t\t\t\ttext-align: center;\n\t\t\t}\n\t\t\t.hockey-record{\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t}\n\t\t.hockey-extra:has(.hockey-shootout){\n\t\t\tjustify-self: center;\t\t\n\t\t}\n\n\t\t.hockey-game-type{\n\t\t\tdisplay: none;\n\t\t}\n\t}\n\t/* Final Game */\n\t&.hockey-final{\n\t\t.hockey-time-section{\n\t\t\t.hockey-clock,\n\t\t\t.hockey-date {\n\t\t\t\tfont-size: 18px !important;\n\t\t\t\tmargin-bottom: 0.5em;\n\t\t\t}\n\t\t}\n\t\t.hockey-h2h{\n\t\t\tmargin: 1em 0;\n\t\t\tpadding-top: 0.5em;\n\t\t\tborder-top: 2px solid var(--accent-color);\n\t\t}\n\t}\t\n}\n\n@media(max-width: ){\n\n}\n\n/* Side by Side */\n.hockey-scorebug.hockey-layout-side-by-side:not(.hockey-empty){\n\n\tgrid-template:\n\t\t\"time away\"\n\t\t\"time home\"\n\t\t\"extra extra\";\n\tgrid-template-rows: 1fr 1fr;\n\tgrid-template-columns: 50% 1fr;\n\t--team-layout: \"logo name\";\n\t--team-column-size: var(--logo-size) 1fr;\n\t--team-row-size: 1fr;\n\t--team-logo-size: 32px;\n\t--team-name-font-size: 11px;\n\t--team-score-font-size: 16px;\n\t--team-sog-font-size: 11px;\n\n\t&.hockey-upcoming{\n\t\t.hockey-sog,\n\t\t.hockey-score{\n\t\t\tdisplay: none;\n\t\t}\n\t}\n\n\t&.hockey-live {\n\t\tbox-shadow: inset 0 0 10px #00ff00aa;\n\t\tgrid-template-columns: 30% 1fr;\n\t\t--team-layout: \"logo name score sog\";\n\t\t--team-column-size: var(--team-logo-size) 1fr 1em 1em;\n\t\t--team-row-size: 1fr;\n\t\t/* &:has(.hockey-time-stopped){\n\t\tbox-shadow: inset 0 0 10px #ffff00aa;\n\t} */\n\t}\n\t&.hockey-final {\n\t\tgrid-template-columns: 30% 1fr;\n\t\t--team-layout: \"logo name score sog\";\n\t\t--team-column-size: var(--team-logo-size) 1fr 1em 1em;\n\t\t--team-row-size: 1fr;\n\t\t.weekday {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n\n\t* {\n\t\tbox-sizing: border-box;\n\t}\n\n\t/* Date Time Section */\n\t.hockey-time-section {\n\t\tz-index: 1;\n\t\tgrid-area: time;\n\t\ttext-align: center;\n\t\tdisplay: grid;\n\t\theight: 100%;\n\t\tgap: 5px;\n\t\talign-items: center;\n\n\t\t/* \tDate of the game */\n\t\t.hockey-date {\n\t\t\tfont-size: 18px;\n\t\t\tfont-weight: bold;\n\t\t}\n\n\t\t/* \tTime of the game */\n\t\t.hockey-time {\n\t\t}\n\n\t\t/* \tNetwork Game is on */\n\t\t.hockey-network {\n\t\t\tfont-size: 11px;\n\t\t\tfont-weight: bold;\n\t\t}\n\n\t\t/* \tGame Period */\n\t\t.hockey-period {\n\t\t}\n\n\t\t/* \tGame Clock */\n\t\t.hockey-clock {\n\t\t\tfont-size: 18px;\n\t\t\tfont-weight: bold;\n\t\t\tposition: relative;\n\t\t\t&.hockey-time-stopped:before {\n\t\t\t\tcontent: var(--whistle);\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 16px;\n\t\t\t\theight: 16px;\n\t\t\t\ttop: -1em;\n\t\t\t\tleft: 50%;\n\t\t\t\ttransform: translateX(-50%);\n\t\t\t}\n\t\t}\n\n\t\t/* \tFinal Text */\n\t\t.hockey-final {\n\t\t}\n\t}\n\n\t/* Team Section */\n\t.hockey-team {\n\t\tz-index:1;\n\t\tdisplay: grid;\n\t\tgrid-template: var(--team-layout);\n\t\tgrid-template-columns: var(--team-column-size);\n\t\tgrid-template-rows: var(--team-row-size);\n\t\talign-items: center;\n\t\tgap: 0 8px;\n\n\t\t&.hockey-away-team {\n\t\t\tgrid-area: away;\n\t\t}\n\t\t&.hockey-home-team {\n\t\t\tgrid-area: home;\n\t\t}\n\n\t\t.hockey-team-name {\n\t\t\tfont-size: var(--team-name-font-size);\n\t\t\tfont-weight: bold;\n\t\t\ttext-align: left;\n\t\t\twhite-space: nowrap;\n\t\t\ttext-overflow: ellipsis;\n\t\t\toverflow: hidden;\n\t\t\tgrid-area: name;\n\t\t}\n\t\t.hockey-score {\n\t\t\tfont-size: var(--team-score-font-size);\n\t\t\tfont-weight: bold;\n\t\t\tgrid-area: score;\n\t\t}\n\t\t.hockey-sog {\n\t\t\tfont-size: var(--team-sog-font-size);\n\t\t\tgrid-area: sog;\n\t\t}\n\t\t.hockey-logo {\n\t\t\theight: var(--team-logo-size);\n\t\t\twidth: var(--team-logo-size);\n\t\t\tgrid-area: logo;\n\t\t\toverflow: hidden;\n\t\t\t&[src*=\"nhl\"] {\n\t\t\t\tscale: 1.5;\n\t\t\t}\n\t\t}\n\t}\n\n\t.hockey-extra:has(.hockey-shootout) {\n\t\tjustify-self: center;\n\t}\n}\n@container hockeyCard (width <= 200px) {\n\t.hockey-scorebug.hockey-layout-side-by-side:not(.hockey-empty){\n\t\tgrid-template-columns: 50% 1fr !important;\n\t\t--team-column-size: var(--team-logo-size) 1em !important;\n\t\t--team-layout: \"logo score\" !important;\n\t\t.hockey-team-name,\n\t\t.hockey-network,\n\t\t.hockey-sog {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n}\n@container hockeyCard (width < 250px) {\n\t.hockey-scorebug.hockey-layout-side-by-side:not(.hockey-empty){\n\t\t.weekday {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n}\n@container hockeyCard (width < 320px){ \n\t.hockey-scorebug.hockey-layout-side-by-side{\n\t\t&.hockey-live{\n\t\t\t.hockey-home-team,\n\t\t\t.hockey-away-team{\n\t\t\t\t&:after,\n\t\t\t\t&:before{\n\t\t\t\t\tdisplay: none;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n@container hockeyCard (width >= 320px) {\n\t.hockey-scorebug.hockey-layout-side-by-side:not(.hockey-empty){\n\t\tpadding: 16px;\n\t\tgrid-template:\n\t\t\t\"away time home\"\n\t\t\t\"extra extra extra\";\n\t\tgrid-template-columns: 1fr 10em 1fr;\n\n\t\t--team-logo-size: 64px;\n\t\t--team-name-font-size: 14px;\n\t\t--team-score-font-size: 36px;\n\t\t--team-sog-font-size: 14px;\n\n\t\t--team-column-size: 1fr;\n\t\t--team-row-size: 1fr 1fr 1fr;\n\t\t--team-layout: \"logo\" \"logo\" \"name\";\n\n\t\t.hockey-time-section{\n\t\t\tgrid-template-rows: auto auto auto;\n\t\t\theight: auto;\n\t\t\t.hockey-clock{\n\t\t\t\tgrid-row: 1;\n\t\t\t\tpadding-top: 0.3em;\n\t\t\t}\n\t\t}\n\n\t\t.hockey-team{\n\t\t\t.hockey-sog,\n\t\t\t.hockey-score{\n\t\t\t\tjustify-self: center;\n\t\t\t}\n\t\t\t.hockey-team-name{\n\t\t\t\ttext-align: center;\n\t\t\t}\n\t\t}\n\n\t\t.hockey-away-team{\n\t\t\tjustify-self: end;\n\t\t}\n\t\t.hockey-home-team{\n\t\t\tjustify-self: start;\n\t\t}\n\n\t\t&.hockey-live,\n\t\t&.hockey-final {\n\t\t\tgrid-template:\n\t\t\t\t\"away time home\"\n\t\t\t\t\"extra extra extra\";\n\t\t\tgrid-template-columns: 1fr 4.5em 1fr;\t\t\n\t\t\t--team-column-size: var(--team-logo-size) 3em;\n\t\t\t--team-row-size: 1fr auto auto;\n\t\t\t--team-layout: \"logo score\" \"logo sog\" \"name extr\";\n\n\t\t\t.hockey-home-team{\n\t\t\t\t--team-column-size: 3em var(--team-logo-size);\n\t\t\t\t--team-layout: \"score logo\" \"sog logo\" \"extr name\";\n\t\t\t}\n\t\t}\n\t}\n}\n@container hockeyCard (width >= 500px) {\n\t.hockey-scorebug.hockey-layout-side-by-side:not(.hockey-empty){\n\t\t--team-logo-size: 96px;\n\t}\n}\n@container hockeyCard (width >= 768px) {\n\t.hockey-scorebug.hockey-layout-side-by-side:not(.hockey-empty){\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t\theight: 80vh;\n\t\t--team-logo-size: 128px;\n\t\t--team-name-font-size: 28px;\n\t\t--team-score-font-size: 56px;\n\t\t--team-sog-font-size: 14px;\t\t\n\t\t&:before{\n\t\t\tdisplay: none;\n\t\t\tcontent: \"\";\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tright: 0;\n\t\t\tbottom: 0;\n\t\t\tleft: 0;\n\t\t\tbackground: url(\"https://cdn.pixabay.com/photo/2019/02/26/14/53/ice-4022207_1280.jpg\") no-repeat center;\n\t\t\tbackground-size: cover;\n\t\t\topacity: 0.4;\n\t\t\tmix-blend-mode: screen;\n\t\t\tz-index:0;\n\t\t}\n\t}\n}\n\n\n/* Split\nA third layout: the two teams side by side with next to nothing on them,\neach half painted in that team's own primary colour and the two fields\nmeeting on a diagonal. Everything else the card can say is dropped; the\nclock or the date rides a chip on the seam. */\n.hockey-scorebug.hockey-layout-split:not(.hockey-empty){\n\tposition: relative;\n\toverflow: hidden;\n\tisolation: isolate;\n\tpadding: 0;\n\tgap: 0;\n\tgrid-template:\n\t\t\"away home\"\n\t\t\"extra extra\";\n\tgrid-template-columns: 1fr 1fr;\n\tgrid-template-rows: auto auto;\n\n\t--team-logo-size: clamp(48px, 22cqw, 112px);\n\t/* No palette: both halves take the card surface and the home side a faint\n\ttint of the text colour, so the seam is still visible and the crests\n\tstill read. Nothing brand-coloured is invented. */\n\t--split-away-field: var(--away-team-background, var(--card-background-color, #ffffff));\n\t--split-home-field: var(--home-team-background, color-mix(in srgb, currentColor 9%, var(--card-background-color, #ffffff)));\n\t/* A centre gutter wide enough for the chip on the seam, so the crests -\n\tthe only team identifier this layout keeps - never sit under it. */\n\t--split-gutter: clamp(44px, 13cqw, 60px);\n\n\t/* Two colour fields, clipped so their shared edge is one diagonal.\n\tWider at the top on the away side, matching the slash direction.\n\tThey are grid items on the teams row, not absolute over the whole card:\n\tthe clip percentages then measure against that row, so the split stays\n\teven whatever gets added below it. */\n\tbackground: linear-gradient(110deg,  var(--split-away-field) 0%,  var(--split-away-field) 50%,  var(--split-home-field) 50%,  var(--split-home-field) 100%);\n\n\n\t.hockey-team{\n\t\tposition: relative;\n\t\tz-index: 1;\n\t\tdisplay: grid;\n\t\tgrid-template: \"logo\" \"score\";\n\t\tgrid-template-columns: minmax(0, 1fr);\n\t\tgrid-template-rows: auto auto;\n\t\tjustify-items: center;\n\t\talign-content: center;\n\t\tgap: 6px;\n\t\tpadding: 20px 10px 24px;\n\t\tmin-width: 0;\n\t}\n\t.hockey-away-team{\n\t\tgrid-area: away;\n\t\tcolor: var(--away-team-text, currentColor);\n\t\tpadding-right: var(--split-gutter);\n\t}\n\t.hockey-home-team{\n\t\tgrid-area: home;\n\t\tcolor: var(--home-team-text, currentColor);\n\t\tpadding-left: var(--split-gutter);\n\t}\n\n\t/* Minimal info: the crest and, once there is one, the score. */\n\t.hockey-team-name,\n\t.hockey-record,\n\t.hockey-sog{\n\t\tdisplay: none;\n\t}\n\n\t.hockey-logo{\n\t\tgrid-area: logo;\n\t\theight: var(--team-logo-size);\n\t\twidth: var(--team-logo-size);\n\t\tobject-fit: contain;\n\t\t&[src*=\"nhl\"] {\n\t\t\tscale: 1.15;\n\t\t}\n\t}\n\n\t.hockey-score{\n\t\tgrid-area: score;\n\t\tfont-size: clamp(20px, 8cqw, 36px);\n\t\tfont-weight: 900;\n\t\tline-height: 1;\n\t\tfont-variant-numeric: tabular-nums;\n\t\t&:empty{\n\t\t\tdisplay: none;\n\t\t}\n\t}\n\n\t/* The seam runs through the middle, so the time section is lifted out of\n\tthe grid and centred on it in a chip of its own - the only way it stays\n\treadable across two arbitrary team colours. */\n\t.hockey-time-section{\n\t\tposition: relative;\n\t\tgrid-area: 1 / 1 / 2 / 3;\n\t\tplace-self: center;\n\t\tz-index: 2;\n\t\tdisplay: grid;\n\t\tjustify-items: center;\n\t\tgap: 2px;\n\t\ttext-align: center;\n\t\tbackground: rgb(0 0 0 / 0.42);\n\t\tbackground: linear-gradient(115deg,  rgba(0 0 0 / 0) 0%,  rgb(0 0 0 / 0.0) 5%, rgb(0 0 0 / 1) 5%,  rgb(0 0 0 / 1) 95%, rgb(0 0 0 / 0) 95%,  rgb(0 0 0 / 0) 100%);\n\n\t\tcolor: #fff;\n\t\tpadding: 10px 16px 9px;\n\t\t/* \t\ttext-shadow: 0 1px 2px rgb(0 0 0 / 0.5); */\n\n\t\t.hockey-game-type,\n\t\t.hockey-network,\n\t\t.hockey-strength{\n\t\t\tdisplay: none;\n\t\t}\n\t\t.hockey-date{\n\t\t\tfont-size: clamp(13px, 4.6cqw, 22px);\n\t\t\tfont-weight: 900;\n\t\t\tline-height: 1.05;\n\t\t\ttext-transform: uppercase;\n\t\t\t.weekday{\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t}\n\t\t.hockey-time{\n\t\t\tfont-size: clamp(10px, 3.2cqw, 14px);\n\t\t\ttext-transform: uppercase;\n\t\t\topacity: 0.75;\n\t\t}\n\t\t.hockey-period{\n\t\t\tfont-size: clamp(9px, 2.6cqw, 12px);\n\t\t\tfont-weight: 900;\n\t\t\tletter-spacing: 0.06em;\n\t\t\ttext-transform: uppercase;\n\t\t\topacity: 0.75;\n\t\t}\n\t\t.hockey-clock{\n\t\t\tfont-size: clamp(14px, 3.6cqw, 18px);\n\t\t\tfont-weight: 900;\n\t\t\tline-height: 1;\n\t\t\tfont-variant-numeric: tabular-nums;\n\t\t}\n\t\t.hockey-final{\n\t\t\tfont-size: clamp(11px, 3.2cqw, 15px);\n\t\t\tfont-weight: 900;\n\t\t\ttext-transform: uppercase;\n\t\t\tline-height: 1.1;\n\t\t}\n\t}\n\n\t/* Series tables, shootout grids and the rest have no home here. */\n\t.hockey-extra{\n\t\tdisplay: none;\n\t}\n}\n\n\n/* Split, pre-game extras. Everything the stacked pre-game card can say,\nfitted to a layout with no rows to spare: the record rides under the crest,\nthe competition tag and the broadcast line join the chip on the seam, and\nthe season series runs along the bottom edge as a full-width strip. */\n.hockey-scorebug.hockey-layout-split.hockey-upcoming{\n\t--split-gutter: clamp(52px, 19cqw, 78px);\n\n\t/* The record is a child of .hockey-team-name, so the name element has to\n\tcome back; zeroing its own type keeps the record without bringing the\n\tnickname back with it. */\n\t.hockey-team-name{\n\t\tdisplay: block;\n\t\tgrid-area: score;\n\t\tfont-size: 0;\n\t\tline-height: 1;\n\t\ttext-align: center;\n\t}\n\t.hockey-record{\n\t\tdisplay: block;\n\t\tfont-size: clamp(10px, 2.8cqw, 13px);\n\t\tfont-weight: 700;\n\t\tletter-spacing: 0.02em;\n\t\topacity: 0.85;\n\t\tcursor: help;\n\t}\n\n\t.hockey-time-section{\n\t\t.hockey-game-type{\n\t\t\tdisplay: block;\n\t\t\tfont-size: clamp(8px, 2.2cqw, 10px);\n\t\t\tfont-weight: 900;\n\t\t\tletter-spacing: 0.1em;\n\t\t\ttext-transform: uppercase;\n\t\t\topacity: 0.65;\n\t\t}\n\t\t.hockey-network{\n\t\t\tdisplay: block;\n\t\t\tmax-width: 14ch;\n\t\t\tfont-size: clamp(8px, 2.2cqw, 10px);\n\t\t\tfont-weight: 700;\n\t\t\tletter-spacing: 0.04em;\n\t\t\ttext-transform: uppercase;\n\t\t\twhite-space: nowrap;\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t\topacity: 0.65;\n\t\t}\n\t}\n\n\t/* Season series: the markers only, hugging the bottom edge. Each one\n\ttakes the text colour of whichever side won that meeting, so the strip\n\treads against both colour fields it crosses. */\n\t.hockey-extra{\n\t\tdisplay: block;\n\t\tposition: relative;\n\t\tgrid-area: extra;\n\t\tz-index: 2;\n\t\tpadding: 7px 10px;\n\t\tborder: 0;\n\t\tbackground: rgb(0 0 0 / 0.55);\n\t}\n\t.hockey-single-meeting{\n\t\tdisplay: none;\n\t}\n\t.hockey-h2h{\n\t\tsummary{\n\t\t\tdisplay: block;\n\t\t\tlist-style: none;\n\t\t\tfont-size: 0;\n\t\t\t&::marker{\n\t\t\t\tcontent: \"\";\n\t\t\t}\n\t\t\t&::-webkit-details-marker{\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t}\n\t\tul{\n\t\t\tdisplay: none;\n\t\t}\n\t}\n\t.hockey-series{\n\t\tdisplay: flex;\n\t\tmargin: 0;\n\t\tgap: 3px;\n\t\t/* Keyed to the winner's BACKGROUND, not its text colour: two teams\n\t\tboth lettered in white would otherwise produce two identical\n\t\tmarkers, which is exactly the case a split series has to tell\n\t\tapart. The dark band behind is what makes either colour read. */\n\t\t.hockey-series-game{\n\t\t\theight: 7px;\n\t\t\tborder-radius: 2px;\n\t\t\tbackground: rgb(255 255 255 / 0.35);\n\t\t\t&[data-winner=\"away\"]{\n\t\t\t\tbackground: var(--away-team-background, #ffffff);\n\t\t\t\tbox-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.4);\n\t\t\t}\n\t\t\t&[data-winner=\"home\"]{\n\t\t\t\tbackground: var(--home-team-background, rgb(255 255 255 / 0.45));\n\t\t\t\tbox-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.4);\n\t\t\t}\n\t\t\t&[data-result=\"tie\"]{\n\t\t\t\tbackground: rgb(255 255 255 / 0.7);\n\t\t\t}\n\t\t\t&[data-result=\"upcoming\"]{\n\t\t\t\tbackground: rgb(255 255 255 / 0.18);\n\t\t\t}\n\t\t}\n\t}\n}\n\n\n/* Below 300px the split card has no room for anything beyond the crests and\nthe date: the record, the competition tag, the broadcast line and the\nseries strip all drop, leaving date over time on the chip. */\n@container hockeyCard (width < 300px) {\n\t.hockey-scorebug.hockey-layout-split.hockey-upcoming{\n\t\t/* Chip is back to date over time, so the gutter can be too. */\n\t\t--split-gutter: clamp(44px, 15cqw, 60px);\n\n\t\t.hockey-team-name,\n\t\t.hockey-record{\n\t\t\tdisplay: none;\n\t\t}\n\t\t.hockey-time-section{\n\t\t\t.hockey-game-type,\n\t\t\t.hockey-network{\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t}\n\t\t.hockey-extra{\n\t\t\tdisplay: none;\n\t\t}\n\t}\n}\n\n\n/* Split, series panel. Closed, the strip is the whole story. Open, the extra\nbecomes a dark panel over the foot of the card - the neutral surface a table\nneeds, since neither team's colour field can carry small text for both. */\n.hockey-scorebug.hockey-layout-split.hockey-upcoming{\n\t.hockey-h2h summary{\n\t\tcursor: pointer;\n\t}\n\n\t.hockey-h2h[open]{\n\t\tsummary{\n\t\t\tfont-size: 11px;\n\t\t\tfont-weight: 700;\n\t\t\tletter-spacing: 0.04em;\n\t\t\ttext-transform: uppercase;\n\t\t\tstrong{\n\t\t\t\tfont-weight: 900;\n\t\t\t}\n\t\t}\n\t\t.hockey-series{\n\t\t\tmargin-top: 8px;\n\t\t\tmargin-bottom: 10px;\n\t\t}\n\t\tul{\n\t\t\tdisplay: grid;\n\t\t\tgrid-template-columns: 1fr;\n\t\t\tgap: 0;\n\t\t\tmargin: 0;\n\t\t\tpadding: 0;\n\t\t\tlist-style: none;\n\t\t}\n\t\tli{\n\t\t\tdisplay: grid;\n\t\t\tgrid-template-columns: 4.5em 1fr 1fr 3.5em;\n\t\t\talign-items: center;\n\t\t\tgap: 0 8px;\n\t\t\tpadding: 6px 0;\n\t\t\tborder: 0;\n\t\t\tborder-top: 1px solid rgb(255 255 255 / 0.15);\n\t\t\tborder-radius: 0;\n\t\t\toverflow: visible;\n\t\t\t&:first-of-type{\n\t\t\t\tborder-top: 0;\n\t\t\t}\n\t\t\t/* The crest watermark behind each meeting has no place over a\n\t\t\tcolour field this small. */\n\t\t\t&:before{\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t}\n\t\t.hockey-h2h-date{\n\t\t\tgrid-column: 1;\n\t\t\tfont-size: 11px;\n\t\t\tfont-weight: 700;\n\t\t\ttext-align: left;\n\t\t\tcolor: rgb(255 255 255 / 0.6);\n\t\t}\n\t\t.hockey-h2h-result{\n\t\t\tgrid-column: 4;\n\t\t\tfont-size: 11px;\n\t\t\ttext-align: right;\n\t\t\tcolor: rgb(255 255 255 / 0.5);\n\t\t}\n\t\t.hockey-h2h-team{\n\t\t\tdisplay: flex;\n\t\t\tjustify-content: space-between;\n\t\t\tgap: 0.4em;\n\t\t\tfont-size: 12px;\n\t\t\tfont-weight: 700;\n\t\t\tcolor: rgb(255 255 255 / 0.55);\n\t\t}\n\t\t.hockey-h2h-win{\n\t\t\tfont-weight: 900;\n\t\t\tcolor: #fff;\n\t\t}\n\t}\n\n\t/* Opening changes nothing but the panel: the crests, the chip and the\n\tseam all live on the row above and never move. */\n\t&:has(.hockey-h2h[open]) .hockey-extra{\n\t\tpadding: 12px 14px 14px;\n\t\tbackground: rgb(0 0 0 / 0.88);\n\t\tcolor: #fff;\n\t}\n}\n";
const hockeyCssReady = Promise.resolve();

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

/**
 * The integration also creates a "Next Game" timestamp sensor per team. It
 * carries no game attributes, so the card has nothing to render from it.
 */
function isNextGameSensor(hass, id) {
  const a = (hass.states[id] && hass.states[id].attributes) || {};
  return a.device_class === "timestamp";
}

/** Game sensors from the integration's registry entries, scorebug-capable or not. */
function hockeyRegistrySensors(hass) {
  return Object.values(hass.entities || {})
    .filter((e) => e.platform === "hockey" && String(e.entity_id).startsWith("sensor."))
    .map((e) => e.entity_id);
}

/** Sensors belonging to this integration, for the picker and the stub config. */
function hockeyEntities(hass) {
  if (!hass) return [];
  const fromRegistry = hockeyRegistrySensors(hass).filter((id) => !isNextGameSensor(hass, id));
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
      this._form.schema = this._schema();
      this._form.data = {
        entity: this._config.entity,
        layout: this._config.layout || "auto",
      };
    } else {
      this._renderFallback();
    }
  }

  _schema() {
    // The entity selector can't filter by device class negatively, so list
    // the integration's next-game sensors explicitly.
    const exclude = hockeyRegistrySensors(this._hass).filter((id) => isNextGameSensor(this._hass, id));
    if (!exclude.length) return HOCKEY_EDITOR_SCHEMA;
    return HOCKEY_EDITOR_SCHEMA.map((field) =>
      field.name === "entity"
        ? { ...field, selector: { entity: { ...field.selector.entity, exclude_entities: exclude } } }
        : field
    );
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
