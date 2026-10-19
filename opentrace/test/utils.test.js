const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const utils = require("../utils.js");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

test("escapes HTML-sensitive characters", () => {
  assert.equal(utils.escapeHtml('<script a="b">x & y</script>'), "&lt;script a=&quot;b&quot;&gt;x &amp; y&lt;/script&gt;");
});
test("formats numeric values with UK separators", () => {
  assert.equal(utils.formatNumber(12345), "12,345");
  assert.equal(utils.formatNumber(null), "0");
});
test("validates GitHub usernames", () => {
  assert.equal(utils.isValidUsername("octocat"), true);
  assert.equal(utils.isValidUsername("Tarun800"), true);
  assert.equal(utils.isValidUsername(""), false);
  assert.equal(utils.isValidUsername("-bad"), false);
  assert.equal(utils.isValidUsername("bad--name"), false);
  assert.equal(utils.isValidUsername("name with spaces"), false);
  assert.equal(utils.isValidUsername("a".repeat(40)), false);
});
test("normalizes repository API data without losing zero values", () => {
  assert.deepEqual(utils.repositorySummary({name:"demo", full_name:"user/demo", stargazers_count:0, forks_count:2}), {
    name:"user/demo", url:"", description:"", language:"Language not set", stars:0, forks:2, updatedAt:null
  });
});
test("handles absent and invalid dates safely", () => {
  assert.equal(utils.formatDate(null), "Date unavailable");
  assert.equal(utils.formatDate("not-a-date"), "Date unavailable");
});
test("all DOM ids used by the app exist in the HTML", () => {
  const selectors = [...app.matchAll(/document\.querySelector\("#([a-z0-9-]+)"\)/g)].map(match => match[1]);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  assert.ok(selectors.length > 0, "expected app to declare DOM selectors");
  for (const id of selectors) assert.ok(ids.has(id), "missing HTML element #" + id);
});
test("HTML loads local assets that exist and keeps scripts in dependency order", () => {
  for (const asset of ["styles.css", "utils.js", "app.js"]) {
    assert.ok(fs.existsSync(path.join(root, asset)), "missing asset " + asset);
    assert.ok(html.includes(asset), "HTML does not reference " + asset);
  }
  assert.ok(html.indexOf("utils.js") < html.indexOf("app.js"), "utilities must load before app code");
});
test("repository browsing and honest coverage notes are present", () => {
  for (const id of ["repo-filter", "repo-sort", "repo-prev", "repo-next", "repo-page-info", "export-button"]) {
    assert.ok(html.includes('id="' + id + '"'), "missing feature control " + id);
  }
  assert.match(app, /repositoryCoverage/);
  assert.match(app, /merged pull-request search is limited and may be incomplete/);
});

test("username input pattern is compatible with modern browser RegExp syntax", () => {
  assert.ok(html.includes('pattern="[A-Za-z0-9\\\\-]+"'), "hyphen must be escaped for the Unicode sets (v) regex mode");
});
