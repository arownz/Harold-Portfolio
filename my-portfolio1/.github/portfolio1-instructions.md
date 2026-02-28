---
applyTo: '**'
---

# Portfolio Project Instructions — Harold F. Pasion

## Stack
- **Framework**: Vue 3 + TypeScript
- **Build tool**: Vite 7 (`@tailwindcss/vite` plugin handles Tailwind — NOT PostCSS)
- **CSS**: Tailwind CSS v4 (config lives in `src/style.css` via `@theme {}`, NOT in `tailwind.config.js`)
- **Icons**: `lucide-vue-next`
- **Email**: `@emailjs/browser`
- **Deploy**: Netlify (`netlify deploy --prod --dir dist`)

## Tailwind v4 Key Rules
- `@theme {}` in `src/style.css` defines all design tokens (brand colors, surfaces, text, borders)
- `tailwind.config.js` is intentionally empty — unused in v4
- `postcss.config.js` is intentionally empty — Vite plugin handles Tailwind processing
- Use `@layer components {}` in `style.css` for complex/pseudo-element styles that cannot be expressed as utility classes
- **Mobile-first responsive**: default classes = mobile, `md:` = 768px+, `lg:` = 1024px+
  - CORRECT: `grid-cols-1 md:grid-cols-2` (mobile=1col, desktop=2col)
  - WRONG:   `grid-cols-2 md:grid-cols-1` (this is desktop-first, breaks on mobile)
  - Use `max-md:` or `max-sm:` ONLY for padding/spacing overrides, not for layout direction

## Design Token Reference
| Token | CSS Variable | Usage |
|-------|-------------|-------|
| `brand` | `--primary` | Accent color (blue) |
| `brand-2` | `--secondary` | Secondary accent |
| `accent` | `--accent` | Highlight |
| `s0` | `--bg-darker` | Darkest surface |
| `s1` | `--bg-dark` | Dark surface |
| `s2` | `--bg-light` | Light surface |
| `s3` | `--bg-lighter` | Lightest surface |
| `ink` | `--text-primary` | Primary text |
| `ink-2` | `--text-secondary` | Secondary text |
| `ink-3` | `--text-muted` | Muted/helper text |
| `edge` | `--border` | Borders |
| `edge-2` | `--border-light` | Light borders |

## Global Component Classes (use these, do not re-define)
Defined in `src/style.css` under `@layer components`:
- **Layout**: `.site-container` — max-width 1200px centered
- **Headers**: `.section-heading`, `.section-sub`
- **Buttons**: `.btn`, `.btn-primary`, `.btn-secondary`
- **Tags**: `.tag`
- **Navbar**: `.navbar`, `.navbar.scrolled`, `.mobile-menu`
- **Hero**: `.gradient-orb`, `.orb-1/2/3`, `.scroll-indicator`, `.bounce`, `.typing-cursor`
- **Tech**: `.tech-category` (shimmer hover), `.tech-item` (gradient hover)
- **Projects**: `.project-card` (top accent bar pseudo-element), `.project-badge-pulse`
- **Contact form**: `.contact-form-wrapper` (top accent bar pseudo-element)
- **Timeline**: `.timeline`, `.timeline::before`, `.timeline-item`, `.timeline-marker`, `.timeline-content`, `.timeline-period`, `.timeline-location`, `.timeline-description`, `.timeline-title`
- **Company logos**: `.company-logo`
- **Certs**: `.cert-category`, `.category-badge`, `.category-badge.certiport/.tesda`, `.featured-cert`, `.cert-card`, `.cert-card.featured`, `.cert-shine`, `.cert-image-wrapper`, `.cert-image`, `.cert-content`, `.cert-title`, `.cert-issuer`, `.cert-badge`, `.cert-badge.primary/.pmi`, `.cert-number`, `.cert-subtitle`
- **Carousel**: `.carousel-container`, `.carousel-wrapper`, `.carousel-track`, `.carousel-card`, `.carousel-btn`, `.carousel-indicators`, `.indicator`, `.indicator.active`

## Scroll Animation Classes
- `.fade-in` — fade up on scroll
- `.fade-in-left` — slide in from left
- `.fade-in-right` — slide in from right
- `.scale-in` — scale up on scroll
- Add `.visible` class (done automatically via IntersectionObserver in `App.vue`)

## HMR Fix
In `App.vue`, the scroll observer re-initializes after hot module updates:
```ts
if (import.meta.hot) {
  import.meta.hot.on('vite:afterUpdate', () => setTimeout(initScrollObserver, 200))
}
```

## File Structure
```
src/
  style.css            — Global styles, Tailwind setup, @theme tokens, @layer components
  main.ts              — Entry point
  App.vue              — Root: section tracking, scroll observer, HMR fix, footer
  components/
    Navigation.vue     — Fixed navbar, theme toggle, resume download
    HeroSection.vue    — Hero with typing animation, minimal scoped style (cursor pseudo)
    TechStack.vue      — 12 tech categories via v-for over config array
    ProjectsSection.vue — Project grid with hover overlay
    AboutSection.vue   — About, education/work timeline, certifications carousel
    ContactSection.vue — Contact form (EmailJS) + info panel
    ScrollProgress.vue — Fixed top progress bar
    BackToTop.vue      — Scroll-to-top button
    ParticleBackground.vue — Canvas particle animation
    ThemeToggle.vue    — Light/dark theme switcher
  composables/
    useTheme.ts        — Theme toggle logic
    useScrollAnimation.ts
    useEnhancedScrollAnimation.ts
    useNaiveTheme.ts
```

## Content Reference
- **Owner**: Harold F. Pasion
- **Role**: IT student / Web Development Intern
- **University**: National University – Dasmariñas (BSIT, specialization Mobile & Web Apps, 2022–2026)
- **Internship**: Web Development Intern @ Endsofttech Web Solutions (Nov 2025 – May 2026)
- **Previous**: Office/Student Assistant @ MSQ Business Services (Aug 2024 – Feb 2025)
- **Email**: pasionharold252002@gmail.com | **Phone**: +63 949 478 1634
- **GitHub**: https://github.com/arownz | **LinkedIn**: https://www.linkedin.com/in/harold-pasion-017a131b8/

## How to Add New Sections / Components
1. Create `src/components/NewSection.vue`
2. Use Tailwind utilities for layout: `py-24 px-8 bg-s0 max-md:py-16 max-sm:py-12`
3. Use `.site-container` wrapper for content width
4. Use `.section-heading` and `.section-sub` for titles
5. For hover pseudo-elements or ::before/::after → add to `@layer components` in `style.css`
6. Add scroll animation class (`.fade-in`, `.fade-in-left`, etc.) — no extra setup needed
7. Register in `App.vue` template

## Deploy
```bash
npm run build
netlify deploy --prod --dir dist
```
