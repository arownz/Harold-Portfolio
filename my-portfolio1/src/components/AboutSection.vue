<script setup lang="ts">
import { ref } from "vue";
import {
  Code2,
  Palette,
  Database,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";

const certifications = ref({
  certiport: [
    {
      title: "IT Specialist - HTML & CSS",
      issuer: "Certiport - Frontend",
      badge: "700 Passing Points",
      image: "/html-css_cert.png",
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
  <section id="about" class="about">
    <div class="container">
      <h2 class="section-title fade-in">About Me</h2>

      <div class="about-intro fade-in">
        <div class="intro-content">
          <div class="about-image">
            <img
              src="/harold_profile.png"
              alt="Harold F. Pasion"
              class="profile-img"
            />
          </div>

          <div class="intro-text">
            <p class="lead">
              I’m an undergraduate pursuing a Bachelor of Science in Information
              Technology at National University – Dasmariñas, specializing in
              Mobile and Web Applications.
            </p>

            <p>
              My technological journey is curiosity — a drive to understand how
              systems work, how they’re developed, and how they can be improved.
              I enjoy exploring various tech stacks not just for breadth, but to
              find the right tools to develop it that serve specific user needs
              and adapt to the fast-changing technology era.
            </p>
            <p>
              In our defended capstone project, I led the functional development
              of
              <strong>"Lexia"</strong>, a gamified learning platform designed
              specifically for children with dyslexia conditions, which taught
              me the importance of user case accessibility-first principles for
              those with special needs.
            </p>

            <p>
              Great software isn’t just functional — it’s empathetic, adaptable,
              and built with purpose.
            </p>
          </div>
        </div>
      </div>

      <div class="about-highlights fade-in">
        <div class="highlight-item">
          <Code2 :size="32" class="highlight-icon" />
          <div>
            <h3>Scalable Code</h3>
            <p>Maintainable code following best practices</p>
          </div>
        </div>

        <div class="highlight-item">
          <Palette :size="32" class="highlight-icon" />
          <div>
            <h3>UI/UX Design</h3>
            <p>Intuitive and functional user experiences</p>
          </div>
        </div>

        <div class="highlight-item">
          <Database :size="32" class="highlight-icon" />
          <div>
            <h3>Full Stack</h3>
            <p>End-to-end development</p>
          </div>
        </div>
      </div>

      <div class="about-timeline fade-in">
        <h3 class="timeline-title">Education Background</h3>

        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-period">2020 - 2022</div>
              <h4>
                Senior High School – Information and Communication Technology
              </h4>
              <p class="timeline-location">
                University of Perpetual Help System Dalta – Molino
              </p>
              <p class="timeline-description">
                Specialized in Information and Communication Technology, builded
                a foundational skill in java and standalone java projects.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-period">2022 - 2026</div>
              <h4>Bachelor of Science in Information Technology</h4>
              <p class="timeline-location">National University – Dasmariñas</p>
              <p class="timeline-description">
                With a specialization in Mobile and Web Applications. Focused on
                full‑stack app development, web development, mobile application
                development, and software engineering principles.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="about-timeline fade-in">
        <h3 class="timeline-title">Work Experience</h3>

        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-period">August 2024 - February 2025</div>
              <h4>Office / Student Assistant</h4>
              <p class="timeline-location">MSQ Business Services, Inc.</p>
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
        </div>
      </div>

      <!-- Enhanced Certifications Section with Carousel -->
      <div class="certifications-section fade-in">
        <h3 class="timeline-title">Certifications & Credentials</h3>
        <p class="cert-subtitle">
          Professional certifications demonstrating technical expertise
        </p>

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
              class="cert-card featured"
            >
              <div class="cert-shine"></div>
              <div class="cert-image-wrapper">
                <img :src="cert.image" :alt="cert.title" class="cert-image" />
              </div>
              <div class="cert-content">
                <h4 class="cert-title">{{ cert.title }}</h4>
                <p class="cert-issuer">{{ cert.issuer }}</p>
                <div class="cert-badge primary">
                  <span>{{ cert.badge }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TESDA Category with Carousel -->
        <div class="cert-category tesda-section">
          <div class="category-header">
            <div class="category-badge tesda">
              <span
                >TESDA - Technical Education and Skills Development
                Authority</span
              >
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
                  transform: `translateX(-${
                    currentTesdaIndex * (100 / tesdaCardsPerView)
                  }%)`,
                }"
              >
                <div
                  v-for="(cert, index) in certifications.tesda"
                  :key="cert.title"
                  class="cert-card carousel-card"
                  :class="{ active: index === currentTesdaIndex }"
                >
                  <div class="cert-shine"></div>
                  <div class="cert-number">{{ index + 1 }}</div>
                  <div class="cert-image-wrapper">
                    <img
                      :src="cert.image"
                      :alt="cert.title"
                      class="cert-image"
                    />
                  </div>
                  <div class="cert-content">
                    <h4 class="cert-title">{{ cert.title }}</h4>
                    <p class="cert-issuer">{{ cert.issuer }}</p>
                    <div class="cert-badge">

                      <span>{{ cert.badge }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              @click="nextTesdaCert"
              class="carousel-btn next"
              :disabled="
                currentTesdaIndex >=
                certifications.tesda.length - tesdaCardsPerView
              "
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
</template>

<style scoped>
.about {
  background: var(--bg-dark);
  padding: 6rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom: 4rem;
  color: var(--primary);
  font-weight: 700;
}

.about-intro {
  margin-bottom: 4rem;
}

.intro-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem;
  align-items: start;
}

.about-image {
  position: relative;
}

.profile-img {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  border: 3px solid var(--primary);
  box-shadow: 0 10px 30px -10px var(--shadow-lg);
  transition: transform 0.3s ease;
}

.profile-img:hover {
  transform: scale(1.05);
}

.intro-text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.lead {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.intro-text p {
  margin-bottom: 1.25rem;
}

.about-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.highlight-item {
  display: flex;
  gap: 1rem;
  align-items: start;
}

.highlight-icon {
  color: var(--primary);
  flex-shrink: 0;
}

.highlight-item h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.highlight-item p {
  color: var(--text-muted);
  margin: 0;
  line-height: 1.6;
}

/* Timeline Styles */
.about-timeline {
  margin-bottom: 4rem;
}

.timeline-title {
  font-size: 1.75rem;
  color: var(--text-primary);
  margin-bottom: 2.5rem;
  text-align: center;
}

.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding-left: 2rem;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--primary), var(--secondary));
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  padding-bottom: 3rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0;
  width: 16px;
  height: 16px;
  background: var(--primary);
  border: 3px solid var(--bg-dark);
  border-radius: 50%;
  box-shadow: 0 0 0 4px var(--primary-light);
  z-index: 1;
}

.timeline-content {
  background: var(--bg-darker);
  padding: 1.75rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  margin-left: 1.5rem;
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateX(8px);
  border-color: var(--primary);
  box-shadow: 0 8px 24px -8px var(--shadow-lg);
}

.timeline-period {
  display: inline-block;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 0.375rem 0.875rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.timeline-content h4 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.timeline-location {
  color: var(--primary);
  font-weight: 500;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.timeline-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  padding-left: 1.5rem;
}

/* Enhanced Certifications Section Styles */
.certifications-section {
  margin-bottom: 2rem;
  margin-top: 3rem;
}

.cert-subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin: -2rem auto 3rem;
  max-width: 600px;
}

.cert-category {
  margin-bottom: 5rem;
  position: relative;
}

.cert-category:last-child {
  margin-bottom: 0;
}

.category-header {
  margin-bottom: 2.5rem;
}

.category-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem 1.75rem;
  border-radius: 3rem;
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1),
    rgba(139, 92, 246, 0.1)
  );
  border: 2px solid var(--primary);
  color: var(--text-primary);
  margin: 0 auto;
  width: fit-content;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.category-badge::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.category-badge.certiport {
  border-color: #f59e0b;
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.1),
    rgba(251, 191, 36, 0.1)
  );
}

