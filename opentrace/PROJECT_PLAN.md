# OpenTrace development plan and evidence log

## Current status
- Latest reviewed commit: https://github.com/Tarun800/Tarun/commit/42ad91a5c7f7cc1bba7e37b01a8609ca59be344a
- Latest reviewed automated test run: https://github.com/Tarun800/Tarun/actions/runs/39199858457 — successful.
- Latest reviewed deployment run: https://github.com/Tarun800/Tarun/actions/runs/39199858360 — successful.
- Published site configured at: https://tarun800.github.io/Tarun/
- The static app is deployed; automated workflow success is not the same as independently browser-testing all live interactions. The current environment could not load the public page for independent verification.

## MVP features
- [x] Public GitHub profile lookup
- [x] Public repository listing (first 100 owned repositories returned by the API)
- [x] Repository metrics with explicit coverage caveats
- [x] Merged pull-request search attempt with incomplete-results caveat
- [x] JSON report export
- [x] API error and rate-limit messaging
- [x] Responsive layout, skip link, keyboard focus styling and live status announcements
- [x] Repository filtering, sorting and pagination
- [x] Shared utility functions with unit tests
- [x] Static integration checks for DOM IDs, assets and feature controls
- [x] GitHub Actions checks and GitHub Pages deployment workflow
- [ ] Independently verify published site in a real browser
- [ ] Test profile lookup and export against live GitHub API in a real browser
- [ ] Conduct formal accessibility audit
- [ ] Obtain independent code review
- [ ] Conduct user testing with consent
- [ ] Record genuine feedback and any resulting fixes

## Evidence log — only record genuine facts
- Date: 2026-10-19.
- What I personally implemented: Fill in accurately. This repository contains AI-assisted starter implementation; distinguish personal work from AI assistance and explain the code you claim.
- Automated checks: https://github.com/Tarun800/Tarun/actions/runs/39199858457 — passed syntax checks and unit tests for commit 42ad91a5c7f7cc1bba7e37b01a8609ca59be344a.
- Deployment: https://github.com/Tarun800/Tarun/actions/runs/39199858360 — build and deploy jobs succeeded for commit 42ad91a5c7f7cc1bba7e37b01a8609ca59be344a.
- Published URL: https://tarun800.github.io/Tarun/
- Independent code review: Not completed.
- Browser interaction tests: Not completed.
- User testing and feedback: Not yet recorded.
- Real usage/adoption metrics: Not yet measured.
- Known limitations: GitHub unauthenticated API rate limits; repository listing limited to 100; search results may be incomplete; counts do not establish contribution quality, impact, authorship, leadership or immigration eligibility; no independent security/accessibility audit yet.

## Reporting principles
- Separate personal contributions from work by others, including AI assistance.
- Keep source links to commits, issues, pull requests, releases and feedback.
- Never claim users, awards, recognition, impact or endorsements without evidence.
- Treat this as a portfolio project, not proof of Global Talent eligibility or a substitute for original evidence.
