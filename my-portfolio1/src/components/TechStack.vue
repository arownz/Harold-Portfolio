<script setup lang="ts">
import { ref } from "vue";
import { Monitor, Code2, Smartphone, Database, Cloud, Wrench, Gamepad2, Bot, Briefcase, Network } from "lucide-vue-next";

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
      name: "Laravel",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
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
      name: "React Native",
      icon: "react-native-logo-884x1024.png",
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
      name: "Supabase",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "SQLite",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    },
  ],
  cloud: [
    {
      name: "Google Cloud",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    },
    {
      name: "AWS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
  ],
  devtools: [
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
      icon: "ODF.png",
    },
    {
      name: "Windsurf",
      icon: "/windsurf.jpg",
    },
    {
      name: "NetBeans",
      icon: "craiyon_054400_image.png",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "Github Desktop",
      icon: "githubdesk.png",
    },
    {
      name: "Postman",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    },
    {
      name: "Figma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "MySQL Workbench",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "XAMPP",
      icon: "xamppicon.jpg",
    },
    {
      name: "Oracle VirtualBox",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    },
  ],
  gamedev: [
    {
      name: "Unity",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
    },
    {
      name: "Godot",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg",
    },
  ],
  networking: [
    {
      name: "Cisco Packet Tracer",
      icon: "image-removebg-preview (2).png"
    },
    {
      name: "Wireshark",
      icon: "wiresharkicon.png",
    },
  ],
  ai: [
    {
      name: "MCP",
      icon: "https://modelcontextprotocol.io/favicon.svg",
    },
    {
      name: "ChatGPT",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    },
    {
      name: "Claude",
      icon: "claudeicon.png",
    },
    {
      name: "Gemini",
      icon: "geminiicon.svg",
    },
    {
      name: "DeepSeek",
      icon: "craiyon_061056_image.png",
    },
  ],
  productivity: [
    {
      name: "Microsoft 365",
      icon: "microsoft365icon.png",
    },
    {
      name: "Notion",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg",
    },
    {
      name: "Adobe",
      icon: "adobeicon.png",
    },
  ],
});
</script>

<template>
  <section id="tech" class="tech-stack">
    <div class="container">
      <h2 class="section-title fade-in">Tech Stack</h2>
      <p class="section-subtitle fade-in">Technologies and tools I have experienced</p>

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
            <Wrench :size="28" />
            <h3>Dev Tools</h3>
          </div>
          <div class="tech-items">
            <div
              v-for="tech in techStacks.devtools"
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
            <Network :size="28" />
            <h3>Networking</h3>
          </div>
          <div class="tech-items">
            <div
              v-for="tech in techStacks.networking"
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
            <Gamepad2 :size="28" />
            <h3>Game Development</h3>
          </div>
          <div class="tech-items">
            <div
              v-for="tech in techStacks.gamedev"
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
            <Bot :size="28" />
            <h3>AI Tools</h3>
          </div>
          <div class="tech-items">
            <div
              v-for="tech in techStacks.ai"
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
            <Briefcase :size="28" />
            <h3>Productivity</h3>
          </div>
          <div class="tech-items">
            <div
              v-for="tech in techStacks.productivity"
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
  color: var(--primary);
  font-weight: 700;
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
