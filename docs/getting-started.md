# Getting started

## Requirements

- Node.js 20 or later
- A MongoDB Atlas database
- A Gemini API key kept private

## Install

```powershell
npm.cmd install
```

Copy `.env.example` to `.env` and set these server-only variables:

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_new_gemini_key
GEMINI_MODEL=gemini-3.6-flash
RATE_LIMIT_SALT=a_long_random_private_value
PORT=4000
CLIENT_ORIGIN=http://localhost:3000
```

Do not use `VITE_GEMINI_API_KEY`. Variables beginning with `VITE_` can be included in the browser bundle.

## Run locally

Start the API:

```powershell
npm.cmd run dev:server
```

Start the frontend in another terminal:

```powershell
npm.cmd run dev
```

Vite runs on port 3000 and proxies `/api` requests to the API on port 4000.

## Production build

```powershell
npm.cmd run build
npm.cmd start
```

The Express server serves the built `dist` directory and API from the same origin.

## Verify the local setup

Open `http://localhost:3000`, upload a text-based PDF, and confirm the analysis result appears. You can also check the API directly:

```powershell
Invoke-RestMethod http://localhost:4000/api/health
```

It should report `status` as `ok` and `database` as `connected`.

## Render deployment

Use a Node web service with:

```text
Build Command: npm ci && npm run build
Start Command: npm start
```

Set `MONGODB_URI`, `GEMINI_API_KEY`, `GEMINI_MODEL`, `RATE_LIMIT_SALT`, and `NODE_VERSION=20` in Render Environment settings. Configure MongoDB Atlas Network Access so the deployed service can connect.

After deployment, open the public URL once to register the PWA service worker. The Install button is available on supported browsers when the browser permits installation; otherwise use the browser's **Install app** option.
