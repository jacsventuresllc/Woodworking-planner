# Roadmap

## Product Vision

**WoodCraft AI Planner** is an AI-powered tool that helps home woodworkers turn ideas into buildable project plans. Users describe their project conversationally, and the app generates accurate BOMs, cut lists, and assembly instructions.

**Long-term vision:** The "TurboTax for woodworking" — accessible, guidance-oriented, removes the complexity from project planning so woodworkers can focus on building.

---

## Current MVP Scope

**Focus:** Bookshelf-only with conversational UI

### MVP Features
- [ ] Conversational dimension input (chat interface)
- [ ] Deterministic BOM generation (exact formulas)
- [ ] Cut list generation (with lumber optimization hints)
- [ ] Basic assembly instructions (AI-generated)
- [ ] Project save/load
- [ ] User authentication

### MVP Timeline
- **Target:** 6 days to testable MVP
- **Current status:** Blocked on database schema fix

---

## Planned Future Features

### Phase 2: Multiple Project Types
- [ ] Workbench template
- [ ] End Table template
- [ ] Extensible calculator framework

### Phase 3: Enhanced Input
- [ ] Photo upload + AI analysis (deferred from MVP)
- [ ] Sketch recognition
- [ ] Dimension presets / templates

### Phase 4: Output Enhancement
- [ ] PDF export
- [ ] Material optimization (cut optimizer)
- [ ] Cost estimation
- [ ] Supplier integration hints

### Phase 5: Advanced Features
- [ ] 3D visualization
- [ ] CNC export (G-code)
- [ ] Team collaboration
- [ ] Mobile app

---

## Prioritized Backlog

| Priority | Feature | Effort | Value | Notes |
|----------|---------|--------|-------|-------|
| P0 | Database fix | 1 day | Blocker | Must complete first |
| P1 | ShelfCalculator | 1.5 days | Core | Deterministic BOM generation |
| P1 | Chat UI (Vercel AI) | 2 days | Core | Conversational interface |
| P1 | BOM display | 0.5 days | Core | Results presentation |
| P2 | AI instructions | 1 day | Core | Assembly steps |
| P2 | Project save/load | 0.5 days | Core | Persistence |
| P3 | Workbench template | 2 days | Expansion | Next project type |
| P3 | End Table template | 2 days | Expansion | Third project type |
| P4 | PDF export | 1 day | Enhancement | Nice to have |
| P4 | Photo upload | 3 days | Enhancement | Deferred from MVP |

---

## Short-Term Milestones

### Milestone 1: Database Fix (Day 0)
- [ ] Apply schema fix to Supabase
- [ ] Verify User table has all required columns

### Milestone 2: Calculator Complete (Day 1.5)
- [ ] ShelfCalculator implemented with exact formulas
- [ ] Unit tests passing
- [ ] Worked example verified (72x36x12)

### Milestone 3: Chat UI Working (Day 3.5)
- [ ] Vercel AI SDK integrated
- [ ] Streaming responses work
- [ ] Dimension extraction from chat works

### Milestone 4: End-to-End (Day 5)
- [ ] Full user flow: chat → dimensions → BOM → cut list → save
- [ ] MVP testable by internal users

### Milestone 5: MVP Launch (Day 6)
- [ ] Deployed to production
- [ ] Ready for user testing

---

## Long-Term Milestones

### Year 1 Goals
- [ ] 1,000 active users
- [ ] 5 project types supported
- [ ] PDF export shipped
- [ ] Mobile-friendly experience

### Year 2 Goals
- [ ] 10,000 active users
- [ ] Photo upload feature
- [ ] Basic cost estimation
- [ ] Community features (sharing, templates)

### Year 3 Goals
- [ ] Paid tier launched
- [ ] CNC export
- [ ] 3D visualization
- [ ] Supplier integrations

---

## Features Intentionally Deferred

| Feature | Reason | Revisit After |
|---------|--------|---------------|
| Photo upload | Complex; requires S3 + vision API; unreliable for accurate dimensions | Phase 3 |
| Workbench template | Validate bookshelf first | MVP launch |
| End Table template | Validate bookshelf first | MVP launch |
| PDF export | Nice-to-have; not core to validation | Phase 4 |
| Payment/subscription | Don't build before validating | 1,000 users |
| 3D visualization | High effort, low immediate value | Phase 5 |
| CNC export | Niche feature | Phase 5 |
| Mobile app | Responsive web sufficient for now | Phase 4 |

---

## Validation Milestones

Before expanding scope beyond bookshelf, must validate:

1. **User engagement:** Do users complete the conversation flow?
2. **Calculation accuracy:** Are BOM/cut lists correct? (user feedback)
3. **Instruction quality:** Are assembly steps useful?
4. **Return usage:** Do users create multiple projects?
5. **Sharing:** Do users share with others?

### Validation Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Conversation completion rate | > 70% | Track drop-off points |
| BOM accuracy feedback | > 90% positive | Post-generation survey |
| Return users | > 30% | 30-day retention |
| Net Promoter Score | > 40 | In-app prompt |

---

## Decision Criteria for Scope Expansion

**Expand to Workbench/End Table when:**
- [ ] Bookshelf MVP validated (metrics above met)
- [ ] Calculator framework proven reusable
- [ ] User requests for additional types
- [ ] Technical debt under control

**Add photo upload when:**
- [ ] Conversational UI has traction
- [ ] Budget for S3 + vision API
- [ ] Can ensure dimension accuracy

**Launch paid tier when:**
- [ ] 500+ registered users
- [ ] At least 2 project types
- [ ] PDF export shipped
- [ ] Clear value proposition

---

## Changelog Integration

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history.

All roadmap updates should be reflected in CHANGELOG.md with date, version, and rationale.