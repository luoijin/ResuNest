# Features and limitations

## Current features

- Public access: no account or sign-up is required.
- PDF-only resume input.
- Gemini-powered skill extraction with a local keyword fallback.
- Career matching across technical and non-technical fields.
- Match scores, matched skills, missing skills, and learning links.
- Local analysis history with per-item removal and restore controls.
- Downloadable PDF analysis report.
- Light and dark themes with responsive layouts.
- Five PDF analyses per anonymous visitor in each three-hour window.

## Important limitations

### Resume PDFs

ResuNest needs a PDF with selectable text. Scanned or image-only resumes need OCR before their text can be extracted accurately.

### AI and matching

Gemini can make mistakes and may omit or normalize skills differently from the original resume. The local fallback is intentionally simpler and less accurate. Job scores are recommendations based on skill overlap, not a hiring decision or guarantee of suitability.

### Job catalog

The matching roles are curated and bundled with the application. ResuNest does not currently retrieve live postings from Upwork, Indeed, OnlineJobs.ph, or other job boards.

### Privacy and history

The uploaded file remains in the browser, but extracted resume text is sent to the ResuNest server and Gemini for analysis. History is local to the current browser; it is not account-backed or cross-device.

### Usage limit

The PDF limit is keyed to a salted hash of the visitor IP. Visitors on a shared network can share a quota, and changing networks may create a new quota identity.
