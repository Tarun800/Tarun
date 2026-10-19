# OpenTrace development plan and evidence log

## Current release status
- Latest application-code commit: https://github.com/Tarun800/Tarun/commit/c4c253786e44dfe3afe10517541185cec3a60719
- Automated checks for that app commit: https://github.com/Tarun800/Tarun/actions/runs/39200639788 — successful.
- GitHub Pages deployment for that app commit: https://github.com/Tarun800/Tarun/actions/runs/39200639769 — successful.
- Published site: https://tarun800.github.io/Tarun/
- Live HTTP checks performed 2026-10-19: page and app assets returned HTTP 200; live HTML includes repository filter/sort/pagination controls; deployed JavaScript includes API timeout handling.
- Public GitHub API smoke checks performed 2026-10-19: profile endpoint returned HTTP 200 for octocat; repository endpoint returned HTTP 200 with an array; merged-PR search endpoint returned HTTP 200 with results for a known account.
- Limitation: a real headless browser could not be installed in the available test environment, so automated click-through testing of the live UI and the browser download event for JSON export remain unverified. Do not describe those interactions as browser-tested.

## MVP features
- [x] Public GitHub profile lookup
- [x] Public repository listing (first 100 owned repositories returned by the API)
- [x] Repository metrics with explicit coverage caveats
- [x] Merged pull-request search attempt with incomplete-results caveat
- [x] JSON report export implementation
- [x] API error, network-failure, timeout and rate-limit messaging
- [x] Responsive layout, skip link, keyboard focus styling and live status announcements
- [x] Repository filtering, sorting and pagination
- [x] Shared utility functions with unit tests
- [x] Static integration checks for DOM IDs, assets and feature controls
- [x] GitHub Actions checks and GitHub Pages deployment workflow
- [x] Live HTTP checks for the published page and assets
- [x] Live public API endpoint smoke checks
- [ ] Browser-test profile lookup, filtering, sorting, pagination and JSON download
- [ ] Conduct formal accessibility audit
- [ ] Obtain independent code review
- [ ] Conduct user testing with consent
- [ ] Record genuine feedback and any resulting fixes

## Evidence log — only record genuine facts
- Date: 2026-10-19.
- What I personally implemented: Fill in accurately. This repository contains AI-assisted starter implementation; distinguish personal work from AI assistance and explain the code you claim.
- Automated checks: https://github.com/Tarun800/Tarun/actions/runs/39200639788 — passed syntax checks and unit tests for application commit c4c253786e44dfe3afe10517541185cec3a60719.
- Deployment: https://github.com/Tarun800/Tarun/actions/runs/39200639769 — build and deploy jobs succeeded for application commit c4c253786e44dfe3afe10517541185cec3a60719.
- Published URL: https://tarun800.github.io/Tarun/
- Live checks: page, HTML, CSS, utility JavaScript and application JavaScript returned HTTP 200; live public GitHub profile/repository/search endpoints returned HTTP 200 in smoke checks.
- Independent code review: Not completed.
- Full browser interaction tests: Not completed.
- User testing and feedback: Not yet recorded.
- Real usage/adoption metrics: Not yet measured.
- Known limitations: GitHub unauthenticated API rate limits; repository listing limited to 100; search results may be incomplete; counts do not establish contribution quality, impact, authorship, leadership or immigration eligibility; no independent security/accessibility audit yet.

## Reporting principles
- Separate personal contributions from work by others, including AI assistance.
- Keep source links to commits, issues, pull requests, releases and feedback.
- Never claim users, awards, recognition, impact or endorsements without evidence.
- Treat this as a portfolio project, not proof of Global Talent eligibility or a substitute for original evidence.
