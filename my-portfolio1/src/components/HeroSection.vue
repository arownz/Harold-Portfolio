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
  <section id="home" class="min-h-screen flex items-center justify-center relative overflow-hidden py-24 px-8 md:py-20 md:px-6 sm:py-16 sm:px-4">
    <ParticleBackground />

    <!-- Gradient orbs (styled via global @layer) -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>

    <div class="max-w-[1200px] w-full relative z-10">
      <div class="max-w-[700px]">
        <p class="text-[1.2rem] text-brand font-medium mb-2 scale-in">Hi, I'm</p>
        <h1 class="text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold mb-4 text-brand leading-tight fade-in-left">
          Harold F. Pasion
        </h1>
        <h2 class="text-[clamp(1.5rem,4vw,2.5rem)] text-ink-2 mb-6 font-semibold fade-in-right">
          <span class="typing-cursor relative inline-block">{{ currentRole }}</span>
        </h2>
        <p class="text-[1.1rem] leading-[1.8] text-ink-3 mb-8 max-w-[600px] fade-in">
          An IT student who is curious by nature, driven by purpose who thrives on understanding how systems work, how they're built, and how they can be improved.
        </p>

        <div class="flex flex-col gap-4 mb-8 md:flex-row md:flex-wrap">
          <button @click="$emit('scrollTo', 'projects')" class="btn btn-primary text-[1rem] w-full md:w-auto">
            View My Work
          </button>
          <button @click="$emit('scrollTo', 'contact')" class="btn btn-secondary text-[1rem] w-full md:w-auto">
            Get In Touch
          </button>
        </div>

        <div class="flex gap-4 flex-wrap">
          <a
            href="mailto:pasionharold252002@gmail.com"
            aria-label="Email"
            class="w-12 h-12 flex items-center justify-center rounded-full bg-s2 text-ink-2 transition-all duration-300 border border-edge hover:bg-brand hover:text-white hover:-translate-y-0.5 hover:border-brand"
          >
            <Mail :size="24" />
          </a>
          <a
            href="https://linkedin.com/in/harold-pasion-017a131b8"
            target="_blank"
            aria-label="LinkedIn"
            class="w-12 h-12 flex items-center justify-center rounded-full bg-s2 text-ink-2 transition-all duration-300 border border-edge hover:bg-brand hover:text-white hover:-translate-y-0.5 hover:border-brand"
          >
            <Linkedin :size="24" />
          </a>
          <a
            href="https://github.com/arownz"
            target="_blank"
            aria-label="GitHub"
            class="w-12 h-12 flex items-center justify-center rounded-full bg-s2 text-ink-2 transition-all duration-300 border border-edge hover:bg-brand hover:text-white hover:-translate-y-0.5 hover:border-brand"
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
/* Typing cursor (pseudo-element can't be done in Tailwind) */
.typing-cursor::after {
  content: "|";
  position: absolute;
  right: -10px;
  animation: typing-cursor 1s infinite;
  color: var(--primary);
}
</style>
