# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-05-29

### Added
- Project scaffolding (Next.js 14, Prisma, Tailwind CSS)
- Basic landing page with forest green/wood-tone design
- NextAuth.js integration with credentials provider
- Project CRUD API routes
- Dashboard page with project list
- Prisma schema with User and Project models
- Vercel deployment configuration

### Changed
- **Pivoted from Photo-first to Conversational UI:** Decision made that photo analysis is too complex/unreliable for MVP. Conversational input with deterministic calculations provides better user experience and more accurate results.
- **MVP scope narrowed to Bookshelf-only:** Reduced from 3 project types (Bookshelf, Workbench, End Table) to 1 for fastest validation. Additional types can be added after MVP validates.
- **Calculation-first approach:** AI used for conversation and instruction generation; math is deterministic.

### Notes
- Rationale: Photo upload requires S3 storage, vision API integration, and still yields unreliable dimension extraction. Conversational input with exact formulas is more practical for MVP validation.
- Decision to focus on bookshelf validates core UX (chat → dimensions → BOM) without scope creep.

---

## [0.0.1] - 2026-05-26

### Added
- Initial project setup
- Basic SPEC.md documentation

### Notes
- Pre-pivot specification included photo upload and AI analysis as core features.

---

## Future

### [Planned] - Post-MVP
- Workbench project type
- End Table project type  
- PDF export
- Photo upload feature
- Payment/subscription integration

---

## How to Update

For every meaningful change:

1. Add entry at top of list under correct version
2. Include date (YYYY-MM-DD)
3. Categorize: Added, Changed, Deprecated, Removed, Fixed, Security
4. Explain **why** change was made, not just what changed
5. Reference related issues or decisions if applicable

### Example Entry

```markdown
## [0.2.0] - 2026-06-15

### Added
- Workbench template with determinstic calculator

### Changed
- Refactored calculator to use shared base class

### Fixed
- Kerf calculation was off by 0.5mm

### Notes
- Decision to add workbench after bookshelf MVP validated with 50+ users
```

---

## Version History

| Version | Date | Status |
|---------|------|--------|
| 0.1.0 | 2026-05-29 | Current |
| 0.0.1 | 2026-05-26 | Pre-pivot |

---

*This changelog makes it possible for a new developer (or AI) to understand the evolution of the project and the reasoning behind major decisions.*