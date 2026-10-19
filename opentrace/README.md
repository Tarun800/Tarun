# OpenTrace — Open-source Contribution Explorer

OpenTrace is a static web MVP that displays public GitHub profile data, public repositories, and a limited search for merged pull requests.

## Run locally
From this folder, run:

```bash
python -m http.server 8000
```

Open http://localhost:8000.

## Features
- Search a public GitHub username
- View profile and selected public repository details
- Search for merged pull requests
- Export a JSON snapshot with source links
- Responsive layout and basic keyboard accessibility

## Limitations
- No authentication or personal access token is requested.
- Unauthenticated GitHub API rate limits apply.
- Repository and pull-request results may be incomplete.
- Activity counts do not prove code quality, authorship, impact, innovation or leadership.
- This MVP has not yet been independently audited or tested in a production environment.
- Do not use it as an immigration eligibility score or as a substitute for original evidence.

## Roadmap
1. Add automated tests for parsing and API error cases.
2. Add pagination and clearer coverage metadata.
3. Add accessibility testing and improve screen-reader support.
4. Invite developers to test the app and record feedback with permission.
5. Document security and privacy decisions before any data is stored.

## Immigration note
A portfolio project does not guarantee eligibility for a UK Global Talent visa. Any application must truthfully evidence the applicant's own work and meet the current official criteria:
https://www.gov.uk/global-talent-digital-technology/eligibility
