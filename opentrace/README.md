# OpenTrace — Open-source Contribution Explorer

OpenTrace is a static web application that explores public GitHub profile data, repositories, and a limited search for merged pull requests. It is built with HTML, CSS and vanilla JavaScript.

## Live app
https://tarun800.github.io/Tarun/

## Deployment
GitHub Actions deploys the contents of this folder to GitHub Pages when relevant files change. A successful workflow confirms deployment, but manual browser checks are still needed to verify live interactions.

## Try it locally
1. Open a terminal in the `opentrace` directory.
2. Run `python -m http.server 8000`.
3. Open http://localhost:8000.

A local server is recommended because browser security settings can restrict requests from a page opened directly from disk.

## Features
- Public GitHub profile lookup
- Repository list, filtering by name/description/language, sorting, and pagination
- Repository summary metrics with coverage caveats
- Search for selected merged pull requests
- JSON export with source URLs and explicit limitations
- Responsive layout, status announcements, keyboard focus styling and a skip link
- Input validation and escaped API-provided text
- Unit tests using Node's built-in test runner
- GitHub Actions checks on pushes and pull requests

## Run tests
Requires Node.js 20 or newer:

```bash
node --check app.js
node --check utils.js
node --test
```

## Limitations
- No authentication or personal access token is requested.
- Unauthenticated GitHub API rate limits apply.
- The app loads at most the 100 most recently updated repositories owned by the profile; counts for loaded repositories must not be interpreted as all-account totals.
- Pull-request search results may be incomplete and are not a comprehensive contribution audit.
- Activity counts do not prove code quality, authorship, impact, innovation or leadership.
- The app has not yet undergone an independent security or accessibility audit or formal user testing.
- Do not use it as an immigration eligibility score or as a substitute for original evidence.

## Next steps
1. Manually test live profile search, filtering, sorting, pagination and JSON export in a browser.
2. Conduct an accessibility audit and independent code review.
3. Invite developers to test the app and document genuine feedback with consent.
4. Consider pagination beyond 100 API records only after documenting rate-limit and coverage behaviour.

## Evidence and honest reporting
Record your own contributions, tests, feedback and improvements in [PROJECT_PLAN.md](PROJECT_PLAN.md). The current starter implementation includes AI-assisted work; distinguish your own contributions from assistance and only report work you can explain and demonstrate. Never claim users, awards, recognition, impact or endorsements without evidence. A portfolio project does not guarantee eligibility for a UK Global Talent visa. See the [official eligibility guidance](https://www.gov.uk/global-talent-digital-technology/eligibility).

## Data source
The application uses the [GitHub REST API](https://docs.github.com/en/rest). OpenTrace is an independent project and is not affiliated with GitHub or a UK immigration authority.
