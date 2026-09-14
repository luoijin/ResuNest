# Architecture

## Request flow

```text
Visitor uploads PDF
  -> PDF.js extracts selectable text in the browser
  -> POST /api/analysis/skills
     -> MongoDB checks anonymous PDF quota
     -> Gemini extracts skills using server-only credentials
  -> browser matches skills against bundled job catalog
  -> results, skill gaps, recommendations, and local history
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

## Data storage

MongoDB stores only anonymized PDF usage counters. The visitor IP is salted and hashed before it is stored; counters expire after the quota window.

Recent analysis history is stored in the visitor's `localStorage`. It survives a browser restart on the same device, but does not sync across devices and can be removed by clearing browser data.

## Deployment

Render runs one Node web service. It builds the Vite frontend, serves `dist`, runs Express API routes, and connects to MongoDB Atlas. This same-origin setup keeps browser-to-API calls simple and avoids exposing Gemini credentials.
