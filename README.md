# ResuNest

> AI-powered job matching and skill-gap analysis prototype for the University of Cebu Hackathon 2026.

ResuNest helps job seekers compare their resume skills with available roles, understand missing requirements, and find learning resources to close those gaps.

## What it does

- Accepts pasted resume text or a PDF upload.
- Extracts recognized technical and professional skills.
- Ranks bundled job roles by skill match percentage.
- Shows matched and missing skills for each role.
- Provides learning-resource links for missing skills.
- Includes local, demo-only sign-up and login flows.

## Tech stack

- React 18
- Vite
- Tailwind CSS
- Lucide React
- PDF.js (`pdfjs-dist`)

## Quick start

### Prerequisites

- Node.js 16 or later
- npm

### Run locally

```bash
npm install
npm run dev
```

The Vite development server is configured for port `3000`.

### Build

```bash
npm run build
```

If PowerShell blocks `npm.ps1`, use the Windows command shim instead:

```powershell
npm.cmd run build
```

## Configuration

Create a `.env` file only if you plan to connect the legacy Gemini service:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

The active analysis workflow currently uses a local keyword extractor, so no API key is required to run the app.

## Important notes

- PDF upload currently uses a mock resume-extraction path; its contents do not yet change the analysis result.
- Authentication is demo-only and stores account data in browser `localStorage`. Do not use real credentials.
- Job matching uses case-insensitive exact skill-name comparisons against the bundled dataset.

## Documentation

More detailed documentation is available in [docs/README.md](docs/README.md):

- [Getting started](docs/getting-started.md)
- [Architecture](docs/architecture.md)
- [Feature behavior and limitations](docs/features-and-limitations.md)

## Project structure

```text
src/
  components/  # UI components and layout
  data/        # Job dataset and learning-resource map
  hooks/       # Resume-analysis and supporting hooks
  services/    # Extraction, matching, PDF, and storage services
  utils/       # Demo-auth helpers and utilities
docs/          # Project documentation
```