.category-badge.tesda {
  border-color: #10b981;
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.1),
    rgba(52, 211, 153, 0.1)
  );
}

.badge-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

/* Featured Certificate (Certiport) */
.featured-cert {
  max-width: 600px;
  margin: 0 auto;
}

.cert-card {
  background: var(--bg-darker);
  border-radius: 1.5rem;
  overflow: hidden;
  border: 2px solid var(--border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.cert-card.featured {
  border: 3px solid #f59e0b;
  box-shadow: 0 20px 60px -10px rgba(245, 158, 11, 0.3);
}

.cert-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 30px 70px -10px var(--shadow-lg);
}

.cert-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s;
  pointer-events: none;
  z-index: 1;
}

.cert-card:hover .cert-shine {
  left: 100%;
}

.cert-image-wrapper {
  position: relative;
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--bg-dark), var(--bg-light));
}

.cert-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 0.75rem;
  transition: transform 0.4s ease;
}

.cert-card:hover .cert-image {
  transform: scale(1.05);
}

.cert-content {
  padding: 1.75rem;
  text-align: center;
}

.cert-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.cert-issuer {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 1.25rem;
  font-weight: 500;
}

.cert-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.5rem;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.95rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.cert-badge.gold {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
}

.badge-star,
.badge-check {
  width: 18px;
  height: 18px;
}

/* Carousel Styles */
.tesda-section {
  margin-top: 4rem;
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 100%;
}

.carousel-wrapper {
  flex: 1;
  overflow: hidden;
  border-radius: 1rem;
  width: 100%;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y pinch-zoom;
}

