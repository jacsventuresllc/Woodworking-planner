# Project State

**Last Updated:** 2026-05-29

## Current Project Status

| Attribute | Value |
|-----------|-------|
| Status | Pre-implementation (Awaiting Database Fix) |
| MVP Scope | Bookshelf-only |
| Target | Testable MVP |

---

## Completed Features

| Feature | Status | Date |
|---------|--------|------|
| Project scaffolding (Next.js + Prisma + Tailwind) | ✅ Complete | 2026-05-26 |
| Basic landing page | ✅ Complete | 2026-05-26 |
| NextAuth.js integration | ✅ Complete | 2026-05-26 |
| Project CRUD API routes | ✅ Complete | 2026-05-26 |
| Dashboard page | ✅ Complete | 2026-05-26 |
| Prisma schema (User, Project models) | ✅ Complete | 2026-05-26 |
| Vercel deployment | ✅ Complete | 2026-05-26 |
| Pivot: Photo-first → Conversational | ✅ Approved | 2026-05-28 |

---

## Features In Progress

None - blocked on database schema fix.

---

## Known Blockers

### Database Schema Issue
- **Issue:** User table missing columns in Supabase
- **Missing fields:** `createdAt`, `updatedAt`, `subscription`
- **Status:** Awaiting SQL fix application
- **Impact:** Cannot begin bookshelf calculator implementation

---

## Known Bugs

None reported.

---

## Technical Debt

1. **No input validation** on API routes
2. **No error boundaries** in React components
3. **No loading skeletons** - just empty states
4. **Hardcoded assembly instructions** - will need AI integration
5. **No kerf calculation** in current spec

---

## Current Priorities

1. **Immediate:** Apply database schema fix to Supabase
2. **Phase 1:** Build ShelfCalculator class with exact formulas
3. **Phase 2:** Implement Vercel AI SDK chat UI
4. **Phase 3:** Connect calculator to UI, display BOM/cut list
5. **Phase 4:** Add AI instruction generation

---

## Next Recommended Tasks

### Task 1: Apply Database Schema Fix
```sql
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS "subscription" TEXT DEFAULT 'free';
```

### Task 2: Implement ShelfCalculator
- Create `src/lib/calculators/shelfCalculator.ts`
- Implement exact BOM/cut-list formulas
- Add unit tests with 72"x36"x12" example

### Task 3: Build Conversational UI
- Install Vercel AI SDK
- Create chat component
- Set up streaming API route

---

## Open Questions & Decisions Pending

| Question | Options | Decision Needed By |
|----------|---------|-------------------|
| Shelf count definition | 5 total vs 5 adjustable + top/bottom | Before calculator implementation |
| Back panel dimensions | Full height vs half height (spline) | Before calculator implementation |
| Material defaults | 3/4" fixed or user input? | Before calculator implementation |
| Lumber optimization | Raw cut sizes vs standard dimensions | Before BOM display |

---

## Implementation Formulas (Approved)

### Bookshelf Parts (Butt Joint)

**Variables:**
- `H` = Overall height
- `W` = Overall width  
- `D` = Overall depth
- `t` = Material thickness (0.75" default)
- `N` = Total shelves (including top/bottom)

| Part | Qty | Width | Depth |
|------|-----|-------|-------|
| Side | 2 | D | H |
| Top | 1 | W - 2t | D |
| Bottom | 1 | W - 2t | D |
| Middle Shelves | N - 2 | W - 2t | D |
| Back Panel | 1 | W | H - t |

### Worked Example (72" x 36" x 12", 3/4" material, 5 shelves)

| Part | Qty | Length | Width |
|------|-----|--------|-------|
| Side | 2 | 72" | 12" |
| Top | 1 | 34.5" | 12" |
| Bottom | 1 | 34.5" | 12" |
| Middle Shelf | 3 | 34.5" | 12" |
| Back Panel | 1 | 72" | 35.25" |

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| 0.1.0 | 2026-05-29 | MVP scope narrowed to bookshelf-only |

---

*This document should be updated at the end of every major development session.*