# Database Schema

## Overview

- **Provider:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Location:** `prisma/schema.prisma`

## Current Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid()) @db.Uuid
  email         String    @unique
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  subscription  String    @default("free") // free, pro
  projects      Project[]
}

model Project {
  id            String    @id @default(uuid()) @db.Uuid
  userId        String    @db.Uuid
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  name          String
  imageUrl      String?
  status        String    @default("draft") // draft, complete
  
  // JSON fields for AI-generated content
  components    Json?
  bom           Json?
  cutList       Json?
  instructions  Json?
  
  // Settings
  skillLevel    String    @default("beginner") // beginner, intermediate
  kerfWidth     Float     @default(3.0) // mm
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([userId])
  @@index([status])
}
```

## Table Descriptions

### User

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key, auto-generated |
| email | String (unique) | User email, used for auth |
| name | String (optional) | Display name |
| image | String (optional) | Avatar URL |
| createdAt | DateTime | Account creation timestamp |
| updatedAt | DateTime | Last profile update |
| subscription | String | Tier: "free" or "pro" |
| projects | Relation | One-to-many with Project |

### Project

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key, auto-generated |
| userId | UUID | Foreign key to User |
| name | String | Project name (e.g., "My Bookshelf") |
| imageUrl | String (optional) | Uploaded image path |
| status | String | "draft" or "complete" |
| components | JSON (optional) | Detected components from AI analysis |
| bom | JSON (optional) | Generated Bill of Materials |
| cutList | JSON (optional) | Generated cut list |
| instructions | JSON (optional) | Assembly instructions |
| skillLevel | String | "beginner" or "intermediate" |
| kerfWidth | Float | Kerf width in mm (default 3.0) |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last modification |

## Relationships

```
User (1) ──────< Project (many)
```

- One User can have many Projects
- Cascade delete: deleting a User deletes all their Projects

## Indexes

| Index | Table | Fields | Purpose |
|-------|-------|--------|---------|
| userId | Project | userId | Faster project lookups by user |
| status | Project | status | Filter projects by status |

## JSON Field Schemas

### bom (Bill of Materials)

```json
{
  "items": [
    {
      "name": "Side Panel",
      "material": "3/4\" plywood",
      "quantity": 2,
      "dimensions": { "length": 72, "width": 12, "thickness": 0.75 },
      "notes": "Full height"
    }
  ]
}
```

### cutList

```json
{
  "parts": [
    {
      "name": "Side",
      "quantity": 2,
      "length": 72,
      "width": 12,
      "thickness": 0.75,
      "material": "3/4\" x 12\" x 8'"
    }
  ],
  "materialSummary": {
    "lumber": [
      { "description": "3/4\" x 12\" x 8'", "quantity": 2 },
      { "description": "3/4\" x 12\" x 4'", "quantity": 5 }
    ]
  }
}
```

### instructions

```json
{
  "steps": [
    {
      "number": 1,
      "title": "Cut Side Panels",
      "description": "Cut two pieces to 72\" x 12\"...",
      "tips": ["Use a straight edge guide"],
      "warnings": ["Wear safety glasses"]
    }
  ],
  "totalTime": "4-6 hours",
  "difficulty": "beginner"
}
```

## Migration History

| Date | Migration | Description |
|------|-----------|-------------|
| 2026-05-26 | Initial | Created User and Project models |
| 2026-05-29 | Add fields | Added missing createdAt, updatedAt, subscription to User |

## Known Database Issues

### Issue: Missing Columns (RESOLVING)
- **Problem:** Supabase User table missing `createdAt`, `updatedAt`, `subscription` columns
- **Fix:** Apply SQL ALTER TABLE statement
- **Status:** Pending application

## Future Planned Schema Changes

### BookshelfSpec (Future)
```prisma
model BookshelfSpec {
  id          String  @id @default(uuid())
  projectId   String  @unique
  project     Project @relation(fields: [projectId], references: [id])
  height      Float
  width       Float
  depth       Float
  shelfCount  Int
  material    String  // "3/4 plywood", "1x lumber", etc.
}
```

### Additional Project Types (Future)
- WorkbenchSpec
- EndTableSpec
- CustomSpec

## Assumptions

1. **UUIDs:** All primary keys use UUID format
2. **Timestamps:** All tables include createdAt/updatedAt
3. **Soft delete:** Not implemented (using cascade delete)
4. **JSON storage:** Flexible schema for AI-generated content
5. **Kerf:** Default 3mm, user-adjustable

## Connecting to Database

### Local Development
```bash
# Create local SQLite database
pnpm prisma generate
pnpm prisma db push

# View in Prisma Studio
pnpm prisma studio
```

### Supabase (Production)
```bash
# Apply migrations
pnpm prisma db push

# Or create migration
pnpm prisma migrate dev --name init
```

## Environment Variable

```
DATABASE_URL=postgresql://user:password@host:5432/database
```

For Supabase, get connection string from:
Dashboard → Settings → Database → Connection string