.carousel-wrapper:active {
  cursor: grabbing;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 1.5rem;
  padding: 0.5rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.carousel-track > * {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.carousel-card {
  flex: 0 0 calc((100% - 3rem) / 3);
  min-width: calc((100% - 3rem) / 3);
  max-width: calc((100% - 3rem) / 3);
}

.cert-number {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.95rem;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.carousel-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bg-dark);
  border: 2px solid var(--border);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  z-index: 10;
}

.carousel-btn:hover:not(:disabled) {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  transform: scale(1.1);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--bg-light);
  border: 2px solid var(--border);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicator:hover {
  background: var(--primary);
  border-color: var(--primary);
}

.indicator.active {
  width: 32px;
  border-radius: 6px;
  background: var(--primary);
  border-color: var(--primary);
}

@media (max-width: 1024px) {
  .carousel-card {
    flex: 0 0 calc((100% - 1.5rem) / 2);
    max-width: calc((100% - 1.5rem) / 2);
  }
}

@media (max-width: 968px) {
  .intro-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-image {
    max-width: 250px;
    margin: 0 auto;
  }

  .about-highlights {
    grid-template-columns: 1fr;
  }

  .timeline {
    padding-left: 1.5rem;
  }

  .timeline-marker {
    left: -1.5rem;
  }

  .category-badge {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }

  .carousel-card {
    flex: 0 0 calc((100% - 1rem) / 2);
    max-width: calc((100% - 1rem) / 2);
    min-width: calc((100% - 1rem) / 2);
  }

  .carousel-track {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .about {
    padding: 4rem 1.5rem;
  }

  .intro-text {
    font-size: 1rem;
  }

  .lead {
    font-size: 1.15rem;
  }

  .highlight-item {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .timeline-content {
    padding: 1.25rem;
  }

  .timeline-content h4 {
    font-size: 1.1rem;
  }

  .cert-subtitle {
    font-size: 1rem;
    margin: -1.5rem auto 2rem;
  }

  .category-badge {
    font-size: 0.95rem;
    padding: 0.65rem 1.25rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .badge-icon {
    width: 20px;
    height: 20px;
  }

  .cert-title {
    font-size: 1.15rem;
  }

  .cert-content {
    padding: 1.25rem;
  }

  .category-badge {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .carousel-card {
    flex: 0 0 calc((100% - 1.5rem) / 2);
    max-width: calc((100% - 1.5rem) / 2);
  }

  .carousel-btn {
    width: 40px;
    height: 40px;
  }

  .carousel-container {
    gap: 0.5rem;
  }
}

@media (max-width: 640px) {
  .carousel-card {
    flex: 0 0 calc(100% - 1rem);
    max-width: calc(100% - 1rem);
  }

  .carousel-track {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .about {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 3rem;
  }

  .intro-content {
    gap: 1.5rem;
  }

  .about-image {
    max-width: 200px;
  }

  .intro-text {
    font-size: 0.95rem;
  }

  .lead {
    font-size: 1.05rem;
  }

  .about-highlights {
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .highlight-icon {
    width: 28px;
    height: 28px;
  }

  .highlight-item h3 {
    font-size: 1.1rem;
  }

  .timeline-title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .timeline {
    padding-left: 1.25rem;
  }

  .timeline-marker {
    left: -1.25rem;
    width: 14px;
    height: 14px;
  }

  .timeline-content {
    padding: 1rem;
    margin-left: 1rem;
  }

  .timeline-content h4 {
    font-size: 1rem;
  }

  .timeline-period {
    font-size: 0.8rem;
    padding: 0.3rem 0.7rem;
  }

  .timeline-description {
    font-size: 0.9rem;
    padding-left: 1rem;
  }

  .cert-subtitle {
    font-size: 0.9rem;
    padding: 0 1rem;
  }

  .category-badge {
    font-size: 0.85rem;
    padding: 0.6rem 1rem;
    text-align: center;
    flex-direction: column;
    gap: 0.5rem;
  }

  .badge-icon {
    width: 18px;
    height: 18px;
  }

  .cert-image-wrapper {
    padding: 1rem;
  }

  .cert-content {
    padding: 1rem;
  }

  .cert-title {
    font-size: 1rem;
  }

  .cert-issuer {
    font-size: 0.9rem;
  }

  .cert-badge {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .cert-number {
    width: 32px;
    height: 32px;
    font-size: 0.85rem;
  }

  .carousel-btn {
    width: 36px;
    height: 36px;
  }

  .carousel-card {
    flex: 0 0 calc(100% - 0.5rem);
    max-width: calc(100% - 0.5rem);
    min-width: calc(100% - 0.5rem);
  }

  .carousel-track {
    gap: 0.5rem;
    padding: 0.25rem;
  }

  .indicator {
    width: 10px;
    height: 10px;
  }

  .indicator.active {
    width: 24px;
  }
}
</style>
