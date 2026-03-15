# AXION — COMPLETE UI/UX REVAMP MASTER PROMPT
# MetaMask × ChainGPT Labs Design System
# Read every word. Understand it. Then build.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 0 — WHO YOU ARE AND YOUR MISSION

You are rebuilding the entire visual layer of Axion from scratch.
Not improving it. Not patching it. Rebuilding it.

The target: a UI/UX that feels indistinguishable from MetaMask.io and
labs.chaingpt.org when a designer looks at it.

The backend is fully working. You will not touch it.
The only job here is: make this look and feel world-class.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 1 — PROTECTED FILES (NEVER TOUCH)

src/app/api/**
src/services/**
src/store/daoStore.ts
src/store/agentStore.ts
src/store/eventStore.ts
src/app/providers.tsx
supabase/**
src/lib/types.ts
src/lib/constants.ts
src/lib/mockData.ts
src/lib/formatters.ts
src/lib/colors.ts
src/lib/eventTypes.ts

If you accidentally modify any of these, stop and revert with git checkout.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 2 — UNDERSTANDING THE TWO REFERENCE SITES

Before writing a single line, understand WHY these sites look the way they do.
This understanding will guide every decision you make.

### What makes MetaMask.io feel premium?

MetaMask communicates trust through restraint.
It uses very few colors — mostly black and white with ONE accent color per section.
Its typography is massive and bold — headings go up to 7-8rem.
Sections alternate between pure white (#ffffff) and pure black (#0a0a0a).
This alternation creates visual rhythm without needing complex design.

MetaMask's signature micro-interaction: buttons have a text-scroll animation on hover.
The label text slides UP and disappears, while a duplicate label slides UP into view from below.
This feels mechanical, precise, and expensive. It is their identity.

MetaMask uses large border-radius on cards (2.4rem+) giving a soft, approachable feel
despite the bold typography. This is the tension that makes it interesting.

MetaMask never clutters. Each section has one job and one call-to-action.
There are no competing elements. The user always knows what to do next.

### What makes ChainGPT Labs feel futuristic?

ChainGPT creates depth through layered transparency.
Every surface is glass — you can see through it, slightly.
Cards have barely-visible borders (rgba(255,255,255,0.08)) that feel like
thin lines of light rather than solid borders.

ChainGPT uses a dot-grid background texture (small dots, low opacity) that
gives surfaces a technical, blueprint-like quality.

Neon accents are used sparingly but when they appear, they glow.
Not just color — actual box-shadow glow in the accent color.

ChainGPT's sections breathe. Generous padding. Nothing cramped.
The user feels like they're in a control room, not a webpage.

### How Axion combines both

Marketing site (/, /governance, /treasury, etc.):
→ Takes MetaMask's STRUCTURE: section alternation, typography scale, button system
→ Injects ChainGPT's FLAVOR: glow accents on dark sections, glass cards on dark backgrounds
→ Result: Professional and bold when white, futuristic and premium when dark

App interface (/app and all sub-routes):
→ Pure ChainGPT Labs — dark always, glass always, neon accents, dot grid texture
→ No white anywhere inside the app
→ The app feels like a different product from the marketing site, by design
→ This contrast between marketing site and app creates a sense of "entering another world"
   when the user clicks "Launch App" — exactly like clicking "Enter the Universe"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 3 — THE DESIGN TOKENS (MEMORIZE THESE)

These come directly from MetaMask's production CSS. Use these exact values.

### Colors from MetaMask's :root

White family:
  #ffffff — pure white (main marketing bg)
  #f7f9fc — off-white (alternating sections)
  #e9edf6 — light gray (borders on white sections)
  #c8ceda — medium gray (dividers, muted borders)
  #a1a8b7 — gray-mid (placeholder text, eyebrow labels)
  #393d46 — gray-dark (body text on white backgrounds)

Black family:
  #0a0a0a — MetaMask's exact black (dark sections, footer)
  #1b1b1b — black-mid (slightly lighter dark surfaces)
  #242628 — black-light (hover states on dark)

MetaMask accent colors (reused for Axion modules):
  #ff5c16 — MetaMask orange → use for Security module
  #d075ff — MetaMask purple → use for Governance module
  #baf24a — MetaMask green → use for Simulator module
  #89b0ff — MetaMask blue → use for Contributors module

Additional Axion colors:
  #00d4ff — cyan → primary action color, Universe module
  #f59e0b — amber → Treasury module
  #dc2626 — error red (from MetaMask's --error)

App-specific (dark theme):
  #050508 — deepest dark (app background)
  rgba(255,255,255,0.04) — glass surface
  rgba(255,255,255,0.08) — glass border
  rgba(255,255,255,0.18) — glass border on hover

### Typography from MetaMask

MetaMask uses MMEuclidCircularB (proprietary). Our substitute: Inter.
It is the closest public match in proportion and feel.

Font loading: @import Inter from Google Fonts (all weights 400–900)
Also load: JetBrains Mono (for data, addresses, terminal)
Also load: Orbitron (ONLY for the "AXION" wordmark — nowhere else)

MetaMask sets html { font-size: 10px } — this makes 1rem = 10px.
This means their 1.6rem = 16px, 2.4rem = 24px, 4.8rem = 48px.
Follow this exact scale. Do not use Tailwind's rem scale for marketing pages.

Type scale:
  Display (hero H1): clamp(3.2rem, 5.5vw, 7.2rem) — Inter 900, line-height 1.0
  Section heading (H2): clamp(2.4rem, 3.5vw, 4.8rem) — Inter 800, line-height 1.1
  Card heading (H3): 2rem-2.4rem — Inter 700
  Eyebrow: 1.2rem — Inter 700, uppercase, letter-spacing 0.1em
  Body large: clamp(1.6rem, 2vw, 2rem) — Inter 400, line-height 1.65
  Body regular: 1.6rem — Inter 400, line-height 1.65
  Small: 1.4rem — Inter 400
  Micro: 1.2rem — Inter 500 (for badges, labels)

### Animation from MetaMask's production CSS

--motion-speed: 0.55s
--motion-speed-slow: 0.75s
--spring-ease: cubic-bezier(0.4, 1.35, 0.5, 0.97)
— This is MetaMask's signature spring. Slightly overshoots then settles. Use it everywhere.

For Framer Motion scroll animations:
  ease: [0.16, 1, 0.3, 1] (ease-out-expo for content reveals)
  duration: 0.6s standard, 0.8s for hero elements

Clip-path transitions (MetaMask uses these for cut-corner cards):
  transition: clip-path 0.75s cubic-bezier(0.19, 1, 0.22, 1)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 4 — BUILDING THE FOUNDATION FIRST

Do not build any page until these foundation files are complete and correct.
Everything inherits from the foundation. If the foundation is wrong, everything is wrong.

### 4A — globals.css: Complete Replacement

Delete the entire current file. Start with a blank file.

Build it in this exact order:

PART 1 — Font imports
Load Inter (weights 400,500,600,700,800,900), JetBrains Mono (400,500,700), Orbitron (700,900).
Use @import from Google Fonts at the very top.

PART 2 — Tailwind directives
@tailwind base, @tailwind components, @tailwind utilities in that order.

PART 3 — CSS custom properties in :root
All design tokens from Section 3 above.
Also add motion variables:
  --motion: 1
  --motion-speed: 0.55s
  --motion-speed-slow: 0.75s
  --spring-ease: cubic-bezier(0.4, 1.35, 0.5, 0.97)

Also add per-module color vars:
  --color-gov: #d075ff
  --color-treasury: #f59e0b
  --color-security: #ff5c16
  --color-sim: #baf24a
  --color-contrib: #89b0ff
  --color-universe: #00d4ff
  --color-ai: #d075ff

PART 4 — Reduced motion override
@media (prefers-reduced-motion: reduce) { :root { --motion: 0 } }
Then: *, *::before, *::after { animation-duration: calc(var(--motion) * 1ms) !important }
This completely respects accessibility without breaking layout.

PART 5 — Base HTML/body styles
html: font-size 10px, font-family Inter, -webkit-font-smoothing antialiased,
  scroll-behavior smooth, box-sizing border-box
body: font-size 1.6rem, line-height 1.5, color #393d46, background #ffffff
  On /app routes: body background becomes #050508 (handle via a body class)

PART 6 — Universal reset
*: box-sizing border-box, margin 0, padding 0

PART 7 — Custom scrollbar (4px, subtle, both marketing and app)
Track: transparent
Thumb: marketing = #c8ceda, app = rgba(255,255,255,0.15)
Radius: 2px

PART 8 — ::selection styling
Marketing: color #ffffff, background #0a0a0a
App: color #000, background #00d4ff

PART 9 — Reusable layout utilities
.container: max-width 1140px, margin auto, padding 0 2.4rem
.container-wide: max-width 1280px, same
.section-padding: padding 12rem 0 (desktop), 8rem 0 (tablet), 6.4rem 0 (mobile)

PART 10 — Section background utilities
.bg-white: background #ffffff, color #0a0a0a
.bg-dark: background #0a0a0a, color #ffffff
.bg-off: background #f7f9fc, color #0a0a0a
.bg-app: background #050508, color #e2e8f0

PART 11 — Dot grid texture (ChainGPT pattern)
.dot-grid::before:
  content: ''
  position: absolute, inset 0, pointer-events none
  background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)
  background-size: 2.8rem 2.8rem
Apply .dot-grid to dark sections and app backgrounds.

PART 12 — Card system
.card-white: white bg, border 1px solid #e9edf6, border-radius 2.4rem,
  box-shadow 0 2.4rem 3rem 0 rgba(0,0,0,0.1), transition box-shadow 0.25s, transform 0.25s
  hover: box-shadow deepens, translateY(-4px)

.card-glass: background rgba(255,255,255,0.04), border 1px solid rgba(255,255,255,0.08),
  border-radius 1.2rem, backdrop-filter blur(1.6rem), transition all 0.25s
  hover: background rgba(255,255,255,0.07), border-color rgba(255,255,255,0.18)

.card-glass-accent (takes --accent-color CSS variable):
  border-color: rgba(from var(--accent-color) in srgb r g b / 0.25)
  box-shadow: 0 0 2.4rem rgba(from var(--accent-color) in srgb r g b / 0.06) inset

PART 13 — Button system (MetaMask's exact pattern)
This is the most important CSS you will write.

MetaMask buttons use a clip layer technique for their hover effect.
The label text slides vertically on hover — up and out, then a duplicate slides in from below.

.btn: position relative, display inline-flex, align-items center, overflow hidden,
  border-radius 10rem (full pill shape like MetaMask), font-family Inter, font-weight 700,
  font-size 1.6rem, padding 1.2rem 2.4rem, cursor pointer, border none,
  text-decoration none, transition background-color 0.3s var(--spring-ease)

.btn-label: position relative, display block,
  transition: transform 0.55s var(--spring-ease)

.btn-label-hover: position absolute, left 0, top 0, width 100%,
  transform: translateY(210%),
  transition: transform 0.55s var(--spring-ease)

On .btn:hover → .btn-label { transform: translateY(-210%) }
On .btn:hover → .btn-label-hover { transform: translateY(0%) }

.btn-primary: background #0a0a0a, color #ffffff
  hover → background #ffffff, color #0a0a0a (plus the text-scroll)
  Note: MetaMask achieves the bg flip with a ::before pseudo-element that scales in on hover

.btn-secondary: background #ffffff, color #0a0a0a, border 1.5px solid #0a0a0a
  hover → background #0a0a0a, color #ffffff

.btn-outline-white: transparent bg, 1.5px border #ffffff, color #ffffff (for dark sections)
  hover → bg #ffffff, color #0a0a0a

.btn-neon: background #00d4ff, color #000000,
  box-shadow: 0 0 2rem rgba(0,212,255,0.35)
  hover: box-shadow 0 0 4rem rgba(0,212,255,0.55), translateY(-2px)
  This variant does NOT use text-scroll — just glow/lift
  Use this as the primary CTA on dark sections and in the app

.btn-lg: padding 1.6rem 3.2rem, font-size 1.8rem
.btn-sm: padding 0.8rem 1.8rem, font-size 1.4rem

PART 14 — Eyebrow label
.eyebrow: display inline-flex, align-items center, gap 1rem,
  font-size 1.2rem, font-weight 700, letter-spacing 0.1em, text-transform uppercase,
  color #a1a8b7 (on white) or rgba(255,255,255,0.4) (on dark)
  ::before: 2.4rem wide, 1px height, background #00d4ff, content ''

PART 15 — Terminal / code style
.terminal: background #000000, border 1px solid rgba(255,255,255,0.08),
  border-radius 1rem, overflow hidden, font-family JetBrains Mono
.terminal-bar: background rgba(255,255,255,0.04), padding 1rem 1.6rem,
  display flex, align-items center, gap 0.6rem,
  border-bottom 1px solid rgba(255,255,255,0.06)
.terminal-dot: width 1rem, height 1rem, border-radius 50%
.terminal-body: padding 1.6rem 2rem, color #86efac, font-size 1.3rem, line-height 1.6

PART 16 — Skeleton shimmer (MetaMask exact pattern)
@keyframes shimmer: 
  from { background-position: -200% 0 }
  to { background-position: 200% 0 }

.skeleton:
  background: #e9edf6 (light) or rgba(255,255,255,0.06) (dark)
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)
  background-size: 200% 100%
  animation: shimmer 2s linear infinite
  border-radius: 0.4rem

PART 17 — Pulse dot animation
.pulse-dot: width 0.8rem, height 0.8rem, border-radius 50%, background #22c55e
  animation: pulse 2s infinite
@keyframes pulse:
  0%: box-shadow 0 0 0 0 rgba(34,197,94,0.4)
  70%: box-shadow 0 0 0 1rem rgba(34,197,94,0)
  100%: box-shadow 0 0 0 0 rgba(34,197,94,0)

PART 18 — Marquee (partner logos scroll)
.marquee-wrap: overflow hidden
  mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent)
.marquee-track: display flex, gap 4.8rem, width max-content,
  animation: marquee 30s linear infinite
  hover: animation-play-state paused
@keyframes marquee: from { transform: translateX(0) } to { transform: translateX(-50%) }

PART 19 — Gradient text
.gradient-text:
  background: linear-gradient(135deg, #00d4ff 0%, #d075ff 100%)
  -webkit-background-clip: text, -webkit-text-fill-color: transparent
  background-clip: text

PART 20 — Module color accent cards
Each module page needs a top color bar on its cards.
.card-accent (takes --module-color variable):
  position relative
  ::before: content '', absolute, top 0, left 0, right 0, height 0.3rem,
  background: var(--module-color, #00d4ff),
  box-shadow: 0 0 1.2rem var(--module-color, #00d4ff)

### 4B — src/lib/animations.ts: Framer Motion Presets

Create this file. It exports animation variants used across all pages.
Every animated section imports from here — no inline animation definitions.

Variants to export:
  fadeUp: slides up 24px and fades in (most common — use for headings, paragraphs)
  fadeIn: fades in only (use for subtle elements)
  slideFromLeft: slides in from -30px left (use for left-column content)
  slideFromRight: slides in from +30px right (use for right-column visuals)
  scaleUp: scales from 0.92 to 1 with fade (use for cards)
  stagger: container variant that staggers children by 0.08s
  fastStagger: staggers children by 0.05s (for dense grids)

Standard viewport config for all whileInView: { once: true, margin: "-60px" }
This means animations only play once, and start 60px before the element enters viewport.

Hero elements: Do NOT use whileInView. Use animate directly (they animate on page load).
All other sections: use whileInView with the standard viewport config.

### 4C — Remove All Announcement Bars

The announcement bar is deleted permanently.
Remove it from: layout.tsx, MarketingLayoutWrapper.tsx, and delete the component file.
It adds no value and clutters the top of every page.
The floating navbar makes it unnecessary.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 5 — ALL LAYOUT COMPONENTS

### 5A — Navbar (MarketingNav.tsx)

CRITICAL UNDERSTANDING: MetaMask's navbar is full-width sticky.
ChainGPT Labs uses a floating pill.
For Axion: floating pill (ChainGPT) but with MetaMask's internal structure quality.

The floating pill sits 2rem from the top. It is NOT attached to the edge.
As the user scrolls, it becomes more opaque and gains a stronger shadow.
This creates the feeling of "lifting off" the page.

Exact specifications:
  Position: fixed, top 2rem, left 50%, transform translateX(-50%)
  Width: min(calc(100% - 4rem), 1100px)
  Before scrolling: background rgba(10,10,10,0.75), backdrop-filter blur(2.4rem)
    border 1px solid rgba(255,255,255,0.1), box-shadow none
  After scrolling 40px: background rgba(10,10,10,0.96), border-color rgba(255,255,255,0.18)
    box-shadow 0 0.8rem 3rem rgba(0,0,0,0.5)
  Transition on all properties: 0.3s ease
  Border-radius: 10rem (full pill)
  Internal padding: 1rem 2rem

Left section:
  SVG logo mark (the hexagon + inner triangle SVG, use the one already in the codebase)
  "AXION" in Orbitron 700, 1.4rem, white, letter-spacing 0.08em
  These two elements are a single Link pointing to "/"

Center section (hide on mobile < 1024px):
  Links: Platform / Universe / Governance / Treasury / Security / Docs
  Each link: Inter 500, 1.5rem, color rgba(255,255,255,0.65)
  Active page link: color #ffffff, font-weight 600
  Hover on any link: color #ffffff, transition 0.2s ease
  "Platform" has a small ChevronDown icon (1.2rem, rotates on hover)

Platform mega-dropdown:
  Appears when hovering "Platform" or its ChevronDown
  Dark glass panel (.card-glass) positioned below the nav link
  Contains 2×3 grid of all 6 modules
  Each module entry: 1rem colored dot + module name (600 weight) + 1-line description
  Last row spans full width: "Launch Full App →" link with subtle top border
  Animation: appear at y offset 1rem, opacity 0 → full, 0.15s ease-out
  Disappear: same reversed, 0.1s
  Use AnimatePresence from Framer Motion for this
  Keep visible while cursor is anywhere inside it
  Close on click-outside or Escape key

Right section:
  Green pulse-dot + "Live" text in Inter 600, 1.3rem, #22c55e (hide on mobile)
  "Launch App" button: .btn.btn-neon.btn-sm, links to /app

Mobile behavior (< 1024px):
  Center links hidden
  Hamburger button (3 horizontal lines, 2.2rem × 2.2rem) at right
  On click: full-screen overlay fades in
  Overlay: background rgba(10,10,10,0.99), z-index 999
  X button at top-right to close
  Links stacked vertically: font-size 2.4rem, font-weight 700, padding 2rem 0
    Each link has border-bottom 1px solid rgba(255,255,255,0.06)
    Entry animation: slide in from left, staggered 0.05s between links
  "Launch App" button full-width at bottom
  Hamburger animates to X on open (CSS transform on the 3 bars)

### 5B — Footer (MarketingFooter.tsx)

Background: #0a0a0a (MetaMask's exact dark)
Top glowline: border-top 1px solid rgba(255,255,255,0.08)
  Plus: box-shadow 0 -0.1rem 0 rgba(0,212,255,0.25) on the top border itself
  This creates a subtle cyan underline effect at the top of the footer
Padding: 8rem 0 4rem

Four-column grid on desktop (25% each), 2-col on tablet, 1-col on mobile
Gap between columns: 4rem horizontal, 3.2rem vertical

Column 1 — Brand identity:
  Logo mark SVG (small, ~2.4rem) + "AXION" in Orbitron next to it
  Tagline: "Mission Control for Decentralized Organizations"
    Inter 400, 1.5rem, rgba(255,255,255,0.45), margin-top 1.2rem
  Social icons row (margin-top 2.4rem):
    Three icons: X (Twitter), GitHub, Discord
    Each: 4rem × 4rem container, border 1px solid rgba(255,255,255,0.1),
      border-radius 0.8rem, icon 1.8rem, color rgba(255,255,255,0.5)
      hover: border-color rgba(0,212,255,0.4), color #ffffff, transition 0.2s

Columns 2, 3, 4 — Links:
  Column label: .eyebrow style (uppercase, tiny, muted)
  Links below: Inter 400, 1.5rem, rgba(255,255,255,0.55)
    hover: rgba(255,255,255,1), transition 0.15s
    No underline. Clear vertical spacing (1.4rem between links).

Column 2 — PRODUCT: Universe, Governance, Treasury, Contributors, Security, Simulator
Column 3 — RESOURCES: Docs, API Reference, GitHub, Changelog
Column 4 — COMPANY: About, Blog, Contact, Privacy Policy

Bottom bar:
  border-top 1px solid rgba(255,255,255,0.06), margin-top 4rem, padding-top 2.4rem
  Left: "© 2025 Axion · MIT License" in Inter 400, 1.3rem, rgba(255,255,255,0.25)
  Right: "Powered by Ethereum · Alchemy · Gemini AI · Supabase" same style
  On mobile: centered, stacked

### 5C — App Sidebar (src/components/ui/Sidebar.tsx)

The app sidebar is the command center's primary navigation.
It must feel like a cockpit instrument panel — dark, precise, purposeful.

Width states: expanded 22rem, collapsed 6.4rem
Transition between states: 0.3s var(--spring-ease)
Background: rgba(5,5,8,0.92)
Border-right: 1px solid rgba(255,255,255,0.06)
Backdrop-filter: blur(2rem)
Position: fixed left, z-index above canvas, full height

Logo section (top):
  When expanded: logo mark + "AXION" text (Inter 700, white) + "v1.0" badge (tiny, muted)
  When collapsed: only logo mark, centered
  Subtle border-bottom below this area

Navigation items:
  Six module links, each 4.8rem tall
  Layout: icon left, label right (label hidden when collapsed)
  Icon: 2rem × 2rem, module color
  Label: Inter 500, 1.5rem, rgba(255,255,255,0.7)
  Default state: no background
  Hover state: background rgba(255,255,255,0.04)
  Active state: background rgba(module-color,0.1), 
    left border 3px solid module-color (this is the key indicator),
    label color = module color, icon color = module color
  Tooltip: when collapsed, show module name in a tooltip on hover
    Tooltip: .card-glass, appears at right of icon, small, quick fade-in

Bottom section:
  Collapse/expand toggle: icon that's a chevron pointing left (rotates when collapsed)
  "CONNECT" wallet button: full width when expanded, icon-only when collapsed
    Style: border 1px solid rgba(0,212,255,0.3), text color #00d4ff,
    background rgba(0,212,255,0.05), hover background rgba(0,212,255,0.12)
  Settings icon link
  
Camera navigation behavior:
  Each sidebar item click fires two things simultaneously:
  1. router.push('/app/[module]')
  2. Dispatch to uiStore: set cameraTarget = module's 3D coordinates
  The UniverseCanvas reads cameraTarget and lerps toward it over 1.2s
  This creates the "flying to the module" effect that makes the app feel cinematic

### 5D — App Status Bar (src/components/ui/StatusBar.tsx)

Height: 4rem
Position: fixed top, full width (accounting for sidebar width), z-index 30
Background: rgba(5,5,8,0.92), backdrop-filter blur(1.2rem)
Border-bottom: 1px solid rgba(255,255,255,0.05)

Left section (4rem from left edge):
  "UNISWAP DAO" in Orbitron, 1.1rem, white, letter-spacing 0.05em
  "ETH" badge: tiny pill, background rgba(89,137,255,0.15), 
    border rgba(89,137,255,0.3), text #89b0ff, Orbitron 0.9rem
  Health score number: Inter 700, module color, with a dot before it
  
Center section (overflow hidden, scrollable marquee):
  Live event feed from eventStore
  Format: [dot in module color] "+ [EVENT TYPE]" spaced apart
  Each event: JetBrains Mono, 1.2rem, rgba(255,255,255,0.4)
  New events slide in from right as they appear
  
Right section (2.4rem from right edge):
  Block number: "BLOCK 21,847,332" — JetBrains Mono 1.1rem, rgba(255,255,255,0.3)
  UTC Clock: updates every second via setInterval, same font
  Connected wallet: truncated address or "Not Connected"

### 5E — App Loading Screen (src/components/ui/LoadingScreen.tsx)

Full viewport, position fixed, z-index 9999, background #050508
Centered content vertically and horizontally

Logo animation:
  Three concentric SVG circles
  Each ring: stroke in different module color, stroke-width 1px, fill none
  Innermost: 4rem radius, cyan, animates 3s
  Middle: 6rem radius, purple, animates 4s (opposite direction)
  Outermost: 8rem radius, cyan at 30% opacity, animates 6s
  All three: strokeDasharray and strokeDashoffset animated for a "drawing" feel

"AXION" text: Orbitron 900, 3.2rem, #ffffff, letter-spacing 0.3em, below animation
"INITIALIZING SYSTEMS": Orbitron 700, 1.2rem, rgba(0,212,255,0.6), letter-spacing 0.4em

Four progress steps (show sequentially with delays):
  Each step: flex row, gap 1rem, align center
  Icon: initially just a dot, becomes a checkmark (✓) in module color when complete
  Text: JetBrains Mono, 1.3rem, module color
  
  Step 1 (0.8s): "CONNECTING TO ETHEREUM..." → cyan
  Step 2 (1.4s): "LOADING DAO DATA..." → purple
  Step 3 (2.0s): "INITIALIZING AI AGENTS..." → amber
  Step 4 (2.8s): "RENDERING UNIVERSE..." → green

Progress bar below steps:
  4px height, background rgba(255,255,255,0.06), border-radius 2px, overflow hidden
  Fill bar: background linear-gradient(90deg, #00d4ff, #d075ff)
  Animates width from 0% to 100% over 3.2s with ease-out timing
  
After 3.6s: call onComplete() which fades out this component and reveals the universe

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 6 — ALL INPUT & FORM COMPONENTS

Create all inputs as reusable components in src/components/ui/forms/

There are two visual variants of every input component:
  "light" variant: for use on white/off-white sections of marketing pages
  "dark" variant: for use in the app interface and dark sections

### Text Input, Email Field, Password Field

Light variant:
  Background: #ffffff
  Border: 1.5px solid #c8ceda (MetaMask's --mm-gray)
  Border-radius: 0.8rem
  Padding: 1.2rem 1.6rem
  Font: Inter 400, 1.6rem, color #0a0a0a
  Placeholder: #a1a8b7
  Focus: border-color #0a0a0a, outline 0.3rem solid rgba(10,10,10,0.1) outside border
  Error: border-color #dc2626, outline rgba(220,38,38,0.15)
  Disabled: background #f7f9fc, color #a1a8b7, cursor not-allowed

Dark variant:
  Background: rgba(255,255,255,0.05)
  Border: 1px solid rgba(255,255,255,0.1)
  Color: #ffffff, placeholder rgba(255,255,255,0.3)
  Font: JetBrains Mono for data inputs, Inter for text inputs
  Focus: border-color rgba(0,212,255,0.45), box-shadow 0 0 0 0.3rem rgba(0,212,255,0.12)
  Error: border-color #dc2626, box-shadow rgba(220,38,38,0.15)

Password field specifically:
  Right side: eye icon toggle (show/hide), 1.8rem, color #a1a8b7, hover #0a0a0a / #ffffff
  Icon uses Lucide Eye and EyeOff icons

Label above every input:
  Inter 600, 1.4rem, #393d46 (light) or rgba(255,255,255,0.7) (dark)
  Margin-bottom 0.6rem
  Required indicator: small asterisk in module accent color

Error message below input:
  Inter 400, 1.3rem, #dc2626
  Lucide AlertCircle icon (1.4rem) inline before text
  Appears with a subtle slide-down animation

### Textarea

Same styles as text input but:
  Min-height: 12rem
  Resize: vertical only
  Line-height: 1.65 (important for readability)

### Search Bar

Icon: Lucide Search (1.8rem), positioned inside left padding, color #a1a8b7
Input padding-left accounts for icon (4.4rem)
Clear button (Lucide X, 1.6rem): appears on right when input has content
  Clicking X: clears input, smooth fade-out of X button
On focus: slight scale transform 1.0 → 1.01, transition 0.15s
For app search: dark variant, cyan focus glow

### Dropdown / Select

Do not use the browser default select appearance.
Build a custom component.

Trigger element: same visual as text input, cursor pointer
Right side: ChevronDown icon, rotates 180° when open
Dropdown panel: 
  Light: white bg, border 1px solid #e9edf6, border-radius 1rem, shadow medium
  Dark: .card-glass, border rgba(255,255,255,0.12)
  Opens with: opacity 0→1, translateY -4px→0, 0.15s ease-out
  Closes with: same reversed
Option items:
  Padding: 1rem 1.6rem
  Hover: background #f7f9fc (light) or rgba(255,255,255,0.06) (dark)
  Selected: check icon on right, color in module accent
  Font: Inter 400, 1.5rem
Max-height: 24rem with overflow-y scroll
Scrollbar: styled to match global scrollbar

### Checkbox

Visual: 1.8rem × 1.8rem box
Default: border 1.5px solid #c8ceda (light) or rgba(255,255,255,0.2) (dark), border-radius 0.4rem
Checked: background #0a0a0a (light) or module accent (dark), border same color
  Checkmark: white SVG path, appears with scale 0→1 animation, 0.15s spring ease
Hover: border darkens
Focus: outline ring same as text input

### Radio Button

Visual: 1.8rem × 1.8rem circle
Default: border 1.5px solid #c8ceda, no fill
Checked: outer ring in accent color, inner dot 0.8rem in accent color
  Inner dot appears with scale 0→1, 0.15s spring ease
Group: always use fieldset + legend for accessibility

### Toggle Switch

Track: 4rem × 2.2rem, border-radius 1.1rem
OFF state: background #e9edf6 (light) or rgba(255,255,255,0.12) (dark)
ON state: background #00d4ff (app) or #0a0a0a (marketing)
Thumb: white circle, 1.8rem, box-shadow 0 0.1rem 0.4rem rgba(0,0,0,0.3)
  When OFF: translateX(0.2rem)
  When ON: translateX(1.9rem)
  Transition: 0.25s var(--spring-ease) — the spring makes it feel satisfying

### Range Slider

Track: 0.4rem height, border-radius 0.2rem, overflow hidden
  Filled portion (left of thumb): module accent color
  Unfilled portion (right of thumb): #e9edf6 (light) or rgba(255,255,255,0.1) (dark)
Thumb: 2rem circle, white background, border 2px solid current accent
  box-shadow: 0 0 1rem rgba(accent-color, 0.4), 0 0.2rem 0.4rem rgba(0,0,0,0.2)
  On drag: scale 1.2, box-shadow intensifies

### File Upload

Dashed border zone: dashed 1.5px border, #c8ceda or rgba(255,255,255,0.15)
Border-radius: 1.2rem
Padding: 3.2rem 2.4rem, centered content
Icon: Lucide Upload (2.4rem, muted color)
Text: "Drag files here or click to browse"
  Sub-text: "Supported formats: ..." in smaller muted text
Hover / drag-over: border color becomes accent color, background tints slightly
Active drag: scale 1.01, background tint stronger

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 7 — ALL ACTION COMPONENTS

### Button System (Full Specification)

Already described in Section 4A globals.css.
Create a reusable <Button> component in src/components/ui/Button.tsx

Props: variant (primary|secondary|outline|ghost|neon), size (sm|md|lg), 
  icon (optional Lucide icon), iconPosition (left|right), loading (boolean),
  disabled (boolean), href (for Link behavior), onClick

Loading state: Replace label with animated dots or Loader2 spinning icon
Disabled state: opacity 0.4, cursor not-allowed, pointer-events none
When href provided: render as Next.js Link, otherwise as <button>

The text-scroll hover animation is implemented inside the Button component.
It renders two spans (label and label-hover) and CSS handles the animation.

### Floating Action Button (FAB)

In the app, the AI command bar trigger is a FAB.
Position: fixed, bottom 2.4rem, right 2.4rem, z-index 40
Size: 5.6rem × 5.6rem, circular
Background: #00d4ff, color #000000
Icon: Bot or Sparkles from Lucide, 2.4rem
box-shadow: 0 0.4rem 2rem rgba(0,212,255,0.5)
hover: scale 1.08, box-shadow intensifies, transition 0.2s spring ease
Tooltip on hover: "AI Command (Ctrl+K)" in .card-glass popup above button
When pressed: scale 0.95 momentarily (tactile feedback)

### Copy to Clipboard Button

Small inline button: usually appears next to code blocks, addresses, API keys
Icon: Lucide Copy (1.6rem)
Default: color #a1a8b7
On click: 
  1. Copy to clipboard
  2. Icon switches to Check (Lucide Check, green) for 1.5s
  3. Subtle success toast appears
  4. Then reverts to Copy icon
The Check animation: scale 0→1.2→1, 0.2s spring ease

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 8 — ALL FEEDBACK & STATUS COMPONENTS

### Toast Notification System

Build a lightweight toast system. No external library.
Use React context + useReducer to manage toast state at app level.
Expose a useToast() hook that any component can call.

Toast container: position fixed, top 2rem, right 2rem, z-index 9000
  Display: flex column, gap 1rem, pointer-events none
  Each toast: pointer-events auto

Toast enter animation: x 100% → x 0%, opacity 0 → 1, 0.3s spring ease
Toast exit animation: x 0% → 100%, opacity 1 → 0, 0.2s ease-in
Auto-dismiss: 4 seconds. Can be overridden per toast.
Max visible: 5 toasts. If more come in, oldest gets dismissed first.

Toast structure:
  Outer: .card-glass on app / .card-white on marketing
  Left: 4px solid border in variant color
  Left icon area: colored circle background + Lucide icon
  Content: title (Inter 600, 1.5rem) + optional message (Inter 400, 1.4rem, muted)
  Right: X button (dismiss), optional "Undo" action button
  
Four variants: success (green #baf24a), error (#dc2626), warning (#ff5c16), info (#00d4ff)

### Loading Spinner

Full-page variant:
  Three rings as described in LoadingScreen section
  Overlay: background rgba(5,5,8,0.8), backdrop-filter blur(0.8rem)
  Use when a page is doing a blocking operation

Inline variant (inside buttons, after content):
  Single ring: 1.6rem or 2rem, current color, 1px border, top portion colored, rest transparent
  animation: spin 1s linear infinite
  Use Lucide Loader2 for this — it has the right shape

Skeleton variant: already defined in globals.css

### Progress Bar (Linear)

For data loading, file uploads, simulator progress
Track: 0.4rem height (can be 0.8rem for prominent progress)
Border-radius: 10rem (pill)
Fill: animated with CSS transition on width
  For determinate: width = percentage%
  For indeterminate: animated shimmer running across the full track

Label: optional percentage text, appears above-right

### Alert / Warning Banner

Full-width banners (not floating toasts).
Used for: system-wide notices, error states on page-level, important warnings.

Structure: flex row, aligned center, padding 1.2rem 2.4rem
Left: Lucide icon (AlertTriangle, Info, CheckCircle, XCircle)
Center: text content
Right: optional dismiss X button

Variants: warning (amber bg tint + amber left-border), 
  error (red), success (green), info (cyan)
On dark sections: use dark glass variant with colored border
On light sections: use light variant with subtle color tint background

### Confirmation Dialog (Modal)

When user attempts a destructive action.
Backdrop: rgba(0,0,0,0.7), backdrop-filter blur(0.4rem)
Modal panel: .card-glass (app) or .card-white (marketing)
  Width: 44rem max, centered
  Padding: 2.4rem–3.2rem
  Border-radius: 1.6rem

Header: icon + heading
Body: description text (make this specific to the action, not generic)
Footer: two buttons (confirm + cancel)
  Confirm: .btn-primary for normal, or a red-variant button for destructive actions
  Cancel: .btn-ghost

Enter animation: scale 0.92 → 1, opacity 0 → 1, 0.2s spring ease
Exit: reversed, 0.15s

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 9 — ALL DISPLAY COMPONENTS

### Cards

Three types already defined in globals.css:
  .card-white (marketing, light sections)
  .card-glass (app and dark sections)
  .card-glass-accent (has a colored glow matching a module)

Beyond base styles:
  Feature card: has an icon area at top, then heading, then body, then link/CTA
  Stat card: large number top, label below, optional trend indicator
  Profile/contributor card: avatar area, name, role/class badge, stats
  Event card: timestamp, event type badge, description

### Tables / Data Tables

Light variant (marketing /docs, /about):
  Table: width 100%, border-collapse collapse
  Header row: background #f7f9fc, border-bottom 2px solid #e9edf6
    Font: Inter 600, 1.3rem, uppercase, letter-spacing 0.05em, color #a1a8b7
  Body rows: border-bottom 1px solid #e9edf6
    Font: Inter 400, 1.5rem, color #393d46
    Hover: background #f7f9fc
  Padding per cell: 1.2rem 1.6rem

Dark variant (app module pages):
  Header: background rgba(255,255,255,0.04), color rgba(255,255,255,0.5)
    Font: JetBrains Mono for data columns, Inter for label columns
  Body rows: border-bottom 1px solid rgba(255,255,255,0.04)
    Hover: background rgba(255,255,255,0.03)
  Highlighted rows (anomalies, critical): left-border 3px solid #dc2626

Sortable columns:
  Sort icon: ChevronUp/Down from Lucide, appears on hover of sortable columns
  When sorted: icon solidly visible, column header slightly highlighted

### Badges / Labels / Chips

Badges (status indicators):
  Small pill: border-radius 10rem, padding 0.2rem 0.8rem
  Font: Inter 700, 1.1rem, uppercase, letter-spacing 0.06em
  
  Variants by status:
    ACTIVE: background rgba(186,242,74,0.15), color #baf24a, border rgba(186,242,74,0.3)
    PASSED: same but green tones
    DEFEATED: red tones (#dc2626)
    PENDING: amber tones (#f59e0b)
    CRITICAL: red with stronger glow
  
  Module badges:
    WHALE: amber background, uppercase, Orbitron for extra weight
    ARCHITECT / DIPLOMAT / SENTINEL: per-class colors

Tags / Chips (interactive filters):
  Larger than badges, padding 0.6rem 1.4rem, border-radius 10rem
  Default: background #f7f9fc (light) or rgba(255,255,255,0.06) (dark)
    border 1px solid #e9edf6 or rgba(255,255,255,0.1)
  Active: background #0a0a0a, color #ffffff (light)
    or background rgba(0,212,255,0.12), border rgba(0,212,255,0.4), color #00d4ff (dark)
  Hover: transition to active styles
  Optional: X icon on right to remove the tag

### Tooltips

Trigger: any element can have a tooltip via title attribute or a wrapper component
Delay: appear after 300ms hover, disappear immediately on mouse-leave
Position: above the element by default, auto-flip if near edge

Visual: .card-glass (small), max-width 20rem, padding 0.6rem 1rem
Font: Inter 400, 1.3rem, rgba(255,255,255,0.85)
Animation: opacity 0→1, translateY 0.4rem→0, 0.15s ease-out
Arrow: small triangle pointing at trigger element

Do NOT use the browser title= attribute for custom tooltips — build a component.

### Accordions

Used in /docs FAQ section
Trigger row: flex, justify-between, align-center, cursor pointer
  Padding: 2rem 0
  Border-bottom: 1px solid #e9edf6 (light) or rgba(255,255,255,0.06) (dark)
  Right: ChevronDown icon, rotates 180° when open, 0.3s spring ease

Content panel: height 0 → auto (use CSS grid trick for smooth animation)
  grid-template-rows: 0fr → 1fr transition, 0.3s ease
  Inner div: overflow hidden, padding-bottom 2rem when open
  Font: Inter 400, 1.5rem, line-height 1.7

Only one accordion can be open at a time (controlled component) — or allow multiple, your choice.
Include visual indicator on open item: left border 3px solid #00d4ff

### Avatars

For contributor profiles
Sizes: sm (3.2rem), md (4.8rem), lg (6.4rem)
Shape: circular
Default (no image): initials from name, background in hash-based color from address
With image: rounded-full image
Badge overlay (optional): small module-class badge at bottom-right

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 10 — NAVIGATION & INTERACTION COMPONENTS

### Tabs

Two visual styles:
  Underline tabs (marketing pages):
    Tab list: flex row, border-bottom 1px solid #e9edf6
    Each tab: padding 1.2rem 2rem, Inter 500, 1.5rem
    Active: border-bottom 2px solid #0a0a0a, font-weight 600, margin-bottom -1px
    Inactive: color #a1a8b7, hover color #0a0a0a
  
  Pill tabs (app interface):
    Container: background rgba(255,255,255,0.04), border-radius 10rem, padding 0.4rem
    Each tab: padding 0.8rem 1.8rem, border-radius 10rem, Inter 500, 1.5rem
    Active: background rgba(0,212,255,0.15), color #00d4ff
    Inactive: color rgba(255,255,255,0.5), hover rgba(255,255,255,0.8)
    Active indicator animates: uses Framer Motion layoutId for smooth tab switching

### Modal / Popup Window

Dark overlay backdrop (always, even on marketing pages)
Panel sizes: sm (36rem), md (52rem), lg (72rem), full-screen
Centered vertically and horizontally
.card-glass for app, .card-white for marketing
Padding: 2.4rem–4rem

Header: title (Inter 700, 2rem) + optional subtitle + X close button (top-right)
Body: scrollable if content overflows
Footer: action buttons (right-aligned for desktop, stacked for mobile)

Open animation: backdrop fades in + panel scales from 0.94 to 1 + fades in
Close: reversed, 0.15s faster

Close on: X button, backdrop click (optional), Escape key

### Drawer / Slide Panel

Used in the app for: contributor profiles, proposal details, threat details
Opens from the right side (or bottom on mobile)

Width: 38rem on desktop, 100% on mobile
Background: rgba(5,5,8,0.97), backdrop-filter blur(2.4rem)
Border-left: 1px solid rgba(255,255,255,0.08)

Enter: translateX(100%) → translateX(0), 0.35s spring ease
Exit: translateX(0) → translateX(100%), 0.25s ease-in
Backdrop: appears behind panel, click to close

Header inside drawer: title + close button (X icon, top-right)
Content: scrollable, standard app panel spacing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 11 — DATA VISUALIZATION COMPONENTS

### Philosophy for Charts in Axion

Charts should feel like mission-critical data displays, not PowerPoint slides.
Use recharts (already in package.json).
Dark theme for all app charts.
Minimal chrome — no unnecessary gridlines, borders, or decorations.

### KPI / Metric Cards

The most common data display in the app.
Structure:
  Top: .eyebrow label (TOTAL VALUE, HEALTH SCORE, etc.)
  Middle: JetBrains Mono, large number (clamp 2rem–3.2rem), bold, module color
  Bottom: change indicator (optional) — △/▽ arrow + percentage + "from yesterday"
  Change colors: positive = #baf24a, negative = #dc2626, neutral = rgba(255,255,255,0.4)
  Card: .card-glass, padding 2rem

Numbers in KPI cards should have count-up animation on first render.
Use Intersection Observer, not a library. Simple requestAnimationFrame loop.

### Vote Distribution Bar (Governance)

Two-bar layout: FOR (green) and AGAINST (red) side by side
Width of each bar = percentage of total votes
Both bars same height (0.6rem), rounded, contained in a track

Above: FOR | percentage% | vote count (left) ——— vote count | percentage% | AGAINST (right)
Font: JetBrains Mono for numbers, Inter for labels

Animation: bars grow from 0% width to final value on first render, 1s ease-out

### Token Allocation (Treasury)

Horizontal bars for each token, sorted by % allocation
Each bar: full container width track, fill = percentage width
Color: each token gets a distinct color from a predefined palette
  ETH: #89b0ff, UNI: #ff007a, USDC: #2775ca, DAI: #f5a623, etc.

Layout per row:
  [dot][TOKEN SYMBOL] [percentage%] ————[fill bar]———— [$X.XM]
  All in one row, JetBrains Mono for numbers

### Timeline Graph (for Simulator)

Three columns (one per timeline).
Each column: a vertical line with event nodes on it.
Probability badge at top of each column (large, in timeline color).
Events: circular nodes on the line, with description text to the right.
Line and nodes draw themselves on first render (strokeDashoffset animation).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 12 — THE 3D UNIVERSE (UniverseCanvas.tsx)

This is the crown jewel of the app. It must feel like NASA Eyes on Earth.

Understanding: The current 3D canvas shows colored spheres floating in space.
That is not good enough. The user needs to feel like they're looking at a 
real-time system — an interconnected web of intelligence.

### What to Build

Earth globe at center:
  Not photo-realistic. Dark, technical, like a blueprint sphere.
  Base sphere: dark navy (#0d1928), smooth
  Wireframe overlay: very faint cyan lines (opacity 0.08), showing lat/long grid
  Atmosphere: slightly larger sphere, cyan tint, renders from inside (BackSide)
  This triple-layer gives depth without complexity
  Rotates slowly and constantly (y-axis, +0.0015 per frame)

Module nodes as orbiting satellites:
  Six spheres at specific 3D coordinates (spread far apart — see coordinates below)
  Each has its module color with emissive glow
  A PointLight at each node's position (soft, colored, distance-limited)
  Each node slowly pulses in size using sin wave in useFrame
  Coordinates: Governance [-5,3,0], Treasury [5,2,0], Contributors [0,-4,2],
    Security [1,4.5,3], Simulator [-4,-2,3], AI/Home [3,-3,-3]

Connection lines from Earth to each node:
  Simple THREE.Line from [0,0,0] to node position
  Each line: module color, low opacity (0.2), transparent blending
  
Traveling data particles:
  Small sphere (radius 0.04) per node, travels the line back and forth
  Position oscillates using sin(time + offset): t = (sin(elapsed*0.5+nodeOffset)+1)/2
  position.lerpVectors(earthCenter, nodePosition, t)
  Each particle different color and speed — makes it look like data flowing

Labels on nodes:
  @react-three/drei Text component, positioned below each node
  JetBrains Mono, very small (0.12 units), module color

Stars field:
  @react-three/drei Stars component, count 3000

Interaction (this is what makes it feel like NASA):
  mousemove → raycaster updates → find intersected node
  Hovered node: scale increases (1→1.6), PointLight intensity triples
  DOM overlay tooltip: absolute positioned div, shows module name + "Click to open"
    .card-glass style, appears at cursor position
    Framer Motion: opacity 0→1, y 4px→0, 0.1s
  Click on node: router.push(/app/[module]) + update cameraTarget in uiStore
  Camera lerp: in useFrame, if cameraTarget set, lerp camera.position toward target over 1.2s

OrbitControls:
  autoRotate: true, autoRotateSpeed: 0.25 (slow, ambient rotation)
  enableDamping: true, dampingFactor: 0.05 (smooth inertia)
  enablePan: false (don't allow panning — only rotate and zoom)
  minDistance: 8, maxDistance: 30

Lighting:
  AmbientLight very dim (0.1 intensity) — just enough to see dark surfaces
  PointLight from upper-front: cyan, 0.5 intensity
  PointLight from lower-back: purple, 0.3 intensity
  This creates the dramatic sci-fi lighting feel

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 13 — ALL MARKETING PAGES

Each page follows MetaMask's section-alternation principle:
Dark section → Light section → Dark/Off-white section → Dark/Off-white section → etc.
Every transition between section colors creates visual rhythm.

### Common Rules for All Marketing Pages

Never put two same-colored sections next to each other.
Every section has exactly ONE primary CTA. Never two competing buttons.
Every section starts with an .eyebrow label.
Every hero section on module pages shows a live data preview from that module's API.
Loading state for data preview: use .skeleton class, same dimensions as the data

Framer Motion rules:
  Each section's heading: fadeUp variant, whileInView
  Each card in a grid: scaleUp variant, wrapped in stagger container, whileInView
  Left-column content: slideFromLeft, Right-column content: slideFromRight

### Home Page (src/app/page.tsx) — Section Sequence

1. HERO — bg-dark: Sphere visual + headline + subtitle + 2 CTAs + module pills
2. STATS BAR — bg-off: 4 animated count-up stats
3. INTRO — bg-dark: Large centered "What is Axion" explanation
4. MODULES GRID — bg-white: 6 feature cards (3×2 grid)
5. HOW IT WORKS — bg-off: 3 numbered steps with connecting dashed line
6. UNIVERSE PREVIEW — bg-dark: Node network animation left, text+CTA right
7. AI AGENTS — bg-white: 4 agent cards + live AI demo terminal below
8. PARTNERS MARQUEE — bg-off: Scrolling logo row
9. FINAL CTA — bg-dark: Large centered CTA with glow effect

### /platform
1. Hero (dark): "A Complete Intelligence Layer" 
2. Architecture diagram (light): SVG showing 5 system layers
3. Module overview (dark): 6 cards
4. Tech stack (off-white): 4 tech cards
5. CTA (dark)

### /universe — THE conversion page
1. Hero (dark, full viewport): Massive heading, node network fills entire background
2. What you'll see (light): 4 feature cards
3. Navigation guide (dark): How to use the 3D universe
4. CTA (light): Push to enter

### /governance, /treasury, /contributors, /security, /simulator
Each follows:
1. Hero (dark): Module name + tagline + animated CSS visualization unique to that module
2. Features (light): 3-4 feature cards
3. AI Agent (dark): Mini terminal demo with example queries
4. Live Data Preview (off-white): REAL data from API, with skeleton while loading
5. CTA (dark): "Open in Axion →"

For CSS visualizations per module (no Three.js on marketing pages):
  Governance: Animated proposal cards with vote bars filling up
  Treasury: Pulsing reactor core with flowing dots on lines (svg + css)
  Contributors: Twinkling star constellation (dots at different positions, connected lines)
  Security: Rotating radar sweep (CSS conic-gradient animation)
  Simulator: Branching timeline tree (SVG lines drawing themselves)

### /ai-agents
1. Hero (dark): "Four AI Agents. Total Intelligence."
2. Detailed agent cards (light): expanded version, show capabilities
3. LIVE DEMO (dark): full terminal, working AI chat (connected to /api/ai)
4. How agents work (off-white): 3-step explanation
5. CTA (dark)

### /docs
Two-column sticky layout:
  Left: sticky sidebar with search + navigation tree (dark glass panel)
  Right: scrollable content
  Both responsive (sidebar becomes top menu on mobile)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 14 — COMMON MISTAKES TO AVOID

Doubt: "The module cards look different sizes because text lengths vary."
Fix: Use CSS grid with equal-height rows. All cards in a row must be same height.
  Use align-items: stretch on the grid, and flex-direction: column inside cards.
  Put the description above the CTA link, then push the link to the bottom with margin-top auto.

Doubt: "The navbar covers my hero content."
Fix: Add padding-top to the hero section equal to navbar height + top offset + buffer.
  navbar is fixed top 2rem, height ~6rem, so padding-top on hero: minimum 10rem.

Doubt: "Glass cards are invisible or not see-through because the bg is also dark."
Fix: Glass effect only shows depth when there's content behind it (the canvas, the dot-grid texture).
  Ensure the canvas or a background element is BEHIND the glass cards.
  If you put glass cards on a flat dark background with nothing behind them, they just look like dark cards.

Doubt: "The MetaMask button text-scroll animation doesn't work."
Fix: The button needs overflow: hidden and two spans. The outer button clips the spans.
  If you see both labels at once, overflow hidden is missing.
  If the animation is too fast, increase the transition duration.
  If it jumps instead of slides, check that you're using transform not top/position for the movement.

Doubt: "Three.js canvas is showing a white flash before loading."
Fix: Set the canvas background color directly in the Canvas component: gl={{ clearColor: '#050508' }}.
  Also set the CSS background of the canvas container to #050508.

Doubt: "AI chat is not streaming — it waits for the full response."
Fix: Read the response body as a ReadableStream.
  Do NOT use response.json() or response.text() for streaming.
  Use: const reader = response.body?.getReader()
  Then loop: const { done, value } = await reader.read() and decode each chunk.
  Update the message state with each chunk to get real-time streaming appearance.

Doubt: "Framer Motion animations are firing on page load, not on scroll."
Fix: Use whileInView with viewport={{ once: true, margin: '-60px' }}.
  Do NOT use animate on elements you want to trigger on scroll.
  For the hero only, use animate (not whileInView) since it should fire on load.

Doubt: "The 3D nodes are all clustered in the center."
Fix: Their coordinates must be spread further apart. Use the exact coordinates in Section 12.
  If they still look close, scale up by changing camera position to be further out (z: 20+).

Doubt: "Text is too small/large on mobile."
Fix: Use clamp() for all marketing headings. The first value is minimum, last is maximum.
  Test at 375px width in browser devtools.
  If still wrong, add specific media query overrides.

Doubt: "The page takes too long to feel interactive."
Fix: The Three.js canvas should use dynamic import with { ssr: false } — always.
  Marketing page CSS animations should be pure CSS (not JS) wherever possible.
  Framer Motion should only be used for scroll-triggered reveals, not for continuous idle animations.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 15 — EXECUTION ORDER

Follow this order exactly. Build Phase 1 completely before starting Phase 2.

PHASE 1 — FOUNDATION (everything depends on this)
  Step 1: Delete current globals.css, write new one from scratch (Section 4A)
  Step 2: Create src/lib/animations.ts (Section 4B)
  Step 3: Remove announcement bar everywhere (Section 4C)
  Step 4: Rebuild MarketingNav.tsx (Section 5A)
  Step 5: Rebuild MarketingFooter.tsx (Section 5B)
  Step 6: Update root layout.tsx (remove announcement bar, add body class logic)
  Step 7: Create Button.tsx component (reusable, all variants)
  Step 8: Replace all emoji with Lucide icons across entire codebase
  VERIFY: npx tsc --noEmit → 0 errors. npm run build → succeeds.
  VERIFY: Open localhost:3001 → navbar floats correctly, no announcement bar visible.

PHASE 2 — HOME PAGE
  Step 9: Complete rewrite of src/app/page.tsx (all 9 sections from Section 13)
  VERIFY: All 9 sections visible, animations work, AI chat works.
  VERIFY: Mobile at 375px — everything stacks correctly, nothing overflows.
  VERIFY: npm run build → 0 errors.

PHASE 3 — REMAINING MARKETING PAGES
  Step 10: /platform
  Step 11: /universe
  Step 12: /governance (with live data from /api/blockchain/proposals)
  Step 13: /treasury (with live data from /api/blockchain/treasury)
  Step 14: /contributors (with live data from /api/blockchain/contributors)
  Step 15: /security (with live data from /api/security)
  Step 16: /simulator
  Step 17: /ai-agents (with working AI chat)
  Step 18: /docs
  Step 19: /about
  For each: verify 200 response, data loads, mobile responsive.

PHASE 4 — APP SHELL
  Step 20: Create/update src/components/ui/LoadingScreen.tsx
  Step 21: Rebuild src/components/ui/Sidebar.tsx
  Step 22: Rebuild src/components/ui/StatusBar.tsx
  Step 23: Update src/app/app/layout.tsx (orchestrate loading → canvas → shell)
  VERIFY: Navigate to /app → loading screen plays → universe appears → sidebar works.

PHASE 5 — 3D UNIVERSE
  Step 24: Complete rebuild of UniverseCanvas.tsx (Section 12)
  VERIFY: Earth visible. 6 nodes visible and spread apart. Connection lines present.
  VERIFY: Hover on a node → tooltip appears. Click → navigates to module.
  VERIFY: autoRotate working. OrbitControls allow zoom and orbit.

PHASE 6 — APP MODULE PAGES
  Step 25: /app/governance — real data from /api/blockchain/proposals
  Step 26: /app/treasury — real data from /api/blockchain/treasury
  Step 27: /app/contributors — real data from /api/blockchain/contributors
  Step 28: /app/security — real data from /api/security
  Step 29: /app/simulator — working POST to /api/simulate
  For each: verify data loads, skeleton shows during load, error state works.

PHASE 7 — SHARED COMPONENTS
  Step 30: Toast notification system
  Step 31: Modal component
  Step 32: Drawer/slide panel
  Step 33: Skeleton loader component
  Step 34: All form input components (light + dark variants)
  Step 35: AI Command Bar (Ctrl+K, floating, connects to /api/ai)

PHASE 8 — FINAL POLISH
  Step 36: Add SEO meta tags to every page (title, description, og:image)
  Step 37: Add error boundaries on every page/module
  Step 38: Verify prefers-reduced-motion compliance
  Step 39: Run full audit — no emojis, all icons Lucide, all colors from design tokens
  Step 40: Final build test: npm run build → must pass with 0 warnings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SECTION 16 — QUALITY BARS TO HIT

After building, evaluate the result against these standards:

METAMASK QUALITY BAR:
  ✓ Can you tell what the product does in under 3 seconds on the homepage?
  ✓ Is every section's purpose immediately clear?
  ✓ Does every button know what it wants you to do?
  ✓ Is the typography bold and confident at large sizes?
  ✓ Do the dark and light sections alternate cleanly?
  ✓ Does the MetaMask button hover animation work on all primary buttons?

CHAINGPT QUALITY BAR:
  ✓ Do glass cards feel like frosted surfaces, not just dark boxes?
  ✓ Do module colors glow (box-shadow, not just color)?
  ✓ Does the dot grid texture add depth to dark sections?
  ✓ Does the app feel like a completely different experience from the marketing site?
  ✓ Is the terminal/monospace aesthetic consistent throughout the app?
  ✓ Do the neon accents feel like light, not paint?

AXION-SPECIFIC QUALITY BAR:
  ✓ Does the 3D universe feel like NASA Eyes on Earth — a real control center?
  ✓ Does clicking "Launch App" feel like "entering another world"?
  ✓ Can a first-time visitor understand all 6 modules without reading documentation?
  ✓ Does the AI chat actually stream responses in real time from Gemini?
  ✓ Do all app module pages show real data, not placeholders?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
