# Getting started

## Prerequisites

- Node.js 16 or later
- npm

## Install and run

From the repository root:

```bash
npm install
npm run dev
```

Vite is configured to serve the app on port `3000` and open a browser window. To create a production build, run:

```bash
npm run build
```

To preview a built version locally:

```bash
npm run preview
```

## Configuration

The `.env` file is ignored by Git. The active Gemini integration reads this variable:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

The active resume-analysis hook calls Gemini first, then falls back to local keyword extraction if Gemini is unavailable. The app defaults to `gemini-3.8-flash` and retries compatible Flash models; set `VITE_GEMINI_MODEL` to override it.

## Dependencies

The application uses React 18, Vite, Tailwind CSS, Lucide React, and `pdfjs-dist`. The PDF text-extraction service imports `pdfjs-dist`; its current upload flow deliberately uses a mock PDF extractor instead of the live parser.
