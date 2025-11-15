<script setup lang="ts">
import { ref } from "vue";
import { Github, ExternalLink } from "lucide-vue-next";

// Easily scalable project structure
const projects = ref([
  {
    id: 1,
    title: "Lexia - Dyslexia Learning Platform (Capstone)",
    description:
      "A gamified learning platform for children with dyslexia, built using accessibility-first mechanics in Godot Engine. (OCR-based whiteboard handwritten processing feature was disabled due to Google Cloud billing cancellation.)",
    image: "projects/lexia.png", // Replace with actual image path
    tags: [
      "Godot",
      "GDscript",
      "Game Development",
      "Accessibility TTS, STT, OCR",
      "Google Cloud",
    ],
    github: "https://github.com/arownz/godotcaps", // Replace with actual repo
    demo: "https://gamedevcapz.web.app/",
    featured: true,
  },
  {
    id: 2,
    title: "Super Admin Lexia",
    description:
      "Help in developing super admin management system for the mobile parents and professional platform.",
    image: "projects/super_admin.png", // Replace with actual image path
    tags: ["React + Vite", "Bootstrap", "Javascript", "Firebase", "REST API"],
    github: "https://github.com/arownz/admin_panel",
    demo: "https://gamedevcapz-admin.web.app/login",
    featured: true,
  },
  {
    id: 3,
    title: "Cashier Point of Sale System",
    description:
      "A Standalone Point of Sale System (POS) for cashier to manage their menu sales transactions.",
    image: "/projects/POS_System.png", // Replace with actual image path
    tags: ["Netbeans", "Java GUI"],
    github: "https://github.com/arownz/Cashier-POS-java",
    featured: false,
  },
  {
    id: 4,
    title: "iBorrow",
    description:
      "iBorrow is a mobile library management application. It provides an intuitive interface for both book borrowers and administrators to manage book borrowing efficiently.",
    image: "/projects/iborrows.png", // Replace with actual image path
    tags: ["Flutter", "Supabase", "Google Cloud Books", "REST API"],
    github: "https://github.com/arownz/iborrow",
    featured: false,
  },
  {
    id: 5,
    title: "ShopEase",
    description:
      "ShopEase is a mobile e-commerce web application. It provides an intuitive interface for both customers and administrators to manage book borrowing efficiently.",
    image: "/projects/black.png", // Replace with actual image path
    tags: ["React + Vite", "Bootstrap", "Laravel", "Javascript", "REST API"],
    github: "https://github.com/arownz/e-commerce",
    featured: false,
  },
  {
    id: 6,
    title: "Devslog",
    description:
      "Devslog is a forum web application for developers to share their knowledge and experiences. They can post some of their day to day development resources and share their knowledge with others.",
    image: "/projects/logsz.png", // Replace with actual image path
    tags: ["React + Vite", "Tailwind", "XAMPP", "Javascript", "REST API"],
    github: "https://github.com/arownz/devslog",
    featured: false,
  },
  {
    id: 7,
    title: "ExpenzeWize",
    description:
      "Manage your financial expenses with ease. Track your expenses, set budgets, and get insights into your spending habits.",
    image: "/projects/expenses.png", // Replace with actual image path
    tags: ["React + Vite", "MySQL Workbench", "Javascript", "REST API"],
    github: "https://github.com/arownz/Group-1-ETS-Final",
    featured: false,
  },
  {
    id: 8,
    title: "Sales Duo",
    description:
      "The application presents a management system appearance suitable for business use, with modern design patterns, responsive layouts, and an intuitive user experience.",
    image: "/projects/sales_duo.png", // Replace with actual image path
    tags: ["React JS", "Bootstrap", "XAMPP", "REST API"],
    github: "https://github.com/arownz/SalesDuo",
    featured: false,
  },
  {
    id: 9,
    title: "Resumay Tailor Swift",
    description:
      "An AI-powered resume builder web application that helps users modify their resumes quickly and easily using customizable templates and real-time suggestions.",
    image: "/projects/tailorz.png",
    tags: [
      "AI",
      "Resume PDF Tailor",
      "React Javascript",
      "Tailwind CSS",
      "Hugging Face",
    ],
    github: "https://github.com/arownz/resume_tailor_ai",
    featured: false,
  },
]);
</script>

<template>
  <section id="projects" class="projects">
    <div class="container">
      <h2 class="section-title fade-in">Featured Projects</h2>
      <p class="section-subtitle fade-in">
        Some self-initiated and group projects
      </p>

      <div class="projects-grid">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :class="[
            'project-card',
            { featured: project.featured },
            index % 2 === 0 ? 'fade-in-left' : 'fade-in-right',
          ]"
        >
          <div class="project-badge" v-if="project.featured">
            <span>Featured</span>
          </div>

          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
            <div class="project-overlay">
              <div class="project-links">
                <a
                  :href="project.github"
                  target="_blank"
                  class="project-link"
                  aria-label="View source code"
                >
                  <Github :size="24" />
                  <span>Code</span>
                </a>
                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  class="project-link"
                  aria-label="View live demo"
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
  color: var(--primary);
  font-weight: 700;
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
  border-radius: 1.25rem;
  overflow: hidden;
  border: 2px solid var(--border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;
}

.project-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--primary),
    var(--secondary),
    var(--accent)
  );
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.project-card:hover::before {
  transform: scaleX(1);
}

.project-card:hover {
  transform: translateY(-12px);
  border-color: var(--primary);
  box-shadow: 0 25px 50px -12px var(--shadow-lg);
}

.project-card.featured {
  grid-column: span 1;
  background: linear-gradient(
    135deg,
    var(--bg-darker) 0%,
    rgba(99, 102, 241, 0.05) 100%
  );
}

.project-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 700;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.6);
  }
}

.badge-star {
  width: 16px;
  height: 16px;
}

.project-image {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(135deg, #1e293b, #334155);
}

.project-image::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.1) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-card:hover .project-image::after {
  opacity: 1;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .project-image img {
  transform: scale(1.1) rotate(1deg);
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
  pointer-events: none;
  z-index: 5;
}

.project-card:hover .project-overlay {
  opacity: 1;
  pointer-events: auto;
}

.project-links {
  display: flex;
  gap: 1rem;
  z-index: 10;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  pointer-events: auto;
  z-index: 15;
}

.project-link::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.project-link:hover::before {
  width: 300px;
  height: 300px;
}

.project-link:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5);
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
  padding: 0.45rem 0.9rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  cursor: default;
}

.tag:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  transform: translateY(-2px);
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

@media (max-width: 768px) {
  .projects {
    padding: 4rem 1.5rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .projects {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 3rem;
  }

  .projects-grid {
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .project-image {
    height: 200px;
  }

  .project-content {
    padding: 1.25rem;
  }

  .project-content h3 {
    font-size: 1.25rem;
  }

  .project-content p {
    font-size: 0.95rem;
  }

  .project-tags {
    gap: 0.4rem;
  }

  .tag {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }

  .project-link {
    padding: 0.6rem 1.25rem;
    font-size: 0.9rem;
  }
}
</style>
