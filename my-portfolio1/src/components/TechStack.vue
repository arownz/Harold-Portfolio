<script setup lang="ts">
import CodedBackground from './CodedBackground.vue'
import { ref, onBeforeUnmount } from "vue";
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

interface TechItem {
  name: string;
  icon: string;
  description: string;
}

const techStacks = ref<Record<string, TechItem[]>>({
  frontend: [
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", description: "The backbone of the web — structures content with semantic markup for accessibility, SEO, and maintainable document hierarchy." },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", description: "Styles and animates web pages with modern techniques like Grid, Flexbox, custom properties, and responsive design." },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", description: "The core language of the web — powers dynamic interactivity and complex client-side logic in any browser." },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", description: "Typed superset of JavaScript that catches errors at compile time and improves developer experience at scale." },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", description: "Meta's component-based UI library for building fast, reusable, and declarative web interfaces." },
    { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", description: "A progressive JavaScript framework for building interfaces with a gentle learning curve and composable architecture." },
    { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", description: "CSS framework with ready-to-use responsive components and a flexible grid system for rapid layout development." },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", description: "Utility-first CSS framework for building consistent, maintainable UIs directly in markup without context switching." },
  ],
  backend: [
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", description: "JavaScript runtime for server-side development — enables full-stack JS apps with a fast, non-blocking event loop." },
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", description: "Server-side scripting language widely used for web backends, CMS platforms, and database-driven applications." },
    { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", description: "Elegant PHP framework with expressive syntax, robust ORM, and built-in tools for routing, auth, and REST APIs." },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", description: "Versatile, readable language ideal for automation, scripting, data processing, and AI/ML integration workflows." },
  ],
  mobile: [
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", description: "Google's UI toolkit for building natively compiled apps for mobile, web, and desktop from a single Dart codebase." },
    { name: "React Native", icon: "react-native-logo-884x1024.png", description: "Builds native iOS and Android apps using React's component model and the full JavaScript ecosystem." },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", description: "Modern, concise Android language officially endorsed by Google — fully interoperable with Java." },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", description: "Object-oriented language foundational to Android development, enterprise systems, and academic CS coursework." },
  ],
  database: [
    { name: "Firebase / NoSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", description: "Google's real-time cloud database with built-in auth, hosting, and offline sync — ideal for rapid app prototyping." },
    { name: "Supabase / PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", description: "Open-source Firebase alternative powered by PostgreSQL's relational engine with a real-time API and auth layer." },
    { name: "MySQL Workbench / MySQL", icon: "OSAAS.jpg", description: "Industry-standard relational DBMS with a visual workbench for schema design, query optimization, and data modeling." },
    { name: "XAMPP / MariaDB", icon: "xamppicon.jpg", description: "Local development stack combining Apache, MariaDB, and PHP — ideal for offline full-stack backend development." },
  ],
  cloud: [
    { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", description: "Google's cloud platform for compute, storage, serverless functions, and AI services — used in real project deployments." },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", description: "Amazon's comprehensive cloud platform powering scalable, global infrastructure for modern web workloads." },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", description: "Containerization platform for packaging apps and dependencies to run consistently across any environment or team." },
  ],
  devtools: [
    { name: "Visual Studio Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", description: "Lightweight yet powerful code editor with a vast extension ecosystem for any language or development workflow." },
    { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg", description: "Official Android IDE with a built-in emulator, layout editor, Gradle integration, and performance profiling tools." },
    { name: "Cursor", icon: "ODF.png", description: "AI-first code editor built on VS Code — accelerates development with inline LLM assistance and codebase-aware completions." },
    { name: "Windsurf", icon: "/windsurf.jpg", description: "Agentic IDE with deep codebase understanding — enables in-editor AI collaboration that goes beyond basic autocomplete." },
    { name: "NetBeans", icon: "craiyon_054400_image.png", description: "Java-focused open-source IDE used for desktop, web, and mobile application development in academic settings." },
    { name: "Github", icon: "githubz.svg", description: "World's largest code hosting and collaboration platform for version control, open-source contribution, and code review." },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", description: "Distributed version control system for tracking changes, branching strategies, and collaborating across teams." },
    { name: "Github Desktop", icon: "githubdesk.png", description: "GUI client that streamlines commit, branch management, and pull request workflows without needing the command line." },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", description: "API platform for building, testing, and documenting REST and GraphQL services with collaborative team workspaces." },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", description: "Collaborative UI/UX design tool for prototyping, design systems, component libraries, and developer handoff." },
    { name: "n8n", icon: "N8N.png", description: "Open-source workflow automation platform connecting apps and APIs with a visual low-code and code-integrated builder." },
  ],
  gamedev: [
    { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg", description: "Cross-platform 2D/3D game engine using C# scripting — widely used across indie and commercial game development." },
    { name: "Godot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg", description: "Open-source engine with its own GDScript — used for the Lexia capstone project with Google Cloud OCR integration." },
    { name: "Roblox Studio", icon: "Roblox-Studio-Logo-Vector.svg-.png", description: "Platform and IDE for creating multiplayer experiences using Lua scripting and collaborative world-building tools." },
  ],
  networking: [
    { name: "Cisco Packet Tracer", icon: "image-removebg-preview (2).png", description: "Network simulation tool for designing, configuring, and troubleshooting complex topologies without physical hardware." },
    { name: "Wireshark", icon: "wiresharkicon.png", description: "Network protocol analyzer for capturing and inspecting live packet traffic for security analysis and debugging." },
  ],
  virtualization: [
    { name: "Oracle VirtualBox", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", description: "Free open-source hypervisor for running multiple isolated OS environments on a single physical machine." },
  ],
  os: [
    { name: "Windows Server 2022; Windows 7–11", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg", description: "Microsoft's enterprise server OS and desktop family — used for IT administration, networking, and system configuration." },
  ],
  ai: [
    { name: "MCP", icon: "https://modelcontextprotocol.io/favicon.svg", description: "Model Context Protocol — an open standard for giving AI agents structured, secure access to external tools and data." },
    { name: "ChatGPT", icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", description: "OpenAI's conversational AI for coding assistance, writing, research, and accelerating everyday development tasks." },
    { name: "Claude", icon: "claudeicon.png", description: "Anthropic's AI focused on safety and nuanced reasoning — used extensively throughout this portfolio's development." },
    { name: "Gemini", icon: "geminiicon.svg", description: "Google's multimodal AI integrated across the Google ecosystem for development, ideation, and research workflows." },
    { name: "DeepSeek", icon: "craiyon_061056_image.png", description: "High-capacity open-weight language model excelling in coding, math reasoning, and multilingual understanding." },
    { name: "Hugging Face", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", description: "Open-source AI platform for discovering and deploying models — used in the Resumay Tailor Swift project." },
  ],
  productivity: [
    { name: "Microsoft Office 365", icon: "microsoft365icon.png", description: "Cloud-integrated productivity suite covering documents, spreadsheets, presentations, and team collaboration." },
    { name: "Notion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg", description: "All-in-one workspace combining notes, databases, wikis, and project boards into one connected system." },
    { name: "Adobe", icon: "adobeicon.png", description: "Industry-standard creative suite for graphic design, video editing, image processing, and visual content production." },
    { name: "Trello", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg", description: "Kanban-style project board for visualizing tasks, managing sprints, and keeping teams aligned on priorities." },
    { name: "Google Workspace", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", description: "Google's cloud productivity platform — Docs, Sheets, Drive, and Meet — for real-time collaboration and file management." },
    { name: "Canva", icon: "canvaicon.png", description: "Web-based design tool for creating presentations, social visuals, and graphics with an intuitive drag-and-drop editor." },
  ],
});

// ---- Tech tooltip: typing animation state ----
const hoveredTech = ref<TechItem | null>(null);
const tooltipStyle = ref<{ left: string; top: string }>({ left: "0px", top: "0px" });
const typedText = ref("");
let typingTimer: ReturnType<typeof setTimeout> | null = null;

const clearTyping = () => {
  if (typingTimer !== null) { clearTimeout(typingTimer); typingTimer = null; }
};

const typeText = (text: string) => {
  clearTyping();
  typedText.value = "";
  let i = 0;
  const tick = () => {
    if (i < text.length) {
      typedText.value += text[i++];
      typingTimer = setTimeout(tick, 18);
    }
  };
  tick();
};

const onTechEnter = (tech: TechItem, event: MouseEvent) => {
  const el = event.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const TOOLTIP_W = 268;
  const TOOLTIP_H = 130;
  let left = rect.left + rect.width / 2 - TOOLTIP_W / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - TOOLTIP_W - 8));
  const spaceBelow = window.innerHeight - rect.bottom;
  const top = spaceBelow >= TOOLTIP_H + 12 ? rect.bottom + 10 : rect.top - TOOLTIP_H - 10;
  tooltipStyle.value = { left: `${left}px`, top: `${top}px` };
  hoveredTech.value = tech;
  typeText(tech.description);
};

const onTechLeave = () => {
  clearTyping();
  hoveredTech.value = null;
  typedText.value = "";
};

onBeforeUnmount(clearTyping);
</script>

<template>
  <section id="tech" class="py-24 px-8 bg-s0 max-md:py-16 max-md:px-6 max-sm:py-12 max-sm:px-4 relative overflow-hidden">
    <CodedBackground />
    <div class="site-container relative z-10">
      <h2 class="section-heading fade-in">Tech Stack</h2>
      <p class="section-sub fade-in">
        A broad toolkit that I have used refined across real-world projects — from frontend and mobile to cloud, AI, and beyond.
        <span class="hidden md:inline opacity-60"> Hover any technology to learn more.</span>
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
                     transition-all duration-300 border border-transparent cursor-help
                     hover:bg-s2 hover:border-brand hover:-translate-y-0.5 hover:scale-105 hover:text-ink
                     hover:shadow-[0_4px_12px_rgba(158,29,76,0.25)]"
              @mouseenter="onTechEnter(tech, $event)"
              @mouseleave="onTechLeave"
            >
              <img :src="tech.icon" :alt="tech.name" class="w-5 h-5 object-contain md:w-6 md:h-6" />
              <span>{{ tech.name }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Tech tooltip popup (typing animation) -->
  <Teleport to="body">
    <Transition name="tech-tooltip">
      <div v-if="hoveredTech" class="tech-tooltip-popup" :style="tooltipStyle">
        <div class="tt-header">
          <img :src="hoveredTech.icon" :alt="hoveredTech.name" class="tt-icon" />
          <span class="tt-name">{{ hoveredTech.name }}</span>
        </div>
        <p class="tt-body">{{ typedText }}<span class="tt-cursor">|</span></p>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.tech-tooltip-popup {
  position: fixed;
  z-index: 99999;
  pointer-events: none;
  width: 268px;
  background: var(--bg-dark);
  border: 1px solid var(--border-light);
  border-radius: 0.875rem;
  padding: 0.875rem 1rem 1rem;
  overflow: hidden;
  box-shadow:
    0 24px 48px -8px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(99, 102, 241, 0.1);
}
.tech-tooltip-popup::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
}
.tt-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 0.625rem;
}
.tt-icon {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  flex-shrink: 0;
}
.tt-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-primary);
  line-height: 1.3;
}
.tt-body {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 0;
}
.tt-cursor {
  display: inline-block;
  color: var(--primary);
  font-weight: 700;
  animation: tt-blink 1s steps(1) infinite;
  margin-left: 1px;
}
@keyframes tt-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.tech-tooltip-enter-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.tech-tooltip-leave-active {
  transition: opacity 0.1s ease;
}
.tech-tooltip-enter-from {
  opacity: 0;
  transform: translateY(6px) scale(0.96);
}
.tech-tooltip-leave-to {
  opacity: 0;
}
</style>
