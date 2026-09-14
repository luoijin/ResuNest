# ResuNest

ResuNest is a community-focused, AI-assisted career discovery service. It helps people understand the strengths in their resume and explore the fields where they may thrive.

Live site: [resunest.onrender.com](https://resunest.onrender.com)

## What it does

- Accepts PDF resumes with selectable text.
- Extracts professional and domain skills with Gemini through a protected server API.
- Falls back to local keyword extraction when Gemini is temporarily unavailable.
- Matches skills against a bundled role catalog spanning technology, education, healthcare, engineering, IT, hospitality, and crew roles, helping people identify their strongest career field.
- Shows match scores, skill gaps, and learning recommendations.
- Saves recent analyses locally in the visitor's browser.
- Lets visitors download their current result as a PDF report.
- Limits anonymous visitors to five PDF analyses per three-hour window.

## Stack

- React and Vite
- Express and Node.js
- MongoDB Atlas with Mongoose
- Google Gemini API
- PDF.js for browser-side text extraction
- jsPDF for downloadable reports
- Render for deployment

## Run locally

Install dependencies:

```powershell
npm.cmd install
```

Create `.env` from `.env.example`, then add real values for `MONGODB_URI`, `GEMINI_API_KEY`, and `RATE_LIMIT_SALT`.

Start the API in one terminal:

```powershell
npm.cmd run dev:server
```

Start Vite in a second terminal:

```powershell
npm.cmd run dev
```

## Security

Keep `.env` private. Gemini and MongoDB secrets must never use a `VITE_` prefix or be committed to Git. The browser sends extracted resume text to the protected API; it does not receive the Gemini key.

## Documentation

- [Getting started](docs/getting-started.md)
- [Architecture](docs/architecture.md)
- [Features and limitations](docs/features-and-limitations.md)
