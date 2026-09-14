# ResuNest documentation

ResuNest is a browser-based resume skill analyzer and job-matching prototype built for the University of Cebu Hackathon 2026.

## Documentation map

- [Getting started](getting-started.md) — install, configure, run, and build the app.
- [Architecture](architecture.md) — application flow, modules, data sources, and browser storage.
- [Feature behavior and limitations](features-and-limitations.md) — current user-facing behavior and demo-only boundaries.

## At a glance

The app accepts pasted resume text or a PDF upload, extracts known skills, compares them with the bundled job dataset, displays ranked matches and missing skills, and links missing skills to learning resources. Authentication and client job-posting utilities use browser `localStorage`; no backend is included.

