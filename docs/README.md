# WoodCraft AI Planner

An AI-powered woodworking project planner that generates BOMs, cut lists, and assembly instructions from conversational input.

## Project Overview

**Project Name:** WoodCraft AI Planner  
**Type:** Web Application (Next.js)  
**Core Functionality:** Conversational design assistant that helps home woodworkers generate detailed project plans including bills of materials, cut lists, and step-by-step assembly instructions.  
**Target Users:** Home woodworkers (beginner to intermediate) who want buildable plans without complex CAD software.

## Current MVP Scope

**Focus:** Single project type - Bookshelf

- Conversational UI for dimension input
- Deterministic BOM and cut-list generation
- Assembly instruction generation (AI-assisted)
- Project save/load functionality

**Out of Scope (V1):**
- Photo upload and image analysis (deferred)
- Workbench and End Table templates (deferred)
- PDF export (deferred)
- Payment/subscription (deferred)

## Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (via Prisma)
- **AI:** OpenAI (for conversational flow and instruction generation)
- **Auth:** NextAuth.js
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn/bun)
- Supabase account (or local PostgreSQL)

### Installation

```bash
cd projects/woodworking-planner

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and API keys

# Set up database
pnpm prisma generate
pnpm prisma db push

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js |
| `NEXTAUTH_URL` | Base URL for auth (http://localhost:3000 for dev) |
| `OPENAI_API_KEY` | OpenAI API key for AI features |

## Deployment Overview

The application deploys automatically to Vercel when changes are pushed to the main branch.

- **Production URL:** https://woodworking-planner-neon.vercel.app
- **Database:** Supabase PostgreSQL
- **Auth:** NextAuth.js with credentials provider

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment procedures.