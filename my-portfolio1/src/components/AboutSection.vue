<script setup lang="ts">
import CodedBackground from './CodedBackground.vue'
import { ref } from "vue";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-vue-next";
import CertModal from "./CertModal.vue";

const certifications = ref({
  certiport: [
    {
      title: "IT Specialist - HTML & CSS",
      issuer: "Information Technology Specialist",
      badge: "700 Passing Points",
      image: "/html-css_cert.png",
      color: "primary",
    },
    {
      title: "PMI - Project Management Ready®",
      issuer: "Project Management Institute",
      badge: "Self-Paced Completed",
      image: "/certiport_pm.png",
      color: "primary",
    },
  ],
  tesda: [
    {
      title: "Install and Configure Computer Systems",
      issuer: "TESDA - ICCS",
      badge: "Self-Paced Completed",
      image: "/installconfig_cert.png",
    },
    {
      title: "Maintain Computer Systems and Networks",
      issuer: "TESDA - MCSN",
      badge: "Self-Paced Completed",
      image: "/maintcompsysnet_cert.png",
    },
    {
      title: "Set-up Computer Networks",
      issuer: "TESDA - SCN",
      badge: "Self-Paced Completed",
      image: "/setupcompnet_cert.png",
    },
    {
      title: "Set-up Computer Servers",
      issuer: "TESDA - SCS",
      badge: "Self-Paced Completed",
      image: "/setupcompserv_cert.png",
    },
    {
      title: "Introduction to Cascading Style Sheets",
      issuer: "TESDA - ICSS",
      badge: "Self-Paced Completed",
      image: "/introtocss_cert.png",
    },
  ],
});

// Cert modal state
const selectedCert = ref<{ image: string; title: string; issuer: string } | null>(null);
const openModal = (cert: { image: string; title: string; issuer: string }) => {
  selectedCert.value = cert;
};
const closeModal = () => {
  selectedCert.value = null;
};

const currentTesdaIndex = ref(0);
const tesdaCardsPerView = ref(3);
const carouselWrapper = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

const nextTesdaCert = () => {
  if (
    currentTesdaIndex.value <
    certifications.value.tesda.length - tesdaCardsPerView.value
  ) {
    currentTesdaIndex.value++;
  }
};

const prevTesdaCert = () => {
  if (currentTesdaIndex.value > 0) {
    currentTesdaIndex.value--;
  }
};

// Touch and mouse drag handlers
const handleDragStart = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  const clientX =
    "touches" in e
      ? e.touches && e.touches[0]
        ? e.touches[0].clientX
        : 0
      : e.clientX;
  startX.value = clientX;
  if (carouselWrapper.value) {
    scrollLeft.value = currentTesdaIndex.value;
  }
};

const handleDragMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  e.preventDefault();

  const clientX =
    "touches" in e
      ? e.touches && e.touches[0]
        ? e.touches[0].clientX
        : startX.value
      : e.clientX;
  const diff = startX.value - clientX;
  const threshold = 50; // Minimum swipe distance

  if (Math.abs(diff) > threshold) {
    if (
      diff > 0 &&
      currentTesdaIndex.value <
        certifications.value.tesda.length - tesdaCardsPerView.value
    ) {
      nextTesdaCert();
      isDragging.value = false;
    } else if (diff < 0 && currentTesdaIndex.value > 0) {
      prevTesdaCert();
      isDragging.value = false;
    }
  }
};

const handleDragEnd = () => {
  isDragging.value = false;
};

// Update cards per view on window resize
if (typeof window !== "undefined") {
  const updateCardsPerView = () => {
    if (window.innerWidth < 640) {
      tesdaCardsPerView.value = 1;
    } else if (window.innerWidth < 1024) {
      tesdaCardsPerView.value = 2;
    } else {
      tesdaCardsPerView.value = 3;
    }
  };

  updateCardsPerView();
  window.addEventListener("resize", updateCardsPerView);
}
</script>

