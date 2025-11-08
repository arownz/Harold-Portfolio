<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-vue-next";
import ParticleBackground from "./ParticleBackground.vue";

defineEmits<{
  scrollTo: [section: string];
}>();

const roles = ["An IT Intern", "Aspiring Software Developer"];
const currentRole = ref("");
const roleIndex = ref(0);
const charIndex = ref(0);
const isDeleting = ref(false);
const parallaxY = ref(0);
let typingInterval: number;

const typeRole = () => {
  const currentRoleText = roles[roleIndex.value];
  
  if (!currentRoleText) return;
  
  if (!isDeleting.value) {
    // Typing
    if (charIndex.value < currentRoleText.length) {
      currentRole.value = currentRoleText.substring(0, charIndex.value + 1);
      charIndex.value++;
      typingInterval = setTimeout(typeRole, 50);
    } else {
      // Wait before deleting
      typingInterval = setTimeout(() => {
        isDeleting.value = true;
        typeRole();
      }, 2000);
    }
  } else {
    // Deleting
    if (charIndex.value > 0) {
      charIndex.value--;
      currentRole.value = currentRoleText.substring(0, charIndex.value + 1);
      typingInterval = setTimeout(typeRole, 40);
    } else {
      // Move to next role
      isDeleting.value = false;
      roleIndex.value = (roleIndex.value + 1) % roles.length;
      typingInterval = setTimeout(typeRole, 700);
    }
  }
};

const handleScroll = () => {
  parallaxY.value = window.scrollY * 0.5;
};

onMounted(() => {
  typeRole();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  if (typingInterval) {
    clearTimeout(typingInterval);
  }
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <section id="home" class="hero">
    <ParticleBackground />
    <div class="hero-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>

    <div class="hero-content" :style="{ transform: `translateY(${parallaxY}px)` }">
      <div class="hero-text fade-in">
        <p class="hero-greeting scale-in">Hi, I'm</p>
        <h1 class="hero-name fade-in-left">Harold F. Pasion</h1>
        <h2 class="hero-title fade-in-right">
          <span class="typing-text">{{ currentRole }}</span>
        </h2>
        <p class="hero-description fade-in">An IT student who is curious by nature, driven by purpose who thrives on understanding how systems work, how they're built, and how they can be improved.</p>

        <div class="hero-cta">
          <button
            @click="$emit('scrollTo', 'projects')"
            class="btn btn-primary"
          >
            View My Work
          </button>
          <button
            @click="$emit('scrollTo', 'contact')"
            class="btn btn-secondary"
          >
            Get In Touch
          </button>
        </div>

        <div class="social-links">
          <a href="mailto:pasionharold252002@gmail.com" aria-label="Email">
            <Mail :size="24" />
          </a>
          <a
            href="https://linkedin.com/in/harold-pasion-017a131b8"
            target="_blank"
            aria-label="LinkedIn"
          >
            <Linkedin :size="24" />
          </a>
          <a
            href="https://github.com/arownz"
            target="_blank"
            aria-label="GitHub"
          >
            <Github :size="24" />
          </a>
        </div>
      </div>
    </div>

    <div class="scroll-indicator" @click="$emit('scrollTo', 'about')">
      <ChevronDown :size="32" class="bounce" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 2rem 4rem;
}

.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: var(--primary);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: var(--secondary);
  bottom: -150px;
  right: -150px;
  animation-delay: -7s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: var(--accent);
  top: 50%;
  right: 10%;
  animation-delay: -14s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.9);
  }
}

.hero-content {
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.hero-text {
  max-width: 700px;
}

.hero-greeting {
  font-size: 1.2rem;
  color: var(--primary);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.hero-name {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--primary);
}

.hero-title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.typing-text {
  position: relative;
  display: inline-block;
}

.typing-text::after {
  content: "|";
  position: absolute;
  right: -10px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-muted);
  margin-bottom: 2rem;
  max-width: 600px;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.875rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary);
  transform: translateY(-2px);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--bg-light);
  color: var(--text-secondary);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
}

.social-links a:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-3px);
  border-color: var(--primary);
}

.social-icon {
  width: 24px;
  height: 24px;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.scroll-indicator:hover {
  color: var(--primary);
}

.bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 5rem 1.5rem 3rem;
  }

  .hero-cta {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .social-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 4rem 1rem 2.5rem;
    min-height: 100vh;
  }

  .hero-greeting {
    font-size: 1rem;
  }

  .hero-description {
    font-size: 1rem;
    line-height: 1.7;
  }

  .hero-cta {
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
  }

  .social-links {
    gap: 0.75rem;
  }

  .social-links a {
    width: 44px;
    height: 44px;
  }

  .social-icon {
    width: 22px;
    height: 22px;
  }

  .scroll-indicator {
    bottom: 1.5rem;
  }

  .orb-1,
  .orb-2,
  .orb-3 {
    opacity: 0.2;
  }
}
</style>
