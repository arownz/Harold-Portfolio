# AI Coding Agent Instructions - Harold's Portfolio

## Project Overview

Vue 3 + TypeScript + Vite portfolio website with smooth scroll animations, theme switching, and responsive design. Single-page application with section-based navigation.

## Architecture Patterns

### Component Organization

- **App.vue**: Main orchestrator with Intersection Observer for scroll animations, active section tracking
- **Single-file components**: All use `<script setup lang="ts">` composition API pattern
- **Teleport for fixed elements**: Navigation and BackToTop buttons use `<Teleport to="body">` to escape app container for proper z-index layering

### Animation System

**Critical**: All scroll animations rely on Intersection Observer in `App.vue`:

```typescript
// Observes: .fade-in, .fade-in-left, .fade-in-right, .scale-in
// Adds 'visible' class when threshold met (0.1)
```

Add animations by applying these classes in component templates. CSS transitions defined in `style.css`.

### Theme System

Uses `useTheme()` composable with localStorage persistence:

- CSS variables in `:root` and `[data-theme="light|dark"]`
- Theme colors: `--primary`, `--bg-darker`, `--text-primary`, etc.
- Toggle via `data-theme` attribute on `document.documentElement`

### Color Theming Convention

**Project-specific pattern**: Certification sections use branded colors, NOT system theme colors:

- Certiport certifications: `#0084A0` (teal) - applies to badges, borders, category headers
- TESDA certifications: `#0000FF` (blue) - applies to circular numbers (1-5), badges, borders
- Featured projects: `var(--primary)` (system blue)

Target with parent selectors: `.tesda-section .cert-card`, `.category-badge.certiport`

### Responsive Breakpoints

Mobile-first approach with breakpoints at: 480px, 640px, 768px, 1024px

```css
@media (max-width: 768px) {
  /* tablet */
}
@media (max-width: 480px) {
  /* mobile */
}
```

## Key Technical Decisions

### Fixed Positioning

Navigation and BackToTop MUST use Vue Teleport to avoid z-index conflicts:

```vue
<Teleport to="body">
  <nav :class="['navbar', { scrolled: scrollY > 50 }]">
```

Teleport moves element outside `.app` container, enabling true `position: fixed`.

### EmailJS Integration

Contact form uses EmailJS with Gravatar integration:

- Service ID: `service_hootxr7`
- Template ID: `template_lemm6u7`
- Public Key: `UCFzr7LWiiuQHaXcj`
- SHA-256 hashes email for Gravatar URL in template params

### Carousel Implementation

TESDA certifications use custom touch/mouse drag carousel in `AboutSection.vue`:

- Reactive state: `currentTesdaIndex`, `tesdaCardsPerView`
- Event handlers: `handleDragStart`, `handleDragMove`, `handleDragEnd`
- Responsive cards: 3 desktop → 2 tablet → 1 mobile
- Transform-based scrolling with `scroll-snap-type`

### Project Grid Layout

Projects use CSS Grid in `ProjectsSection.vue`:

- All cards `grid-column: span 1` (fixed from previous span 2 for featured)
- Featured projects get colored border and badge overlay
- Grid auto-fits with `minmax(350px, 1fr)`

## External References & MCP Tools

**When implementing new features or debugging**: Use Model Context Protocol (MCP) tools for up-to-date documentation:

### Upstash Context7

Use `mcp_upstash_conte_resolve-library-id` + `mcp_upstash_conte_get-library-docs` for:

- **Vue 3 APIs**: Query "vue" or "vuejs" for Composition API, reactivity, Teleport, lifecycle hooks
- **Vite configuration**: Query "vite" for build optimization, plugin usage, dev server config
- **TypeScript patterns**: Query "typescript" for type definitions, generics, utility types
- **EmailJS integration**: Query "emailjs" for template configuration, service setup
- **Lucide icons**: Query "lucide-vue-next" for icon components and props

**Example workflow**:

1. Call `resolve-library-id` with library name (e.g., "vue")
2. Call `get-library-docs` with returned Context7-compatible ID
3. Use focused topic parameter for specific features (e.g., topic: "teleport")

### GitHub MCP

Access this repository's issues, PRs, and commits using GitHub MCP tools when:

- Reviewing recent changes or deployment history
- Creating issues for tracked improvements
- Checking commit history for feature implementation details

### Chrome DevTools MCP

Use for testing responsive behavior and debugging:

- Test carousel touch events across device viewports
- Verify animation performance and scroll jank
- Debug EmailJS form submission in browser context

## Development Workflow

### Commands

```bash
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # TypeScript check + Vite build → dist/
npm run preview   # Preview production build
```

### Deployment

Netlify auto-deploys from `main` branch:

- Build: `npm run build`
- Publish: `dist/`
- SPA redirect: `/*` → `/index.html` (in netlify.toml)

### Adding Content

**Projects**: Update `projects` ref array in `ProjectsSection.vue`. Add images to `public/projects/`.
**Certifications**: Modify `certifications.certiport` or `certifications.tesda` arrays in `AboutSection.vue`.
**Tech stack**: Update `techStacks` ref object in `TechStack.vue` by category.

## Critical Files

- `src/App.vue`: Scroll handling, Intersection Observer setup
- `src/style.css`: Global animations (fade-in, scale-in variants), CSS variables
- `src/composables/useTheme.ts`: Theme persistence logic
- `src/components/AboutSection.vue`: Complex carousel + certification styling (~1200 lines)

## Common Gotchas

1. **Scroll animations not working**: Check if element has animation class AND Intersection Observer is initialized in App.vue
2. **Fixed element hiding**: Must use Teleport + scoped styles, not global `!important` overrides
3. **Theme colors not applying**: Use CSS variables from `:root`, not hardcoded values (except certification brand colors)
4. **Grid alignment issues**: Ensure all project cards use `grid-column: span 1`, not span 2
5. **Parallax scroll issues**: Avoid transform on scroll for static sections - only navbar should follow scroll

## Style Conventions

- Scoped styles in components, global animations in `style.css`
- BEM-like naming: `.cert-card`, `.cert-badge.primary`, `.tesda-section`
- Cubic-bezier timing: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth transitions
- z-index hierarchy: Navigation (1000) < BackToTop (9999)
