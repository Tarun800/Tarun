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
const repoFilter = document.querySelector("#repo-filter");
const repoSort = document.querySelector("#repo-sort");
const repoPageInfo = document.querySelector("#repo-page-info");
const repoPrev = document.querySelector("#repo-prev");
const repoNext = document.querySelector("#repo-next");
const exportBtn = document.querySelector("#export-button");
let report = null;
let allRepositories = [];
let currentRepoPage = 1;
const PAGE_SIZE = 10;

function setStatus(message, type = "") {
  statusEl.textContent = message;
  statusEl.className = type;
}
async function get(url) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal
    });
    if (response.status === 403 || response.status === 429) throw new Error("GitHub API rate limit reached. Please wait a minute and try again.");
    if (response.status === 404) throw new Error("GitHub username or resource not found.");
    if (!response.ok) throw new Error("GitHub API request failed (" + response.status + ").");
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") throw new Error("GitHub API request timed out. Check your connection and try again.");
    if (error instanceof TypeError) throw new Error("Could not connect to GitHub. Check your internet connection and try again.");
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
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
function filteredRepositories() {
  const query = repoFilter.value.trim().toLocaleLowerCase();
  const filtered = allRepositories.filter(function (repo) {
    const summary = repositorySummary(repo);
    return !query || [summary.name, summary.description, summary.language].join(" ").toLocaleLowerCase().includes(query);
  });
  if (repoSort.value === "stars") filtered.sort((a, b) => Number(b.stargazers_count || 0) - Number(a.stargazers_count || 0));
  else if (repoSort.value === "name") filtered.sort((a, b) => repositorySummary(a).name.localeCompare(repositorySummary(b).name));
  else filtered.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
  return filtered;
}
function renderRepositories() {
  const filtered = filteredRepositories();
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  currentRepoPage = Math.min(Math.max(1, currentRepoPage), pages);
  const start = (currentRepoPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);
  reposEl.innerHTML = pageItems.length
    ? pageItems.map(repositoryItem).join("")
    : "<p>No repositories match this filter.</p>";
  repoPageInfo.textContent = filtered.length
    ? "Showing " + n(start + 1) + "–" + n(start + pageItems.length) + " of " + n(filtered.length) + " loaded repositories"
    : "0 matching repositories";
  repoPrev.disabled = currentRepoPage <= 1;
  repoNext.disabled = currentRepoPage >= pages;
}
repoFilter.addEventListener("input", function () {
  currentRepoPage = 1;
  renderRepositories();
});
repoSort.addEventListener("change", function () {
  currentRepoPage = 1;
  renderRepositories();
});
repoPrev.addEventListener("click", function () {
  currentRepoPage -= 1;
  renderRepositories();
});
repoNext.addEventListener("click", function () {
  currentRepoPage += 1;
  renderRepositories();
});

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
  allRepositories = [];
  repoFilter.value = "";
  currentRepoPage = 1;
  setStatus("Loading public profile and repositories…");
  try {
    const encoded = encodeURIComponent(username);
    const [user, repositories] = await Promise.all([
      get(API + "/users/" + encoded),
      get(API + "/users/" + encoded + "/repos?per_page=100&sort=updated&type=owner")
    ]);
    allRepositories = repositories;
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
          closedAt: pr.closed_at || null
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
      metric(stars, "Stars in loaded repositories", "Up to 100 repositories") +
      metric(forks, "Forks in loaded repositories", "Up to 100 repositories") +
      metric(pullRequests.length, "Merged PRs found", "Search results may be incomplete");
    renderRepositories();
    prsEl.innerHTML = pullRequests.length
      ? pullRequests.slice(0, 10).map(function (pr) {
          return item(pr.title, pr.url, pr.repository, "Closed (merged) " + date(pr.closedAt));
        }).join("")
      : "<p>No merged pull requests returned. This does not prove there are none.</p>";
    if (pullRequestSearchNote) {
      prsEl.innerHTML += '<p class="hint">Pull-request search note: ' + esc(pullRequestSearchNote) + '</p>';
    }
    report = {
      generatedAt: new Date().toISOString(),
      source: "GitHub public REST API",
      caveat: "Exploratory only. Repository data is limited to the first 100 most recently updated owned repositories; merged pull-request search is limited and may be incomplete. Counts do not establish contribution quality, impact or eligibility.",
      profile: { login: user.login, name: user.name, url: user.html_url, publicRepos: user.public_repos, followers: user.followers },
      repositoryCoverage: { returned: repositories.length, profileReportedTotal: Number(user.public_repos || 0), limit: 100 },
      repositories: repositories.map(repositorySummary),
      mergedPullRequests: pullRequests
    };
    results.hidden = false;
    exportBtn.disabled = false;
    setStatus("Loaded public data for @" + user.login + ". Verify records at their source links.", "success");
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    setStatus(error.message || "Could not load profile. Check your connection and try again.", "error");
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
  window.setTimeout(function () { URL.revokeObjectURL(blobUrl); }, 1000);
});
