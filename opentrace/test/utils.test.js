const test = require("node:test");
const assert = require("node:assert/strict");
const utils = require("../utils.js");

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
