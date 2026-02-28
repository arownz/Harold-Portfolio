<script setup lang="ts">
import { ref } from "vue";
import {
  Monitor,
  Code2,
  Smartphone,
  Database,
  Cloud,
  Wrench,
  Gamepad2,
  Bot,
  Briefcase,
  Network,
  HardDrive,
  Laptop,
} from "lucide-vue-next";

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
      name: "Firebase / NoSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    },
    {
      name: "Supabase / PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    },
    {
      name: "MySQL Workbench / MySQL",
      icon: "OSAAS.jpg",
    },
    {
      name: "XAMPP / MariaDB",
      icon: "xamppicon.jpg",
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
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
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
      name: "Github",
      icon: "githubz.svg",
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
      name: "n8n",
      icon: "N8N.png",
    }
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
    {
      name: "Roblox Studio",
      icon: "Roblox-Studio-Logo-Vector.svg-.png"
    }
  ],
  networking: [
    {
      name: "Cisco Packet Tracer",
      icon: "image-removebg-preview (2).png",
    },
    {
      name: "Wireshark",
      icon: "wiresharkicon.png",
    },
  ],
  virtualization: [
    {
      name: "Oracle VirtualBox",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    },
  ],
  os: [
    {
      name: "Windows Server 2022; Windows 7–11",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg",
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
    {
      name: "Hugging Face",
      icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
    },
  ],
  productivity: [
    {
      name: "Microsoft Office 365",
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
    {
      name: "Filmora",
      icon: "filmorapng.png",
    },
    {
      name: "Capcut",
      icon: "Capcut-Logo-PNG-Photos.png",
    },
    {
      name: "Trello",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg",
    },
    {
      name: "Google Workspace",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    },
    {
      name: "Canva",
      icon: "canvaicon.png",
    },
  ],
});
</script>

<template>
  <section id="tech" class="py-24 px-8 bg-s0 max-md:py-16 max-md:px-6 max-sm:py-12 max-sm:px-4">
    <div class="site-container">
      <h2 class="section-heading fade-in">Tech Stack</h2>
      <p class="section-sub fade-in">
        Technologies and tools (development and non-development) I've applied across various projects
      </p>

      <!-- auto-fill minmax: 2 cols on tablet+, 3 on medium, 4 on large automatically -->
      <div class="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-6 md:gap-8">

        <div v-for="({ icon: catIcon, label, key }) in [
          { icon: Monitor, label: 'Frontend', key: 'frontend' },
          { icon: Code2, label: 'Backend', key: 'backend' },
          { icon: Smartphone, label: 'Mobile & Standalone', key: 'mobile' },
          { icon: Database, label: 'Database', key: 'database' },
          { icon: Cloud, label: 'Cloud & DevOps', key: 'cloud' },
          { icon: Wrench, label: 'Dev Tools', key: 'devtools' },
          { icon: Network, label: 'Networking', key: 'networking' },
          { icon: HardDrive, label: 'Virtualization', key: 'virtualization' },
          { icon: Laptop, label: 'Operating System', key: 'os' },
          { icon: Gamepad2, label: 'Game Development', key: 'gamedev' },
          { icon: Bot, label: 'AI/ML', key: 'ai' },
          { icon: Briefcase, label: 'Productivity', key: 'productivity' },
        ]" :key="key"
          class="tech-category fade-in bg-s1 border-2 border-edge rounded-[1.25rem] p-6 md:p-8
                 transition-all duration-400 ease-in-out
                 hover:-translate-y-2 hover:scale-[1.02] hover:border-brand hover:shadow-[0_20px_40px_-10px_var(--shadow-lg)]"
        >
          <div class="flex items-center gap-3 mb-6 text-brand">
            <component :is="catIcon" :size="28" />
            <h3 class="text-[1.3rem] text-ink font-semibold">{{ label }}</h3>
          </div>
          <div class="flex flex-wrap gap-3">
            <div
              v-for="tech in (techStacks as any)[key]"
              :key="tech.name"
              class="tech-item flex items-center gap-2 bg-s0 px-3 py-1.5 text-[0.85rem]
                     md:px-[1.1rem] md:py-[0.6rem] md:text-[0.95rem]
                     rounded-[0.625rem] text-ink-2 font-medium
                     transition-all duration-300 border border-transparent cursor-default
                     hover:bg-s2 hover:border-brand hover:-translate-y-0.5 hover:scale-105 hover:text-ink
                     hover:shadow-[0_4px_12px_rgba(99,102,241,0.2)]"
            >
              <img :src="tech.icon" :alt="tech.name" class="w-5 h-5 object-contain md:w-6 md:h-6" />
              <span>{{ tech.name }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
