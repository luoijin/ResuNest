# Architecture

## Runtime flow

```text
main.jsx
  -> App.jsx
     -> Layout (header, page content, footer)
     -> Login / Signup when signed out
     -> ResumeInput when signed in
        -> useResumeAnalysis
           -> SkillExtractor
           -> jobMatcher + jobsDataset
        -> results: JobCard -> SkillGapChart + Recommendations
```

`App.jsx` owns navigation and result-selection state. It renders the About page independently; signed-out users see the authentication UI, while signed-in users can submit a resume and browse results.

## Analysis pipeline

1. The user pastes resume text or selects a PDF.
2. Text submissions are sent to `src/services/geminiService.js` for AI skill extraction. If Gemini is unavailable, they are scanned against the keyword list in `src/services/SkillExtractor.js`.
3. PDF submissions use PDF.js to extract selectable text from the uploaded file, then send that text to Gemini with the same keyword fallback.
4. `matchJobs` compares extracted and required skills case-insensitively using exact string equality.
5. Each job receives `matchedSkills`, `missingSkills`, and a rounded match percentage: `matched / required * 100`.
6. Results are sorted descending by match score. Selecting a job shows its missing skills and relevant learning links.

## Primary modules

| Area | Location | Responsibility |
|---|---|---|
| Application state and routing | `src/App.jsx` | Session state, page selection, resume-result views |
| Resume analysis | `src/hooks/useResumeAnalysis.js` | Loading/error state and orchestration |
| Skill extraction | `src/services/geminiService.js`, `src/services/SkillExtractor.js` | Gemini extraction with keyword fallback and PDF analysis entry point |
| Job matching | `src/services/jobMatcher.js` | Merge seed/client jobs and calculate scores |
| Seed data | `src/data/jobsDataset.js` | Built-in job roles and required skills |
| Learning links | `src/data/learningMap.js` | Skill-to-resource URL mapping |
| UI | `src/components/` | Authentication, layout, input, cards, result panels |

## Browser storage

| Key | Written by | Purpose |
|---|---|---|
| `resunest_user` | `src/utils/auth.js` | Active email for the App's current demo session |
| `uc_hackathon_users` | `App.jsx` | Demo sign-up records, including passwords |
| `client_jobs` | `src/services/jobMatcher.js` | Additional jobs merged into matching results |
| `resunest_client_jobs` | `src/services/jobStorage.js` | Jobs created through the unused client-job utility |
| `resunest_users` / `resunest_current_user` | `src/hooks/useAuth.js` | Alternative, currently unused authentication hook |

The code contains two separate demo-auth implementations and two client-job storage keys. The App currently uses `src/utils/auth.js` plus `uc_hackathon_users`.
