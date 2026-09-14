# Feature behavior and limitations

## Implemented user experience

- Create a local demo account, then sign in with its email and password.
- Paste resume text, load a bundled sample resume, or select a PDF file.
- Review detected skills and ranked matches from the bundled job dataset.
- Select a job to view its exact missing skills and learning-resource links.
- Use the header to switch between Home and About, and sign out.

## Current implementation details

### Skill extraction

The active extractor calls Gemini for skill extraction, then uses deterministic keyword matching if the request fails or no API key is configured. The local fallback recognizes a fixed list including Python, JavaScript, SQL, React, Node.js, Git, Docker, AWS, project management, communication, and Figma. It does not infer equivalent skills, experience level, proficiency, or semantic context.

### PDF uploads

The UI accepts only files whose browser MIME type is `application/pdf`. `pdfService.js` uses PDF.js to extract selectable text from the uploaded file. Image-only or scanned PDFs without a text layer require OCR and display an error asking the user to paste the resume text instead.

### Job matching

The seed dataset currently contains 12 roles. A score is the percentage of a job's required skills that exactly match an extracted skill after lowercasing. The implementation has no weighting, synonym mapping, location, salary, seniority, or job-description matching.

### Authentication and security

Authentication is for demonstration only. Accounts and plain-text passwords are stored in browser `localStorage`; there is no server, password hashing, authorization, account recovery, or multi-device session support. Do not use real credentials. Gemini calls also run from the browser in this prototype, so move them behind a backend before public deployment to protect the API key.

## Known maintenance notes

- `src/hooks/useAuth.js`, `src/services/jobStorage.js`, `src/services/useJobPosting.js`, and `src/services/geminiService.js` are alternative/legacy paths that are not connected to `App.jsx`.
- `App.jsx` imports component paths with lowercase directory names while the folders on disk use capitalization (for example `Auth` and `Layout`). This works on typical Windows setups but can fail on case-sensitive filesystems.
- The README's Gemini and PDF claims should be read alongside this documentation; the source code reflects the current behavior described here.
