# Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │  Landing    │  │  Dashboard  │  │  Project Editor / Chat  │ │
│  │  Page       │  │  Page       │  │  (Conversational UI)    │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     NEXT.JS API LAYER                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  /api/auth      │  │  /api/projects  │  │  /api/chat      │ │
│  │  (NextAuth)     │  │  (CRUD)         │  │  (AI Streaming) │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CORE SERVICES                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  SpecParser     │  │  ShelfCalculator│  │  Instruction    │ │
│  │  (NLP → dims)   │  │  (BOM + Cut)    │  │  Generator      │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Prisma ORM     │  │  PostgreSQL     │  │  OpenAI API     │ │
│  │  (Type-safe)    │  │  (Supabase)     │  │  (AI)           │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Frontend Structure

```
src/app/
├── page.tsx                    # Landing page
├── layout.tsx                  # Root layout + providers
├── dashboard/
│   └── page.tsx                # User project list
├── project/
│   └── new/
│       └── page.tsx            # New project editor
└── auth/
    └── signin/
        └── page.tsx            # Sign-in page

src/components/
├── Navbar.tsx                  # Navigation
└── providers/
    └── SessionProvider.tsx     # Auth context
```

## Backend Structure

```
src/app/api/
├── auth/[...nextauth]/
│   └── route.ts                # NextAuth.js handler
├── projects/
│   ├── route.ts                # GET / POST projects
│   └── [id]/
│       └── route.ts            # GET / PUT / DELETE project
└── chat/
    └── route.ts                # AI chat endpoint (streaming)
```

## Core Services

### SpecParser
**Purpose:** Extract dimensions from natural language input

```typescript
interface BookshelfSpec {
  height: number;      // inches
  width: number;       // inches
  depth: number;       // inches
  shelfCount: number;  // total including top/bottom
  materialThickness: number; // inches
}
```

**Example:**
- Input: "I want a 72 inch tall, 36 inch wide bookshelf with 12 inch depth and 5 shelves"
- Output: `{ height: 72, width: 36, depth: 12, shelfCount: 5, materialThickness: 0.75 }`

### ShelfCalculator
**Purpose:** Generate deterministic BOM and cut list

**Formulas (butt joint joinery):**
- Side panels: Width = D, Length = H
- Top/Bottom: Width = W - 2t, Depth = D
- Middle shelves: Width = W - 2t, Depth = D, Qty = N - 2
- Back panel: Width = W, Height = H - t

See [PROJECT_STATE.md](./PROJECT_STATE.md) for complete formula documentation.

### InstructionGenerator
**Purpose:** Generate step-by-step assembly instructions using AI

**Approach:**
- Use Vercel AI SDK for streaming responses
- Prompt template includes: project type, dimensions, parts list
- Output: structured JSON with steps, tips, warnings

## Database Design

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for detailed schema.

### Key Models

**User:**
- id, email, name, image
- createdAt, updatedAt, subscription

**Project:**
- id, userId, name, imageUrl, status
- components (JSON), bom (JSON), cutList (JSON), instructions (JSON)
- skillLevel, kerfWidth
- createdAt, updatedAt

## AI Workflow Design

### Conversational Flow

1. **User Input** → Chat message with dimensions
2. **SpecParser** → Extract/create BookshelfSpec
3. **Confirmation** → Show extracted dimensions, allow edit
4. **ShelfCalculator** → Generate BOM and cut list
5. **InstructionGenerator** → Generate assembly steps (via AI)
6. **Display** → Show all results in chat
7. **Save** → Store to database

### Vercel AI SDK Integration

**Why Vercel AI SDK:**
- Built for Next.js + React Server Components
- Native streaming support (critical for real-time BOM)
- Built-in message history management
- Works with any LLM (OpenAI, Anthropic)
- Server Actions integration

**Implementation:**
- `/api/chat` route handles POST with messages[]
- Use `useChat` hook in React component
- Stream responses for real-time feedback

## Data Flow

```
User: "72x36x12 bookshelf with 5 shelves"
         │
         ▼
    Chat Component
         │
         ▼
    /api/chat (POST)
         │
    ┌────┴────┐
    ▼         ▼
SpecParser  Message History
    │            │
    ▼            ▼
ShelfCalculator ◄────┘
    │            │
    ▼            ▼
BOM + CutList   AI Response
         │            │
         └─────┬──────┘
               ▼
         Stream to UI
```

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Conversational UI | Lower barrier to entry than photo upload; deterministic calculations more reliable |
| Butt joint joinery | Simplest MVP; universally applicable; complex joinery deferred |
| Deterministic calculations first | AI for conversation + instructions; math is exact |
| Vercel AI SDK | Best streaming DX for Next.js; well-maintained |
| Prisma + PostgreSQL | Type-safe DB access; Supabase provides PostgreSQL |

## Future Architecture Considerations

- Photo upload: Requires S3 storage + vision API
- Multiple project types: Extensible calculator pattern
- PDF export: Server-side PDF generation (react-pdf)
- Payment: Stripe integration
- Real-time collaboration: WebSocket add-on