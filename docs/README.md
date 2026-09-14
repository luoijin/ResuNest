# ResuNest documentation

ResuNest is a public, community-focused PDF resume analyzer that helps people discover career fields that fit their strengths. It is deployed on Render.

It has no user accounts. Visitors can install it as a PWA, analyze up to five PDFs per three-hour window, keep history in their browser, and download an analysis report.

## Documentation map

- [Getting started](getting-started.md) - configure and run the API and frontend locally.
- [Architecture](architecture.md) - the secure analysis flow, MongoDB usage, and deployment design.
- [Features and limitations](features-and-limitations.md) - current user behavior, privacy notes, and known boundaries.

## Quick facts

- Input: text-based PDF resumes only.
- AI: Gemini is called through the server, never directly from the browser.
- Storage: MongoDB retains only anonymous, hashed usage counters; browser history stays on the visitor's device.
- Deployment: one Render Node service hosts both the API and built frontend.
