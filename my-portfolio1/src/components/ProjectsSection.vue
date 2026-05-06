<script setup lang="ts">
import CodedBackground from './CodedBackground.vue'
import { ref } from "vue";
import { Github, ExternalLink } from "lucide-vue-next";

// Easily scalable project structure
const projects = ref([
   {
    id: 1,
    title: "Endsofttech Web Solutions - Company Website",
    description:
      "A modern company website for Endsofttech Web Solutions, showcasing their services and portfolio. Implemented responsive design and optimized for performance. Contributed to web design, development, and deployment to enhance online presence and attract potential clients.",
    image: "projects/endsoftt.webp", // Replace with actual image path
    tags: [
      "Web Development",
      "UI/UX Design",
      "Responsive Design",
      "Performance Optimization",
    ],
    github: false,
    demo: "https://endsofttech.com/",
    featured: true,
  },
  {
    id: 2,
    title: "Vet Assist App - Veterinary Management System",
    description:
      "A structured veterinary management system for client-facing operations. Contributed to production web app enhancements, debugging, web app designing, and quality assurance to improve usability and performance.",
    image: "projects/vetassist.webp", // Replace with actual image path
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
    id: 3,
    title: "Vet Assist Web - Landing Website",
    description:
      "A landing website for Vet Assist, a veterinary management system. Designed to attract potential clients and provide information and demo request about the product. Contributed to web design, development, and deployment to enhance online presence and drive demo requests.",
    image: "projects/vetassist_web.webp",
    tags: [
      "Web Development",
      "UI/UX Design",
      "Landing Page",
      "Veterinary Software",
    ],
    github: false,
    demo: "https://staging.vetassist.app/",
    featured: true,
  },
  {
    id: 4,
    title: "Lexia - Dyslexia Learning Platform (Capstone)",
    description:
      "A gamified learning platform for children with dyslexia, built using accessibility-first mechanics in Godot Engine. (OCR-based whiteboard handwritten processing feature was disabled due to Google Cloud billing cancellation.)",
    image: "projects/lexia.webp", // Replace with actual image path
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
    id: 5,
    title: "Super Admin Lexia (Capstone)",
    description:
      "A super admin management system for a mobile platform serving parents and professionals. Assisted as a web developer and QA in production enhancements, debugging, design, and testing to strengthen centralized control and usability.",
    image: "projects/super_admin.webp", // Replace with actual image path
    tags: ["React + Vite", "Bootstrap", "Javascript", "Firebase", "REST API"],
    github: "https://github.com/arownz/admin_panel",
    demo: "https://gamedevcapz-admin.web.app/login",
    featured: true,
  },
   {
    id: 6,
    title: "Resumay Tailor Swift",
    description:
      "An AI-powered resume builder web application that helps users modify their resumes quickly and easily using customizable templates and real-time suggestions.",
    image: "/projects/tailorz.webp",
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
    id: 7,
    title: "Cashier Point of Sale System",
    description:
      "A Standalone Point of Sale System (POS) for cashier to manage their menu sales transactions.",
    image: "/projects/POS_System.webp", // Replace with actual image path
    tags: ["Netbeans", "Java GUI"],
    github: "https://github.com/arownz/Cashier-POS-java",
    featured: false,
  },
  {
    id: 12,
    title: "CodeLens",
    description:
      "An AI powered code analysis with suggestion for improvments in the code snippet. This simplifies the process of code review and helps developers to improve their code quality.",
    image: "/projects/CodeAnalysis.webp", // Replace with actual image path
    tags: ["Base44", "Tailwind CSS", "JavaScript", "Web Development"],
    github: false,
    demo: "https://stimulating-code-lens-flow.base44.app",
  }
]);
</script>

<template>
  <section id="projects" class="py-24 px-8 bg-s1 max-md:py-16 max-sm:py-12 max-sm:px-4 relative overflow-hidden">
    <CodedBackground />
    <div class="site-container relative z-10">
      <h2 class="section-heading fade-in">Featured projects</h2>
      <p class="section-sub fade-in">x
        A collection of work spanning solo projects, team collaborations, and internship contributions — each one a step forward as a developer.
      </p>

      <!-- Premium asymmetric grid layout -->
      <div class="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 md:gap-8 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.3fr_1fr]" style="grid-auto-rows: auto; grid-auto-flow: dense;">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :class="[
            'project-card group rounded-[1.25rem] border-2 border-edge overflow-hidden',
            'transition-all duration-400 ease-in-out',
            'hover:-translate-y-3 hover:border-brand hover:shadow-[0_25px_50px_-12px_var(--shadow-lg)]',
            project.featured
              ? 'bg-s0 md:col-span-1 lg:row-span-1'
              : 'bg-s0 md:col-span-1',
            index % 3 === 0 && project.featured ? 'md:col-span-2 lg:col-span-1' : '',
            index % 2 === 0 ? 'fade-in-left' : 'fade-in-right',
          ]"
        >
          <div
            v-if="project.featured"
            class="project-badge-pulse absolute top-4 right-4 flex items-center gap-1.5 px-4 py-2 bg-linear-to-br from-brand to-brand-2 text-white rounded-full text-sm font-bold z-10 shadow-[0_4px_12px_rgba(158,29,76,0.45)]"
          >
            <span>Featured</span>
          </div>

          <div class="project-image-wrap relative w-full h-50 md:h-62.5 overflow-hidden bg-linear-to-br from-[#1e293b] to-[#334155]">
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
