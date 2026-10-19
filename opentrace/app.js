const API = "https://api.github.com";
const { escapeHtml: esc, formatNumber: n, formatDate: date, isValidUsername, repositorySummary } = window.OpenTraceUtils;
const form = document.querySelector("#search-form");
const input = document.querySelector("#username");
const btn = document.querySelector("#search-button");
const statusEl = document.querySelector("#status");
const results = document.querySelector("#results");
const profileEl = document.querySelector("#profile");
const statsEl = document.querySelector("#stats");
const reposEl = document.querySelector("#repos");
const prsEl = document.querySelector("#prs");
const exportBtn = document.querySelector("#export-button");
let report = null;

function setStatus(message, type = "") {
  statusEl.textContent = message;
  statusEl.className = type;
}
async function get(url) {
  const response = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (response.status === 403 || response.status === 429) throw new Error("GitHub API rate limit reached. Please wait and try again.");
  if (response.status === 404) throw new Error("GitHub username or resource not found.");
  if (!response.ok) throw new Error("GitHub API request failed (" + response.status + ").");
  return response.json();
}
function item(title, url, description, meta = "") {
  return '<article class="item"><a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' +
    esc(title) + '</a><p>' + esc(description || "No description supplied.") +
    '</p><div class="meta">' + meta + '</div></article>';
}
function metric(value, label, source) {
  return '<div class="stat"><strong>' + n(value) + '</strong><span>' + esc(label) +
    '</span><br><small>' + esc(source) + '</small></div>';
}
function repositoryItem(repo) {
  const r = repositorySummary(repo);
  return item(r.name, r.url, r.description,
    '★ ' + n(r.stars) + ' · Forks ' + n(r.forks) + ' · ' + esc(r.language) + ' · Updated ' + date(r.updatedAt));
}
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const username = input.value.trim();
  if (!isValidUsername(username)) {
    setStatus("Enter a valid GitHub username (letters, numbers and single hyphens).", "error");
    input.focus();
    return;
  }
  btn.disabled = true;
  exportBtn.disabled = true;
  results.hidden = true;
  report = null;
  setStatus("Loading public profile and repositories…");
  try {
    const encoded = encodeURIComponent(username);
    const [user, repositories] = await Promise.all([
      get(API + "/users/" + encoded),
      get(API + "/users/" + encoded + "/repos?per_page=100&sort=updated&type=owner")
    ]);
    setStatus("Searching public merged pull requests…");
    let pullRequests = [];
    let pullRequestSearchNote = "";
    try {
      const query = encodeURIComponent("author:" + username + " type:pr is:merged");
      const search = await get(API + "/search/issues?q=" + query + "&sort=updated&order=desc&per_page=20");
      pullRequests = (search.items || []).map(function (pr) {
        return {
          title: pr.title,
          url: pr.html_url,
          repository: (pr.repository_url || "").replace("https://api.github.com/repos/", ""),
          closedAt: pr.closed_at || null,
          mergedAt: pr.pull_request && pr.pull_request.merged_at ? pr.pull_request.merged_at : null
        };
      });
    } catch (error) {
      pullRequestSearchNote = error.message || "Pull-request search unavailable.";
    }
    const stars = repositories.reduce((sum, repo) => sum + Number(repo.stargazers_count || 0), 0);
    const forks = repositories.reduce((sum, repo) => sum + Number(repo.forks_count || 0), 0);
    profileEl.innerHTML = '<img class="avatar" src="' + esc(user.avatar_url) + '" alt="">' +
      '<div><h3>' + esc(user.name || user.login) + '</h3><p>@' + esc(user.login) + ' · ' +
      esc(user.bio || "No public bio") + '</p><p>' + esc(user.location || "Location not listed") +
      ' · <a href="' + esc(user.html_url) + '" target="_blank" rel="noopener noreferrer">View profile ↗</a></p></div>';
    statsEl.innerHTML =
      metric(user.public_repos, "Public repositories", "Profile API") +
      metric(stars, "Stars in returned repositories", "Fetched repository list") +
      metric(forks, "Forks in returned repositories", "Fetched repository list") +
      metric(pullRequests.length, "Merged PRs found", "Search may be incomplete");
    reposEl.innerHTML = repositories.length
      ? repositories.slice(0, 10).map(repositoryItem).join("")
      : "<p>No public repositories returned.</p>";
    prsEl.innerHTML = pullRequests.length
      ? pullRequests.slice(0, 10).map(function (pr) {
          return item(pr.title, pr.url, pr.repository, "Merged " + date(pr.mergedAt || pr.closedAt));
        }).join("")
      : "<p>No merged pull requests returned. This does not prove there are none.</p>";
    if (pullRequestSearchNote) {
      prsEl.innerHTML += '<p class="hint">Pull-request search note: ' + esc(pullRequestSearchNote) + '</p>';
    }
    report = {
      generatedAt: new Date().toISOString(),
      source: "GitHub public REST API",
      caveat: "Exploratory only; API indexing and rate limits affect results. Counts do not establish contribution quality, impact or eligibility.",
      profile: { login: user.login, name: user.name, url: user.html_url, publicRepos: user.public_repos, followers: user.followers },
      repositories: repositories.map(repositorySummary),
      mergedPullRequests: pullRequests
    };
    results.hidden = false;
    exportBtn.disabled = false;
    setStatus("Loaded public data for @" + user.login + ". Verify records at their source links.", "success");
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    setStatus(error.message || "Could not load profile.", "error");
  } finally {
    btn.disabled = false;
  }
});
exportBtn.addEventListener("click", function () {
  if (!report) return;
  const blobUrl = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = blobUrl;
  anchor.download = "opentrace-" + report.profile.login + ".json";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(blobUrl);
});
