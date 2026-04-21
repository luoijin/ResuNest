# 🪺 ResuNest - AI-Powered Job Matching & Skill Gap Analyzer

> University of Cebu Hackathon 2026

ResuNest is an intelligent web application that extracts skills from resumes, matches users with relevant job opportunities, identifies skill gaps, and provides personalized learning recommendations using Google's Gemini AI.

## 🎯 Problem Statement

Job seekers often waste time applying to positions they're underqualified for without knowing which skills they're missing or how to acquire them. ResuNest solves this by providing instant, AI-powered job matching with actionable learning paths.

## ✨ Features

- **Resume Processing**: Paste text or upload PDF resumes
- **AI Skill Extraction**: Uses Google Gemini 1.5 Flash with keyword fallback
- **Job Matching**: Match scores calculated against 15+ job profiles
- **Skill Gap Analysis**: Identifies missing skills for each job
- **Learning Recommendations**: Curated resources for each missing skill
- **User Authentication**: Simple localStorage-based auth for demo
- **Responsive Design**: Mobile-friendly Tailwind CSS UI

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS |
| **AI/ML** | Google Gemini API (1.5 Flash) |
| **PDF Processing** | PDF.js |
| **Icons** | Lucide React |
| **Language** | JavaScript (ES6+) |
| **Build Tool** | Vite |
| **Version Control** | Git + GitHub |


## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/luoijin/ResuNest.git
cd ResuNest

# 2. Install dependencies
npm install

# 3. Install additional packages
npm install pdfjs-dist
npm install lucide-react

# 4. Create .env file and add your Gemini API key
VITE_GEMINI_API_KEY=your_api_key_here

# 5. Start development server
npm run dev
```



