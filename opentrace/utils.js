/* Pure helpers shared by the browser app and Node tests. */
(function (root) {
  "use strict";
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char];
    });
  }
  function formatNumber(value) {
    return new Intl.NumberFormat("en-GB").format(Number(value || 0));
  }
  function formatDate(value) {
    if (!value) return "Date unavailable";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleDateString("en-GB");
  }
  function isValidUsername(value) {
    return typeof value === "string" && /^[A-Za-z0-9-]{1,39}$/.test(value) &&
      !value.startsWith("-") && !value.endsWith("-") && !value.includes("--");
  }
  function repositorySummary(repo) {
    return {
      name: repo.full_name || repo.name || "",
      url: repo.html_url || "",
      description: repo.description || "",
      language: repo.language || "Language not set",
      stars: Number(repo.stargazers_count || 0),
      forks: Number(repo.forks_count || 0),
      updatedAt: repo.updated_at || null
    };
  }
  const api = { escapeHtml, formatNumber, formatDate, isValidUsername, repositorySummary };
  root.OpenTraceUtils = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
