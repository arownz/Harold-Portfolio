<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Github, Linkedin, Mail, ChevronDown, Facebook } from "lucide-vue-next";
import ParticleBackground from "./ParticleBackground.vue";

defineEmits<{
  scrollTo: [section: string];
}>();

const roles = ["IT Intern", "Aspiring Software Developer"];
const currentRole = ref("");
const roleIndex = ref(0);
const charIndex = ref(0);
const isDeleting = ref(false);
let typingInterval: number;

const typeRole = () => {
  const currentRoleText = roles[roleIndex.value];
  
  if (!currentRoleText) return;
  
  if (!isDeleting.value) {
    // Typing
    if (charIndex.value < currentRoleText.length) {
      currentRole.value = currentRoleText.substring(0, charIndex.value + 1);
      charIndex.value++;
      typingInterval = setTimeout(typeRole, 100);
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
      typingInterval = setTimeout(typeRole, 50);
    } else {
      // Move to next role
      isDeleting.value = false;
      roleIndex.value = (roleIndex.value + 1) % roles.length;
      typingInterval = setTimeout(typeRole, 500);
    }
  }
};

onMounted(() => {
  typeRole();
});

onUnmounted(() => {
  if (typingInterval) {
    clearTimeout(typingInterval);
  }
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

    <div class="hero-content">
      <div class="hero-text fade-in">
        <p class="hero-greeting">Hi, I'm</p>
        <h1 class="hero-name">Harold F. Pasion</h1>
        <h2 class="hero-title">
          <span class="typing-text">{{ currentRole }}</span>
        </h2>
        <p class="hero-description">
          IT student passionate about creating functionable, user-friendly
          softwares. Specialized in building experiences using modern
          solutions.
        </p>

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
          <a
            href="https://web.facebook.com/haroldfortunpasion/"
            target="_blank"
            aria-label="Facebook"
          >
            <Facebook :size="24" />
          </a>
          <a href="https://x.com/omskrp" target="_blank" aria-label="Twitter/X">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="social-icon"
            >
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </a>
          <a
            href="https://stackoverflow.com/users/19126644/arownz"
            target="_blank"
            aria-label="StackOverflow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="social-icon"
            >
              <path
                d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.093-10.473-2.201zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154Z"
              />
            </svg>
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
}
</style>
