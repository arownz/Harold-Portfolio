# Harold F. Pasion - Developer Portfolio

A modern, responsive portfolio website built with Vue 3, TypeScript, and Vite. Features smooth animations, interactive elements, and a clean, professional design.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Interactive Elements**: Scroll-based animations, hover effects, and smooth navigation
- **Scalable Architecture**: Easy to add more projects and update content
- **Accessibility**: Built with accessibility-first principles
- **Performance**: Optimized for fast loading and smooth interactions

## 📁 Project Structure

```
my-portfolio1/
├── src/
│   ├── components/
│   │   ├── Navigation.vue       # Fixed navigation bar with scroll effects
│   │   ├── HeroSection.vue      # Landing section with animated background
│   │   ├── AboutSection.vue     # About me with highlights and stats
│   │   ├── TechStack.vue        # Technology stack showcase
│   │   ├── ProjectsSection.vue  # Featured projects grid
│   │   └── ContactSection.vue   # Contact form and information
│   ├── App.vue                  # Main app component
│   ├── main.ts                  # App entry point
│   └── style.css                # Global styles
├── public/
│   └── projects/                # Place your project images here
└── package.json
```

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend tooling
- **Lucide Vue** - Beautiful icon library

## 📝 Customization Guide

### 1. Update Personal Information

**Navigation & Hero Section:**

- Edit social media links in `HeroSection.vue` (GitHub, LinkedIn)
- Update email in `HeroSection.vue` and `ContactSection.vue`

**About Section:**

- Modify the about text in `AboutSection.vue`
- Update education, certification, and experience cards

### 2. Add Your Projects

**In `ProjectsSection.vue`:**

```typescript
const projects = ref([
  {
    id: 1,
    title: 'Your Project Name',
    description: 'Your project description',
    image: '/projects/your-image.jpg',  // Add image to public/projects/
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/yourusername/repo',
    demo: 'https://your-demo-url.com',
    featured: true  // Featured projects span 2 columns on desktop
  },
  // Add more projects...
])
```

### 3. Add Project Images

1. Place your project screenshots in `public/projects/` folder
2. Name them descriptively (e.g., `lexia.jpg`, `ecommerce-app.png`)
3. Update the `image` path in the projects array
4. Recommended image size: 800x600px or 16:9 aspect ratio

### 4. Update Tech Stack

**In `TechStack.vue`:**

```typescript
const techStacks = ref({
  frontend: [
    { name: 'Your Tech', icon: '🚀' },
    // Add more...
  ],
  // Update other categories...
})
```

### 5. Customize Colors

The portfolio uses a modern dark theme with purple/blue accents. To change colors, update these CSS variables in component styles:

- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#ec4899` (Pink)
- Background: `#020617` (Dark blue)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```
2. **Run development server:**

   ```bash
   npm run dev
   ```
3. **Build for production:**

   ```bash
   npm run build
   ```
4. **Preview production build:**

   ```bash
   npm run preview
   ```

## 📸 Adding Project Images

Since this is a template, placeholder image paths are used. Follow these steps:

1. Create actual project screenshots or mockups
2. Save them in `public/projects/` folder
3. Update the image paths in `ProjectsSection.vue`
4. Recommended formats: JPG, PNG, or WebP
5. Optimize images for web (compress to reduce file size)

## 🎨 Customization Tips

### Adding New Sections

1. Create a new component in `src/components/`
2. Import it in `App.vue`
3. Add it to the template
4. Update navigation links if needed

### Modifying Animations

- Fade-in animations are controlled by the `.fade-in` class
- Adjust timing in `style.css`
- Intersection Observer settings are in `App.vue`

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 📧 Contact Form

The contact form currently shows an alert. To make it functional:

1. **Option 1 - Email Service (EmailJS, Formspree):**

   ```typescript
   // In ContactSection.vue
   const handleSubmit = async (e) => {
     // Add your email service integration
   }
   ```
2. **Option 2 - Backend API:**

   - Create a backend endpoint
   - Send form data via fetch/axios
3. **Option 3 - Netlify Forms:**

   - Add `netlify` attribute to form
   - Configure in Netlify dashboard

## 🚀 Deployment

### Netlify (Recommended)

1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Auto-detected settings work out of the box

### GitHub Pages

```bash
npm run build
# Deploy dist folder to gh-pages branch
```

## 📄 License

This portfolio template is free to use for personal and commercial projects.

## 🙏 Credits

- Icons: [Lucide Icons](https://lucide.dev/)
- Framework: [Vue.js](https://vuejs.org/)
- Build Tool: [Vite](https://vitejs.dev/)

---

**Made by Harold F. Pasion**

For questions or suggestions, reach out at pasionharold252002@gmail.com
