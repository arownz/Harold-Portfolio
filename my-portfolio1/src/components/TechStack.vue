<script setup lang="ts">
import { ref } from "vue";
import { Monitor, Code2, Smartphone, Database, Cloud } from "lucide-vue-next";

const techStacks = ref({
  frontend: [
    {
      name: "HTML5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Vue.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    },
    {
      name: "Bootstrap",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
  ],
  backend: [
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "PHP",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
  ],
  mobile: [
    {
      name: "Flutter",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    },
    {
      name: "Android",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    },
    {
      name: "Kotlin",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
  ],
  database: [
    {
      name: "Firebase",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "SQLite",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    },
    {
      name: "MS SQL Server",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    },
  ],
  cloud: [
    {
      name: "Google Cloud",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    },
  ],
  tools: [
    {
      name: "Visual Studio Code",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    },
    {
      name: "Android Studio",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
    },
    {
      name: "Cursor",
      icon: "https://www.cursor.com/brand/icon.svg",
    },
    {
      name: "Windsurf",
      icon: "https://avatars.githubusercontent.com/u/184014476?s=200&v=4",
    },
    {
      name: "NetBeans",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "Figma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "Postman",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    },
    {
      name: "Godot",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg",
    },
    {
      name: "Unity",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
    },
    {
      name: "C#",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    },
  ],
});
</script>

<template>
  <section id="tech" class="tech-stack">
    <div class="container">
      <h2 class="section-title fade-in">Tech Stack</h2>
      <p class="section-subtitle fade-in">Technologies and tools I work with</p>

      <div class="tech-grid">
        <div class="tech-category fade-in">
          <div class="category-header">
            <Monitor :size="28" />
            <h3>Frontend</h3>
          </div>
          <div class="tech-items">
            <div
              v-for="tech in techStacks.frontend"
              :key="tech.name"
              class="tech-item"
            >
              <img :src="tech.icon" :alt="tech.name" class="tech-icon-img" />
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>

        <div class="tech-category fade-in">
          <div class="category-header">
            <Code2 :size="28" />
            <h3>Backend</h3>
          </div>
          <div class="tech-items">
            <div
              v-for="tech in techStacks.backend"
              :key="tech.name"
              class="tech-item"
            >
              <img :src="tech.icon" :alt="tech.name" class="tech-icon-img" />
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>

        <div class="tech-category fade-in">
          <div class="category-header">
            <Smartphone :size="28" />
            <h3>Mobile</h3>
          </div>
          <div class="tech-items">
            <div
              v-for="tech in techStacks.mobile"
              :key="tech.name"
              class="tech-item"
            >
              <img :src="tech.icon" :alt="tech.name" class="tech-icon-img" />
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>

        <div class="tech-category fade-in">
          <div class="category-header">
            <Database :size="28" />
            <h3>Database</h3>
          </div>
          <div class="tech-items">
            <div
              v-for="tech in techStacks.database"
              :key="tech.name"
              class="tech-item"
            >
              <img :src="tech.icon" :alt="tech.name" class="tech-icon-img" />
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>

        <div class="tech-category fade-in">
          <div class="category-header">
            <Cloud :size="28" />
            <h3>Cloud & DevOps</h3>
          </div>
          <div class="tech-items">
            <div
              v-for="tech in techStacks.cloud"
              :key="tech.name"
              class="tech-item"
            >
              <img :src="tech.icon" :alt="tech.name" class="tech-icon-img" />
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>

        <div class="tech-category fade-in">
          <div class="category-header">
            <Code2 :size="28" />
            <h3>Tools & Others</h3>
          </div>
          <div class="tech-items">
            <div
              v-for="tech in techStacks.tools"
              :key="tech.name"
              class="tech-item"
            >
              <img :src="tech.icon" :alt="tech.name" class="tech-icon-img" />
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-stack {
  padding: 6rem 2rem;
  background: var(--bg-darker);
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

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.tech-category {
  background: var(--bg-dark);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
}

.tech-category:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
  box-shadow: 0 10px 30px -10px var(--shadow-lg);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  color: var(--primary);
}

.category-header h3 {
  font-size: 1.3rem;
  color: var(--text-primary);
}

.tech-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-darker);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.tech-item:hover {
  background: var(--bg-light);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.tech-icon-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.tech-name {
  font-weight: 500;
}

@media (max-width: 768px) {
  .tech-stack {
    padding: 4rem 1.5rem;
  }

  .tech-grid {
    grid-template-columns: 1fr;
  }
}
</style>
