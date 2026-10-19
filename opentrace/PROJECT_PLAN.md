# OpenTrace development plan and evidence log

## Current release status
- Latest deployed and browser-tested commit: https://github.com/Tarun800/Tarun/commit/06f5d6e4a4b72681243484a105f559126b7b0251
- Automated checks: https://github.com/Tarun800/Tarun/actions/runs/39204923857 — successful.
- GitHub Pages deployment: https://github.com/Tarun800/Tarun/actions/runs/39204923874 — successful.
- Published site: https://tarun800.github.io/Tarun/
- Live browser testing performed 2026-10-19 with headless Chromium:
  - Homepage loaded successfully (HTTP 200); profile lookup worked for Microsoft and Torvalds.
  - Repository filter, name sorting, pagination (page 1 to page 2), and empty-filter state behaved as expected.
  - JSON export downloaded and parsed successfully; profile/repository coverage fields were present.
  - Merged pull-request results rendered for Torvalds.
  - Invalid username, API rate-limit (403) and missing-user (404) error messages worked; search button re-enabled after failure.
  - Mobile viewport at 390 px had no horizontal overflow.
  - No page errors, console errors or failed requests during the successful main-flow run.
- Automated axe-core WCAG 2.1 A/AA scan on the homepage and populated-results page reported zero violations in those tested states (22 and 24 rule passes, respectively). This is a useful automated check, not a full accessibility certification.
- Remaining checks: independent human code review, wider device/browser coverage, formal accessibility review, and user testing.

## MVP features
- [x] Public GitHub profile lookup
- [x] Public repository listing (first 100 owned repositories returned by the API)
- [x] Repository metrics with explicit coverage caveats
- [x] Merged pull-request search attempt with incomplete-results caveat
- [x] JSON report export
- [x] API error, network-failure, timeout and rate-limit messaging
- [x] Responsive layout, skip link, keyboard focus styling and live status announcements
- [x] Repository filtering, sorting and pagination
- [x] Shared utility functions with unit tests
- [x] Static integration checks for DOM IDs, assets, username pattern and feature controls
- [x] GitHub Actions checks and GitHub Pages deployment workflow
- [x] Live HTTP and browser checks for core interactions
- [x] Automated accessibility scan of homepage and populated-results state
- [ ] Independent code review
- [ ] Formal accessibility audit
- [ ] Cross-browser and broader device testing
- [ ] User testing with consent
- [ ] Record genuine feedback and any resulting fixes

## Evidence log — only record genuine facts
- Date: 2026-10-19.
- What I personally implemented: Fill in accurately. This repository contains AI-assisted starter implementation; distinguish personal work from AI assistance and explain the code you claim.
- Automated checks: https://github.com/Tarun800/Tarun/actions/runs/39204923857 — syntax checks and Node unit tests passed for commit 06f5d6e4a4b72681243484a105f559126b7b0251.
- Deployment: https://github.com/Tarun800/Tarun/actions/runs/39204923874 — build and deploy jobs succeeded for commit 06f5d6e4a4b72681243484a105f559126b7b0251.
- Published URL: https://tarun800.github.io/Tarun/
- Browser testing: Chromium main flow, JSON export, repository controls, Torvalds PR results, invalid username, simulated 403/404 API failures and mobile layout tested. Automated axe-core scan returned zero violations in the tested states.
- Independent code review: Not completed.
- User testing and feedback: Not yet recorded.
- Real usage/adoption metrics: Not yet measured.
- Known limitations: GitHub unauthenticated API rate limits; repository listing limited to 100; search results may be incomplete; counts do not establish contribution quality, impact, authorship, leadership or immigration eligibility; no independent security audit yet.

## Reporting principles
- Separate personal contributions from work by others, including AI assistance.
- Keep source links to commits, issues, pull requests, releases and feedback.
- Never claim users, awards, recognition, impact or endorsements without evidence.
- Treat this as a portfolio project, not proof of Global Talent eligibility or a substitute for original evidence.
