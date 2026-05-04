<script setup lang="ts">
import { ref } from "vue";
import { Menu, X, Download, Sun, Moon } from "lucide-vue-next";
import { useTheme } from "../composables/useTheme";

defineProps<{
  activeSection: string;
  scrollY: number;
}>();

const emit = defineEmits<{
  scrollTo: [section: string];
}>();

const isMobileMenuOpen = ref(false);
const { currentTheme, toggleTheme } = useTheme();

const scrollToSection = (section: string) => {
  emit("scrollTo", section);
  isMobileMenuOpen.value = false;
};

const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/Harold_Resume.pdf";
  link.download = "Harold_Resume.pdf";
  link.click();
};
</script>

<template>
  <Teleport to="body">
    <nav :class="['navbar', { scrolled: scrollY > 50 }]">
      <div class="max-w-300 mx-auto px-8 flex justify-between items-center">
        <div
          class="text-2xl font-bold cursor-pointer transition-transform duration-300 hover:scale-105 select-none"
          @click="scrollToSection('home')"
        >
          Harold<span class="text-brand">.</span>
        </div>

        <ul class="nav-menu hidden md:flex gap-8 list-none items-center">
          <li v-for="item in ['about', 'tech', 'projects', 'contact']" :key="item">
            <a
              @click.prevent="scrollToSection(item)"
              :class="['text-ink-2 font-medium transition-colors duration-300 hover:text-brand relative cursor-pointer', { 'text-brand': activeSection === item }]"
              href="#"
            >
              {{ item.charAt(0).toUpperCase() + item.slice(1) }}
            </a>
          </li>
          <li>
            <button
              @click="downloadResume"
              class="flex items-center gap-2 px-5 py-2.5 bg-linear-to-br from-brand to-brand-2 text-white border-none rounded-lg font-semibold text-[0.95rem] cursor-pointer transition-all duration-300 shadow-[0_2px_8px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)] active:translate-y-0"
            >
              <Download :size="18" />
              Resume
            </button>
          </li>
          <li>
            <button
              @click="toggleTheme"
              class="flex items-center justify-center w-10 h-10 rounded-full bg-s1 text-ink border border-edge cursor-pointer transition-all duration-300 p-0 outline-none select-none hover:bg-brand hover:text-white hover:border-brand hover:scale-105 active:scale-95"
              :aria-label="`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`"
            >
              <transition name="fade" mode="out-in">
                <Sun v-if="currentTheme === 'dark'" :size="20" key="sun" />
                <Moon v-else :size="20" key="moon" />
              </transition>
            </button>
          </li>
        </ul>

        <div class="flex items-center gap-4 md:hidden">
          <button
            @click="toggleTheme"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-s1 text-ink border border-edge cursor-pointer transition-all duration-300 p-0 outline-none select-none hover:bg-brand hover:text-white hover:border-brand"
            :aria-label="`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`"
          >
            <transition name="fade" mode="out-in">
              <Sun v-if="currentTheme === 'dark'" :size="20" key="sun" />
              <Moon v-else :size="20" key="moon" />
            </transition>
          </button>
          <button
            class="bg-transparent border-none text-ink cursor-pointer p-2 outline-none select-none"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <Menu v-if="!isMobileMenuOpen" :size="24" />
            <X v-else :size="24" />
          </button>
        </div>
      </div>

      <div :class="['mobile-menu', { open: isMobileMenuOpen }]">
        <ul class="list-none px-8">
          <li
            v-for="item in ['about', 'tech', 'projects', 'contact']"
            :key="item"
            class="my-4"
          >
            <a
              @click.prevent="scrollToSection(item)"
              class="text-ink-2 text-[1.1rem] font-medium block py-2 transition-colors duration-300 hover:text-brand"
              href="#"
            >
              {{ item.charAt(0).toUpperCase() + item.slice(1) }}
            </a>
          </li>
          <li class="my-4">
            <button
              @click="downloadResume"
              class="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-linear-to-br from-brand to-brand-2 text-white border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            >
              <Download :size="18" />
              Download Resume
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from { opacity: 0; transform: rotate(-90deg) scale(0.8); }
.fade-leave-to   { opacity: 0; transform: rotate(90deg) scale(0.8); }
</style>
