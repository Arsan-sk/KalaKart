# Artisan SaaS Platform KalaKart[]

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/Arsan-sk/artisan-saas)

A complete **AI-powered SaaS platform** for local artisans in India to market their crafts, create catalogs, generate social media posts, gain insights, and connect with other artisans — all powered by Supabase, Google Gemini API, and a multilingual React frontend.

---

## Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Environment Variables](#environment-variables)  
- [Running the Project](#running-the-project)  
- [Project Structure](#project-structure)  
- [Future Improvements](#future-improvements)  
- [License](#license)  

---

## Demo

> Add a live demo link here once deployed (Vercel/Netlify).  

---

## Features

### User Flow

1. Landing Page → Registration → Dashboard  
2. Dashboard has tabs: Catalog Builder, Market It, Insights, Profile, Reach  
3. Multilingual support (Hindi, Marathi, Tamil, Telugu, Gujarati, and more)  
4. Full Supabase backend integration for authentication, profiles, and data storage  

### Key Features

- **Catalog Builder**
  - Create and manage product catalogs
  - View previously generated catalogs
  - Suggested viral tags for social media posts
  - Integration guidance for Amazon, Flipkart, and more

- **Market It**
  - Generate posts using AI prompts and optional images
  - History of all generated posts
  - Direct sharing to WhatsApp, Instagram posts, stories
  - Automatic caption, hashtags, mentions
  - Target specific locations for higher reach
  - Placeholder for VEO 3 ad integration (coming soon)

- **Insights**
  - Real-time updates on market trends
  - Trending products and timing for optimal posting
  - Analytics and suggestions tailored to user’s business

- **Profile**
  - Edit profile, logout, and manage user info
  - Store necessary credentials for interacting with Google tools

- **Reach**
  - Social connection platform for artisans
  - Cards showcasing name, username, profile pic, business, and stats
  - Chat and collaboration across regions

---

## Tech Stack

- **Frontend:** Vite + React + TypeScript  
- **Backend:** Node.js (Express) + Supabase (Auth, DB, Storage)  
- **Database:** Supabase Postgres  
- **AI/Tools:** Google Gemini API, Google Translate API  
- **Deployment:** Vercel (frontend), Supabase (backend)  

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Arsan-sk/KalaKart.git
```

Install Dependencies

```bash
npm install
```

---

## Environment Variable
Create a .env.local file in the project root with the following keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<your_supabase_service_role_key>
GEMINI_API_KEY=<your_google_gemini_api_key>
GOOGLE_TRANSLATE_KEY=<your_google_translate_api_key>
```

Replace <...> with your actual credentials from Supabase and Google Cloud.

### For Vercel Deployment
When deploying to Vercel, ensure you set these environment variables in your Vercel Project Settings under "Environment Variables".

-   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL (exposed to client-side)
-   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key (exposed to client-side)
-   `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key (server-side only)
-   `GEMINI_API_KEY`: Your Google Gemini API Key (server-side only)
-   `GOOGLE_TRANSLATE_KEY`: Your Google Translate API Key (server-side only)

---

## Running Project
Start the development server

```bash
npm run dev
```

Frontend: http://localhost:8081

Backend API: http://localhost:8090

Stop the server with Ctrl + C.
If ports are busy, adjust them in vite.config.js or server/index.js.

---

## Project Structure

```bash
artisan-saas/
├─ server/               # Node backend, Supabase API routes
├─ src/
│  ├─ components/        # React components
│  ├─ pages/             # React pages (Dashboard, Login, Register, Catalog, etc.)
│  ├─ lib/               # Supabase clients (frontend & admin)
├─ public/               # Public assets
├─ .env.local            # Environment variables
├─ package.json
├─ vite.config.js
└─ README.md
```

---

## Future Improvements

- Full VEO 3 ad integration for automated marketing
- AI-assisted catalog design and post-generation templates
- Enhanced multilingual support and dynamic translation
- Advanced social analytics dashboard
- Mobile-first optimization for smaller screens

---

## License

MIT License © Arsan-sk[https://github.com/Arsan-sk]

