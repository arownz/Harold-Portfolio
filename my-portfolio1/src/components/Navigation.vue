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
      <div class="max-w-300 mx-auto px-8 flex justify-between items-center py-4">
        <div
          class="hover:text-brand text-2xl font-bold cursor-pointer transition-transform duration-300 hover:scale-105 select-none"
          @click="scrollToSection('home')"
        >
          Harold<span class="text-brand">.</span>
        </div>

        <ul class="nav-menu hidden md:flex gap-6 list-none items-center">
          <li v-for="item in ['about', 'tech', 'projects', 'contact']" :key="item">
            <a
              @click.prevent="scrollToSection(item)"
              :class="['nav-link', activeSection === item && 'active']"
              href="#"
            >
              {{ item.charAt(0).toUpperCase() + item.slice(1) }}
            </a>
          </li>
          <div class="h-6 w-px bg-edge-2 opacity-50"></div>
          <li>
            <button
              @click="downloadResume"
              class="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg font-semibold text-sm cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(158,29,76,0.4)] active:translate-y-0"
            >
              <Download :size="16" />
              Resume
            </button>
          </li>
          <li>
            <button
              @click="toggleTheme"
              class="flex items-center justify-center w-9 h-9 rounded-full bg-s2 text-ink border border-edge transition-all duration-300 hover:bg-brand hover:text-white hover:border-brand active:scale-95"
              :aria-label="`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`"
            >
              <transition name="fade" mode="out-in">
                <Sun v-if="currentTheme === 'dark'" :size="18" key="sun" />
                <Moon v-else :size="18" key="moon" />
              </transition>
            </button>
          </li>
        </ul>

        <div class="flex items-center gap-3 md:hidden">
          <button
            @click="toggleTheme"
            class="flex items-center justify-center w-9 h-9 rounded-full bg-s2 text-ink border border-edge transition-all duration-300 hover:bg-brand hover:text-white hover:border-brand"
            :aria-label="`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`"
          >
            <transition name="fade" mode="out-in">
              <Sun v-if="currentTheme === 'dark'" :size="18" key="sun" />
              <Moon v-else :size="18" key="moon" />
            </transition>
          </button>
          <button class="bg-transparent border-none text-ink cursor-pointer p-1 outline-none select-none" @click="isMobileMenuOpen = !isMobileMenuOpen">
            <Menu v-if="!isMobileMenuOpen" :size="24" />
            <X v-else :size="24" />
          </button>
        </div>
      </div>

      <div :class="['mobile-menu', { open: isMobileMenuOpen }]">
        <ul class="list-none px-8 py-4 space-y-2">
          <li v-for="item in ['about', 'tech', 'projects', 'contact']" :key="item">
            <a
              @click.prevent="scrollToSection(item)"
              class="text-ink-2 font-medium block px-3 py-2 rounded-lg transition-colors duration-300 hover:text-brand hover:bg-s1"
              href="#"
            >
              {{ item.charAt(0).toUpperCase() + item.slice(1) }}
            </a>
          </li>
          <li class="my-3 border-t border-edge-2"></li>
          <li>
            <button
              @click="downloadResume"
              class="flex items-center justify-center gap-2 w-full px-4 py-2 bg-brand text-white rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:shadow-[0_4px_12px_rgba(158,29,76,0.4)]"
            >
              <Download :size="16" />
              Resume
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}
.fade-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}
</style>
