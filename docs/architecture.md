# Architecture

## Request flow

```text
Visitor uploads PDF
  -> PDF.js extracts selectable text in the browser
  -> POST /api/analysis/skills
     -> MongoDB checks anonymous PDF quota
     -> Gemini extracts skills using server-only credentials
  -> browser matches skills against bundled job catalog
  -> results, skill gaps, recommendations, local history, and PDF report
```

The PDF file stays in the browser. Its extracted text is sent to the ResuNest API for Gemini analysis. Gemini credentials are held only by the server.

## Components

| Area | Location | Responsibility |
|---|---|---|
| Application UI | `src/App.jsx` | Navigation, analysis results, local history, PDF report download |
| PDF input | `src/components/ResumeInput.jsx` | PDF selection and upload state |
| PDF extraction | `src/services/pdfService.js` | Extract selectable text through bundled PDF.js worker |
| API client | `src/services/geminiService.js` | Sends resume text to the same-origin analysis endpoint |
| Analysis API | `server/routes/analysis.js` | Enforces PDF quota and calls Gemini |
| Gemini service | `server/services/geminiService.js` | Server-only Gemini request and response validation |
| Usage limit | `server/routes/usage.js`, `server/models/PdfUsage.js` | MongoDB-backed anonymous usage window |
| Matching | `src/services/jobMatcher.js` | Calculates match scores and gaps against bundled roles |
| Career data | `src/data/jobsDataset.js` | Curated role and skill catalog |
| PWA | `vite.config.js` | Generates the web manifest and service worker for installation |

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Reports whether the API and MongoDB connection are available. |
| `POST` | `/api/analysis/skills` | Accepts extracted resume text, enforces the PDF quota, and returns Gemini-extracted skills. |

`POST /api/analysis/skills` accepts `{ resumeText, sourceType: "pdf" }`. A successful response includes `skills` and, for PDF input, the remaining anonymous usage count and reset time. A `429` response means the five-analysis window has been used.

## Data storage

MongoDB stores only anonymized PDF usage counters. The visitor IP is salted and hashed before it is stored; counters expire after the quota window.

Recent analysis history is stored in the visitor's `localStorage`. The currently opened analysis is also kept in session storage so it remains open after a refresh. Neither is account-backed, synchronized across devices, nor guaranteed to survive cleared browser data.

## Deployment

Render runs one Node web service. It builds the Vite frontend, serves `dist`, runs Express API routes, and connects to MongoDB Atlas. This same-origin setup keeps browser-to-API calls simple and avoids exposing Gemini credentials.

The Vite PWA plugin generates the web manifest and service worker during the production build. A supported browser can install ResuNest from the in-app Install button or its browser menu.
