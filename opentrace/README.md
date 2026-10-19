# OpenTrace — Open-source Contribution Explorer

OpenTrace is a static web application that explores public GitHub profile data, repositories, and a limited search for merged pull requests. It is built with HTML, CSS and vanilla JavaScript.

## Deployment
The repository includes a GitHub Actions workflow for deploying this folder to GitHub Pages. Deployment is only considered complete after the workflow succeeds and the published site is verified.

## Try it
1. Open a terminal in the `opentrace` directory.
2. Run `python -m http.server 8000`.
3. Open http://localhost:8000.

A local server is recommended because browser security settings can restrict requests from a page opened directly from disk.

## Features
- Public GitHub profile lookup
- Repository list and summary metrics
- Search for selected merged pull requests
- JSON export with source URLs and a limitations note
- Responsive layout, status announcements and a skip link
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
- Search results and repository records may be incomplete.
- Activity counts do not prove code quality, authorship, impact, innovation or leadership.
- This is an MVP and has not yet undergone an independent security or accessibility audit.
- Do not use it as an immigration eligibility score or as a substitute for original evidence.

## Roadmap
1. Add pagination and clearer API coverage metadata.
2. Add filtering and comparison of repositories.
3. Conduct an accessibility audit and independent code review.
4. Invite developers to test the app and document genuine feedback with consent.
5. Deploy the static app after reviewing its limitations.

## Evidence and honest reporting
Record your own contributions, tests, feedback and improvements in [PROJECT_PLAN.md](PROJECT_PLAN.md). Never claim users, awards, recognition, impact or endorsements without evidence. A portfolio project does not guarantee eligibility for a UK Global Talent visa. See the [official eligibility guidance](https://www.gov.uk/global-talent-digital-technology/eligibility).

## Data source
The application uses the [GitHub REST API](https://docs.github.com/en/rest). OpenTrace is an independent project and is not affiliated with GitHub or a UK immigration authority.
