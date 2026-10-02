const fs = require("fs");
const path = require("path");

const root = __dirname;
const srcDir = path.join(root, "src");
const distDir = path.join(root, "dist");
const jsPath = path.join(srcDir, "hockey-scorebug-card.js");
const cssPath = path.join(srcDir, "hockey-scorebug-card.css");
const outputPath = path.join(distDir, "hockey-scorebug-card.js");

fs.mkdirSync(distDir, { recursive: true });

const css = fs.readFileSync(cssPath, "utf8");
const js = fs.readFileSync(jsPath, "utf8");

const bundled = js.replace(
  /const HOCKEY_CSS_URL = new URL\([\s\S]*?\nconst HOCKEY_EDITOR_SCHEMA = \[/,
  `const hockeyCssText = ${JSON.stringify(css)};\nconst hockeyCssReady = Promise.resolve();\n\nconst HOCKEY_EDITOR_SCHEMA = [`
);

fs.writeFileSync(outputPath, bundled);
console.log(`Bundled CSS into ${path.relative(root, outputPath)}`);
