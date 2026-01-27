# [bldrs] Landing Page Design

## Overview
Teaser landing page for the builder community with a retro, terminal-inspired aesthetic.

## Tech Stack
- **Framework:** Next.js + React
- **Form handling:** Formspree (no backend code)
- **Deployment:** Vercel (recommended)
- **Font:** JetBrains Mono

## Visual Style
- Background: Pure black (`#000000`)
- Primary text: White (`#FFFFFF`)
- Secondary text: Muted gray (`#666666`)
- Status colors:
  - Done: Green (`#00FF00`)
  - In progress: Yellow (`#FFFF00`)
  - To-do: Gray (`#666666`)
- Subtle CRT scan line overlay (CSS-only)
- No borders, cards, or shadows - just text on black

## Assets
- `[bldrs]` wordmark: `/public/logo-wordmark.png`
- `[b]` icon: `/public/logo-icon.png` (favicon)

## Sections

### 1. Hero
- `[bldrs]` wordmark centered (~200px wide)
- Tagline: "community for people who ship."
- Subtitle: "coming soon._" with blinking cursor
- Logo fades in on load (0.5s)
- Cursor blinks every 800ms

### 2. Roadmap
Header: `> roadmap_`

Lines reveal with typing animation (30ms per character), triggered on scroll:
```
✓ build a community of top builders in Poland
→ expose/connect them with leading startups via five.degrees
○ build an angel syndicate for builders, by builders
○ create a space / hacker house for builders to build
```

- "five.degrees" links to https://joinfivedegrees.com/
- Each line starts after previous finishes

### 3. CTA
Header: `> join the waitlist_`

- Email input: monospace, black bg, white border
- Submit button: white border, inverts on hover
- Success state: "✓ you're on the list"
- LinkedIn link below: "connect on linkedin →"
  - Links to https://www.linkedin.com/company/bldrs-pl/

### 4. Footer
- `© 2025 bldrs` in muted gray
- Nothing else

## External Links
- five.degrees: https://joinfivedegrees.com/
- LinkedIn: https://www.linkedin.com/company/bldrs-pl/
- Formspree: (endpoint to be added after signup)
