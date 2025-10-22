<script setup lang="ts">
import { ref } from "vue";
import { Github, ExternalLink } from "lucide-vue-next";

// Easily scalable project structure
const projects = ref([
  {
    id: 1,
    title: "Lexia - Dyslexia Learning Platform",
    description:
      "A gamified learning web platform designed specifically for children with dyslexia. Built with accessibility-first game mechanics using Godot Game Engine.",
    image: "projects/lexia.png", // Replace with actual image path
    tags: [
      "Godot",
      "Game Development",
      "Accessibilit TTS, STT, OCR",
      "Google Cloud",
    ],
    github: "https://github.com/arownz/godotcaps", // Replace with actual repo
    demo: "https://gamedevcapz.com/",
    featured: true,
  },
  {
    id: 2,
    title: "Super Admin Lexia",
    description:
      "A super admin management system for the mobile parents and professional playform.",
    image: "projects/super_admin.png", // Replace with actual image path
    tags: ["React", "Node.js", "Firebase", "REST API"],
    github: "https://github.com/arownz/admin_panel",
    demo: "https://gamedevcapz-admin.web.app/login",
    featured: false,
  },
  {
    id: 3,
    title: "Sales Duo",
    description:
      "The application presents a management system appearance suitable for business use, with modern design patterns, responsive layouts, and an intuitive user experience.",
    image: "/projects/sales_duo.png", // Replace with actual image path
    tags: ["React JS", "Bootstrap"],
    github: "https://github.com/arownz/SalesDuo",
    featured: false,
  },
]);
</script>

<template>
  <section id="projects" class="projects">
    <div class="container">
      <h2 class="section-title fade-in">Featured Projects</h2>
      <p class="section-subtitle fade-in">Some of my recent work</p>

      <div class="projects-grid">
        <div
          v-for="project in projects"
          :key="project.id"
          :class="['project-card fade-in', { featured: project.featured }]"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
            <div class="project-overlay">
              <div class="project-links">
                <a :href="project.github" target="_blank" class="project-link">
                  <Github :size="24" />
                  <span>Code</span>
                </a>
                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  class="project-link"
                >
                  <ExternalLink :size="24" />
                  <span>Demo</span>
                </a>
              </div>
            </div>
          </div>

          <div class="project-content">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>

            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: 6rem 2rem;
  background: var(--bg-dark);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  text-align: center;
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 4rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  background: var(--bg-darker);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: var(--primary);
  box-shadow: 0 20px 40px -10px var(--shadow-lg);
}

.project-card.featured {
  grid-column: span 2;
}

.project-image {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(135deg, #1e293b, #334155);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.project-link:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.project-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-content h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.project-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: var(--bg-light);
  color: var(--text-muted);
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.projects-note {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
}

.projects-note p {
  color: #cbd5e1;
  line-height: 1.6;
}

.projects-note code {
  background: #334155;
  color: #6366f1;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: "Courier New", monospace;
}

@media (max-width: 1024px) {
  .project-card.featured {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .projects {
    padding: 4rem 1.5rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-card.featured {
    grid-column: span 1;
  }
}
</style>
