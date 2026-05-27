# Woodworking Project Planner - MVP Specification

## 1. Project Overview

**Project Name:** WoodCraft AI Planner  
**Type:** Web Application (PWA)  
**Core Functionality:** AI-powered tool that converts photos/sketches of woodworking projects into actionable BOMs, cut lists, and assembly instructions.  
**Target Users:** Home woodworkers (beginner to intermediate) who want to turn ideas into buildable plans without using complex CAD software.

---

## 2. UI/UX Specification

### Layout Structure

**Pages:**
1. **Landing Page** - Hero, features, pricing, CTA
2. **Dashboard** - Project list, create new, account settings
3. **Project Editor** - Photo upload, AI analysis, BOM/cut list view, export

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette:**
- Primary: `#2D5A27` (Forest Green - evokes wood/nature)
- Secondary: `#8B4513` (Saddle Brown - wood tone)
- Accent: `#F5A623` (Amber - action buttons)
- Background: `#FDFBF7` (Warm off-white)
- Surface: `#FFFFFF` (White cards)
- Text Primary: `#1A1A1A`
- Text Secondary: `#6B6B6B`
- Success: `#22C55E`
- Warning: `#F59E0B`
- Error: `#EF4444`

**Typography:**
- Headings: `"Playfair Display", serif` - Warm, craftsmanship feel
- Body: `"Inter", sans-serif` - Clean, readable
- Monospace (dimensions): `"JetBrains Mono", monospace`

**Spacing System:**
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Visual Effects:**
- Card shadows: `0 2px 8px rgba(0,0,0,0.08)`
- Hover shadows: `0 4px 16px rgba(0,0,0,0.12)`
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)
- Transitions: 200ms ease-out

### Components

**Navigation:**
- Logo (left)
- Nav links: Features, Pricing, Dashboard (center)
- Sign In / Get Started (right)
- Mobile: Hamburger menu

**Hero Section:**
- Large headline with wood-related imagery
- Subheadline explaining value prop
- CTA button: "Start Planning Free"
- Social proof: "500+ projects planned"

**Project Card:**
- Thumbnail (uploaded photo)
- Project name
- Date created
- Status badge (Draft/Complete)
- Quick actions (Edit, Delete, Export)

**Upload Zone:**
- Drag-and-drop area
- Click to browse
- Supported formats: JPG, PNG, WebP
- Max size: 10MB
- Progress indicator during upload

**AI Analysis Panel:**
- Original image display
- Confidence indicators for detected components
- Editable component list
- "Regenerate" button

**BOM Table:**
- Columns: Item, Material, Quantity, Dimensions, Notes
- Add/remove rows
- Edit inline
- Sort by category

**Cut List Table:**
- Columns: Piece, Material, Length, Width, Thickness, Quantity, Kerf Adjustment
- Total material calculation
- Kerf-aware toggle

**Assembly Steps:**
- Numbered list
- Each step: Description, optional diagram, tips
- Skill level toggle (affects complexity of instructions)
- Time estimate per step

**Pricing Cards:**
- Free tier: 3 projects, basic features
- Pro tier: $9.99/mo, unlimited AI, PDF export
- Feature comparison list

---

## 3. Functionality Specification

### Core Features

**F1: Photo Upload & Analysis**
- User uploads photo of project (furniture, sketch, etc.)
- AI (GPT-5.4 Vision) analyzes image
- Extracts: components, materials, approximate dimensions
- Shows confidence score for each detection
- User confirms/edits detected components

**F2: BOM Generation**
- Auto-generates Bill of Materials from analyzed components
- Groups by material type (lumber, hardware, finish)
- Includes: item name, material, quantity, dimensions, notes
- User can add/remove/edit items

**F3: Cut List Generation**
- Calculates pieces needed from BOM
- Accounts for kerf (blade thickness) - adjustable setting
- Shows: piece name, dimensions, quantity, total material needed
- Optimized cut layout suggestion

**F4: Assembly Instructions**
- AI generates step-by-step assembly instructions
- Based on project type and components
- Includes: step description, tips, warnings
- Skill level toggle:
  - Beginner: Simplified steps, warnings about difficult operations
  - Intermediate: Technical specs, assume tool familiarity

**F5: PDF Export**
- Generates printable PDF with:
  - Project name and date
  - Component image
  - BOM
  - Cut list
  - Assembly steps

**F6: Project Management**
- Save projects to account
- List all projects with thumbnails
- Edit existing projects
- Delete projects
- Duplicate projects

### User Interactions & Flows

**New Project Flow:**
1. Click "New Project" → Project Editor
2. Upload photo → AI analyzes (loading state)
3. Review detected components → Edit if needed
4. Generate BOM → Review/edit
5. Generate Cut List → View kerf-adjusted totals
6. Generate Assembly Steps → Select skill level
7. Export PDF or Save Project

**Account Flow:**
1. Sign up (email or OAuth)
2. Dashboard shows all projects
3. Settings: Update profile, manage subscription

### Data Handling

**User Data (PostgreSQL):**
- Users: id, email, name, created_at, subscription_tier
- Projects: id, user_id, name, image_url, components_json, bom_json, cutlist_json, instructions_json, skill_level, created_at, updated_at

**AI Responses (cached in Redis):**
- Image analysis results
- Prompt templates
- Response schemas

**File Storage (S3):**
- Uploaded images
- Generated PDFs

### Edge Cases

- Low quality/blurry photos → Show error, suggest better photo
- Complex/ambiguous project → Show low confidence, allow manual entry
- No components detected → Allow manual component entry
- API timeout → Retry with exponential backoff, show error after 3 attempts
- Credit limit reached (free tier) → Show upgrade prompt

---

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Landing page loads with hero, features, pricing sections
- [ ] Color scheme matches forest green/wood tone palette
- [ ] Typography uses Playfair Display for headings, Inter for body
- [ ] Cards have subtle shadows and rounded corners
- [ ] Responsive layout works on mobile/tablet/desktop

### Functional Checkpoints
- [ ] Photo upload accepts JPG/PNG/WebP up to 10MB
- [ ] AI analysis returns components with confidence scores
- [ ] BOM table is editable (add/remove/change rows)
- [ ] Cut list shows kerf-adjusted calculations
- [ ] Assembly steps change based on skill level toggle
- [ ] PDF export generates downloadable file
- [ ] Projects save to database and appear in dashboard
- [ ] Free tier limits to 3 projects
- [ ] Pro tier ($9.99) enables unlimited projects

### Technical Checkpoints
- [ ] Next.js app builds without errors
- [ ] API routes handle requests correctly
- [ ] Database schema supports all required data
- [ ] PWA works offline (basic)
- [ ] Page load < 3 seconds

---

## 5. Technical Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (via Prisma)
- **AI:** OpenAI GPT-5.4 Vision API
- **File Storage:** AWS S3
- **Payments:** Stripe
- **Auth:** NextAuth.js
- **PWA:** next-pwa

---

## 6. Out of Scope (v1)

- 3D visualization
- Client management
- Quote generation
- Supplier integration
- CNC export
- Team collaboration
- Mobile apps (responsive web only)
- Offline mode (PWA basic)