<template>
  <section id="about" class="py-24 px-8 bg-s1 max-md:py-16 max-sm:py-12 max-sm:px-4 relative overflow-hidden">
    <CodedBackground />
    <div class="site-container relative z-10">
      <h2 class="section-heading fade-in">About Me</h2>

      <!-- Intro -->
      <div class="mb-16 fade-in">
        <div class="grid grid-cols-1 gap-8 items-start md:grid-cols-[280px_1fr] md:gap-12">
          <div class="relative max-w-50 mx-auto md:max-w-none md:mx-0">
            <img
              src="/meself2.jpg"
              alt="Harold F. Pasion"
              class="w-full h-auto rounded-2xl border-[3px] border-brand shadow-[0_10px_30px_-10px_var(--shadow-lg)] transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div class="text-[1.05rem] leading-[1.8] text-ink-2">
            <p class="text-[1.25rem] font-semibold text-ink mb-6 leading-[1.6]">
              A developer rooted in Information Technology, specializing in Mobile and Web Applications.
              Committed to continuous growth for impactful solutions.
            </p>

            <p class="mb-5">
              My development journey is driven by curiosity to understand how systems work, how
              they’re built, and where they can be improved. I explore a wide range of tech stacks not just
              for breadth, but to find the right tool for each unique challenge, adapting to an ever-evolving
              technology landscape.
            </p>
          </div>
        </div>
      </div>

      <!-- Education Timeline -->
      <div class="mb-16 fade-in">
        <h3 class="timeline-title">Education Background</h3>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <a
                href="https://www.linkedin.com/school/university-of-perpetual-help-system-dalta/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                class="company-logo"
              >
                <img src="/OIP (1).webp" alt="University of Perpetual Help System Dalta" />
              </a>
              <div class="timeline-period">2017 - 2022</div>
              <h4>Junior to Senior High School – Information and Communication Technology</h4>
              <p class="timeline-location">University of Perpetual Help System Dalta – Molino</p>
              <p class="timeline-description">
                Specialized in Information and Communication Technology, building a strong foundation
                in Java and standalone desktop application development.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <a
                href="https://www.linkedin.com/company/nationaluph/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                class="company-logo"
              >
                <img src="/OIP (2).webp" alt="National University" />
              </a>
              <div class="timeline-period">2022 - 2026</div>
              <h4>Bachelor of Science in Information Technology</h4>
              <p class="timeline-location">National University – Dasmariñas, Cavite, Philippines</p>
              <p class="timeline-description">
                Specializing in Mobile and Web Applications, with a focus on full-stack development,
                software engineering principles, and building real-world projects across web and mobile platforms.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Work Experience Timeline -->
      <div class="mb-16 fade-in">
        <h3 class="timeline-title">Work Experience</h3>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <a
                href="https://www.linkedin.com/company/msq-business-services-inc/"
                target="_blank"
                rel="noopener noreferrer"
                class="company-logo"
              >
                <img src="/msq_logo.jpg" alt="MSQ Business Services, Inc." />
              </a>
              <div class="timeline-period">August 2024 - February 2025</div>
              <h4>Office / Student Assistant</h4>
              <p class="timeline-location">MSQ Business Services, Inc. · Bacoor, Cavite, Philippines</p>
              <ul class="timeline-description">
                <li>
                  Handled accurate data encoding and digital record management
                  using Microsoft Excel and Google Workspace, ensuring organized
                  and retrievable records.
                </li>
                <li>
                  Assisted with IT troubleshooting, including Windows OS issues,
                  printer and peripheral setup, and basic software
                  installation/configuration.
                </li>
                <li>
                  Supported compliance workflows and documentation standards,
                  contributing to smoother audit preparation.
                </li>
              </ul>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <a
                href="https://www.linkedin.com/company/endsofttech/"
                target="_blank"
                rel="noopener noreferrer"
                class="company-logo"
              >
                <img src="/endsofttech_logo.jpg" alt="Endsofttech Web Solutions" />
              </a>
              <div class="timeline-period">November 2025 - April 2026</div>
              <h4>Full-Stack Developer and Quality Assurance Intern</h4>
              <p class="timeline-location">
                Endsofttech Web Solutions · Las Piñas, National Capital Region, Philippines
              </p>
              <ul class="timeline-description">
                <li>
                  Contributing to enhancements for client-facing software,
                  including veterinary management systems, focused on improving
                  usability, accessibility, and performance.
                </li>
                <li>
                  Collaborating with the development team to deliver optimized
                  solutions while learning the foundation of collaboration and
                  object-oriented programming principles.
                </li>
                <li>
                  Handling projects such as the Vet Assist App, involving
                  debugging production web applications, web app designing,
                  quality assurance, and testing.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Certifications Section -->
      <div class="certifications-section fade-in">
        <h3 class="timeline-title">Certifications &amp; Credentials</h3>
        <p class="cert-subtitle">Certifications demonstrating technical expertises</p>

        <!-- Certiport Category -->
        <div class="cert-category">
          <div class="category-header">
            <div class="category-badge certiport">
              <span>Certiport - A Pearson Vue Business</span>
            </div>
          </div>

          <div class="featured-cert scale-in">
            <div
              v-for="cert in certifications.certiport"
              :key="cert.title"
              class="cert-card featured cursor-pointer"
              @click="openModal(cert)"
            >
              <div class="cert-shine"></div>
              <div class="cert-image-wrapper">
                <img :src="cert.image" :alt="cert.title" class="cert-image" />
                <div class="cert-view-hint">
                  <Maximize2 :size="22" />
                  <span>Full View</span>
                </div>
              </div>
              <div class="cert-content">
                <h4 class="cert-title">{{ cert.title }}</h4>
                <p class="cert-issuer">{{ cert.issuer }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- TESDA Category with Carousel -->
        <div class="cert-category tesda-section">
          <div class="category-header">
            <div class="category-badge tesda">
              <span>TESDA - Technical Education and Skills Development Authority</span>
            </div>
          </div>

          <div class="carousel-container">
            <button
              @click="prevTesdaCert"
              class="carousel-btn prev"
              :disabled="currentTesdaIndex === 0"
              aria-label="Previous certification"
            >
              <ChevronLeft :size="24" />
            </button> 

            <div
              class="carousel-wrapper"
              ref="carouselWrapper"
              @mousedown="handleDragStart"
              @mousemove="handleDragMove"
              @mouseup="handleDragEnd"
              @mouseleave="handleDragEnd"
              @touchstart="handleDragStart"
              @touchmove="handleDragMove"
              @touchend="handleDragEnd"
            >
              <div
                class="carousel-track"
                :style="{
                  transform: `translateX(-${currentTesdaIndex * (100 / tesdaCardsPerView)}%)`,
                }"
              >
                <div
                  v-for="(cert, index) in certifications.tesda"
                  :key="cert.title"
                  class="cert-card carousel-card cursor-pointer"
                  :class="{ active: index === currentTesdaIndex }"
                  @click="openModal(cert)"
                >
                  <div class="cert-shine"></div>
                  <div class="cert-number">{{ index + 1 }}</div>
                  <div class="cert-image-wrapper">
                    <img :src="cert.image" :alt="cert.title" class="cert-image" />
                    <div class="cert-view-hint">
                      <Maximize2 :size="20" />
                      <span>Full View</span>
                    </div>
                  </div>
                  <div class="cert-content">
                    <h4 class="cert-title">{{ cert.title }}</h4>
                    <p class="cert-issuer">{{ cert.issuer }}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              @click="nextTesdaCert"
              class="carousel-btn next"
              :disabled="currentTesdaIndex >= certifications.tesda.length - tesdaCardsPerView"
              aria-label="Next certification"
            >
              <ChevronRight :size="24" />
            </button>
          </div>

          <div class="carousel-indicators">
            <button
              v-for="(_cert, index) in certifications.tesda"
              :key="index"
              @click="currentTesdaIndex = index"
              :class="['indicator', { active: index === currentTesdaIndex }]"
              :aria-label="`Go to certification ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <CertModal
    v-if="selectedCert"
    :image="selectedCert.image"
    :title="selectedCert.title"
    :issuer="selectedCert.issuer"
    @close="closeModal"
  />
</template>
