<script setup lang="ts">
import { ref } from "vue";
import { Github, ExternalLink } from "lucide-vue-next";

// Easily scalable project structure
const projects = ref([
  {
    id: 1,
    title: "Vet Assist App - Veterinary Management System",
    description:
      "A structured veterinary management system for client-facing operations. Contributed to production web app enhancements, debugging, web app designing, and quality assurance to improve usability and performance.",
    image: "projects/vetassist.png", // Replace with actual image path
    tags: [
      "Web Development",
      "Production Debugging",
      "QA Testing",
      "UI/UX Design",
      "Veterinary Software",
    ],
    github: false,
    demo: "https://demo.vetassist.app/",
    featured: true,
  },
  {
    id: 2,
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
    id: 3,
    title: "Super Admin Lexia (Capstone)",
    description:
      "A super admin management system for a mobile platform serving parents and professionals. Assisted as a web developer and QA in production enhancements, debugging, design, and testing to strengthen centralized control and usability.",
    image: "projects/super_admin.png", // Replace with actual image path
    tags: ["React + Vite", "Bootstrap", "Javascript", "Firebase", "REST API"],
    github: "https://github.com/arownz/admin_panel",
    demo: "https://gamedevcapz-admin.web.app/login",
    featured: true,
  },
   {
    id: 4,
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
    featured: true,
    demo: "https://huggingface.co/spaces/arownz/resumetailor",
  },
  {
    id: 5,
    title: "Cashier Point of Sale System",
    description:
      "A Standalone Point of Sale System (POS) for cashier to manage their menu sales transactions.",
    image: "/projects/POS_System.png", // Replace with actual image path
    tags: ["Netbeans", "Java GUI"],
    github: "https://github.com/arownz/Cashier-POS-java",
    featured: false,
  },
  {
    id: 6,
    title: "iBorrow",
    description:
      "iBorrow is a mobile library management application. It provides an intuitive interface for both book borrowers and administrators to manage book borrowing efficiently.",
    image: "/projects/iborrows.png", // Replace with actual image path
    tags: ["Flutter", "Supabase", "Google Cloud Books", "REST API"],
    github: "https://github.com/arownz/iborrow",
    featured: false,
  },
  {
    id: 7,
    title: "ShopEase",
    description:
      "ShopEase is a mobile e-commerce web application. It provides an intuitive interface for both customers and administrators to manage book borrowing efficiently.",
    image: "/projects/black.png", // Replace with actual image path
    tags: ["React + Vite", "Bootstrap", "Laravel", "Javascript", "REST API"],
    github: "https://github.com/arownz/e-commerce",
    featured: false,
  },
  {
    id: 8,
    title: "Devslog",
    description:
      "Devslog is a forum web application for developers to share their knowledge and experiences. They can post some of their day to day development resources and share their knowledge with others.",
    image: "/projects/logsz.png", // Replace with actual image path
    tags: ["React + Vite", "Tailwind", "XAMPP", "Javascript", "REST API"],
    github: "https://github.com/arownz/devslog",
    featured: false,
  },
  {
    id: 9,
    title: "ExpenzeWize",
    description:
      "Manage your financial expenses with ease. Track your expenses, set budgets, and get insights into your spending habits.",
    image: "/projects/expenses.png", // Replace with actual image path
    tags: ["React + Vite", "MySQL Workbench", "Javascript", "REST API"],
    github: "https://github.com/arownz/Group-1-ETS-Final",
    featured: false,
  },
  {
    id: 10,
    title: "Sales Duo",
    description:
      "The application presents a management system appearance suitable for business use, with modern design patterns, responsive layouts, and an intuitive user experience.",
    image: "/projects/sales_duo.png", // Replace with actual image path
    tags: ["React JS", "Bootstrap", "XAMPP", "REST API"],
    github: "https://github.com/arownz/SalesDuo",
    featured: false,
  },
  {
    id: 11,
    title: "AI Software Dev Roadmap",
    description: "A comprehensive guide to becoming an AI-powered software developer. Master the skills that will define the future of development. (Lovable)",
    image: "/projects/ai_roadmap.png", // Replace with actual image path
    tags: ["AI", "Roadmap", "Software Development", "Future Skills"],
    github: "https://github.com/arownz/aisoftwaredevroad",
    demo: "https://aisoftwaredevroad.lovable.app",
  },
]);
</script>

<template>
  <section id="projects" class="py-24 px-8 bg-s1 max-md:py-16 max-sm:py-12 max-sm:px-4">
    <div class="site-container">
      <h2 class="section-heading fade-in">Featured Projects</h2>
      <p class="section-sub fade-in">
        Projects that showcase my experiences with solo, group, and collaborative development.
      </p>

      <div class="grid grid-cols-1 gap-6 mb-12 md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] md:gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :class="[
            'project-card group rounded-[1.25rem] border-2 border-edge',
            'transition-all duration-400 ease-in-out',
            'hover:-translate-y-3 hover:border-brand hover:shadow-[0_25px_50px_-12px_var(--shadow-lg)]',
            project.featured
              ? 'bg-linear-to-br from-s0 to-[rgba(99,102,241,0.05)]'
              : 'bg-s0',
            index % 2 === 0 ? 'fade-in-left' : 'fade-in-right',
          ]"
        >
          <div
            v-if="project.featured"
            class="project-badge-pulse absolute top-4 right-4 flex items-center gap-1.5 px-4 py-2 bg-linear-to-br from-brand to-brand-2 text-white rounded-full text-sm font-bold z-10 shadow-[0_4px_12px_rgba(99,102,241,0.4)]"
          >
            <span>Featured</span>
          </div>

          <div class="project-image-wrap relative w-full h-[200px] md:h-[250px] overflow-hidden bg-linear-to-br from-[#1e293b] to-[#334155]">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-600 ease-in-out group-hover:scale-110 group-hover:rotate-1"
            />
            <div class="absolute inset-0 bg-[rgba(15,23,42,0.95)] flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-5">
              <div class="flex gap-4 z-10">
                <a
                  v-if="project.github"
                  :href="(project.github as string)"
                  target="_blank"
                  class="btn btn-primary flex items-center gap-2"
                  aria-label="View source code"
                >
                  <Github :size="24" />
                  <span>Code</span>
                </a>
                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  class="btn btn-primary flex items-center gap-2"
                  aria-label="View live demo"
                >
                  <ExternalLink :size="24" />
                  <span>Demo</span>
                </a>
              </div>
            </div>
          </div>

          <div class="p-5 md:p-6 flex-1 flex flex-col">
            <h3 class="text-xl md:text-2xl text-ink mb-3 font-semibold">{{ project.title }}</h3>
            <p class="text-ink-2 leading-relaxed mb-4 flex-1 text-[0.95rem] md:text-base">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Image hover gradient overlay — requires pseudo-element, can't do in Tailwind */
.project-image-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}
.group:hover .project-image-wrap::after {
  opacity: 1;
}
</style>
