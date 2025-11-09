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
  link.download = "Harold_Pasion_Resume.pdf";
  link.click();
};
</script>

<template>
  <Teleport to="body">
    <nav :class="['navbar', { scrolled: scrollY > 50 }]">
      <div class="nav-container">
        <div class="nav-logo" @click="scrollToSection('home')">
          <span class="logo-text">Harold<span class="accent">.</span></span>
        </div>

        <ul class="nav-menu desktop-menu">
          <li
            v-for="item in ['about', 'tech', 'projects', 'contact']"
            :key="item"
          >
            <a
              @click.prevent="scrollToSection(item)"
              :class="{ active: activeSection === item }"
              href="#"
            >
              {{ item.charAt(0).toUpperCase() + item.slice(1) }}
            </a>
          </li>
          <li>
            <button @click="downloadResume" class="resume-btn">
              <Download :size="18" />
              Resume
            </button>
          </li>
          <li>
            <button
              @click="toggleTheme"
              class="theme-toggle-btn"
              :aria-label="`Switch to ${
                currentTheme === 'dark' ? 'light' : 'dark'
              } mode`"
            >
              <transition name="fade" mode="out-in">
                <Sun v-if="currentTheme === 'dark'" :size="20" key="sun" />
                <Moon v-else :size="20" key="moon" />
              </transition>
            </button>
          </li>
        </ul>

        <div class="nav-actions">
          <button
            @click="toggleTheme"
            class="theme-toggle-btn mobile-theme-toggle"
            :aria-label="`Switch to ${
              currentTheme === 'dark' ? 'light' : 'dark'
            } mode`"
          >
            <transition name="fade" mode="out-in">
              <Sun v-if="currentTheme === 'dark'" :size="20" key="sun" />
              <Moon v-else :size="20" key="moon" />
            </transition>
          </button>

          <button
            class="mobile-menu-btn"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <Menu v-if="!isMobileMenuOpen" :size="24" />
            <X v-else :size="24" />
          </button>
        </div>
      </div>

      <div :class="['mobile-menu', { open: isMobileMenuOpen }]">
        <ul>
          <li
            v-for="item in ['about', 'tech', 'projects', 'contact']"
            :key="item"
          >
            <a @click.prevent="scrollToSection(item)" href="#">
              {{ item.charAt(0).toUpperCase() + item.slice(1) }}
            </a>
          </li>
          <li>
            <button @click="downloadResume" class="resume-btn mobile">
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
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 0;
  transition: all 0.3s ease;
  background: transparent;
}

.navbar.scrolled {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  box-shadow: 0 4px 6px -1px var(--shadow);
  border-bottom: 1px solid var(--border);
}

[data-theme="light"] .navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.3s ease;
  user-select: none;
}

.nav-logo:hover {
  transform: scale(1.05);
}

.logo-text .accent {
  color: var(--primary);
}

.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-menu a {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
  position: relative;
}

.nav-menu a::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: width 0.3s ease;
}

.nav-menu a:hover,
.nav-menu a.active {
  color: var(--primary);
}

.nav-menu a.active::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-dark);
  color: var(--text-primary);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.theme-toggle-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  transform: scale(1.05);
}

.theme-toggle-btn:active {
  transform: scale(0.95);
}

.theme-toggle-btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.mobile-theme-toggle {
  display: none;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.mobile-menu-btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(10px);
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  border-bottom: 1px solid var(--border);
}

[data-theme="light"] .mobile-menu {
  background: rgba(255, 255, 255, 0.98);
}

.mobile-menu.open {
  max-height: 400px;
  padding: 1rem 0;
}

.mobile-menu ul {
  list-style: none;
  padding: 0 2rem;
}

.mobile-menu li {
  margin: 1rem 0;
}

.mobile-menu a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  display: block;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.mobile-menu a:hover {
  color: var(--primary);
}

.resume-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.resume-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.resume-btn:active {
  transform: translateY(0);
}

.resume-btn:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

.resume-btn.mobile {
  width: 100%;
  justify-content: center;
  margin-top: 0.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.fade-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}

@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .mobile-theme-toggle {
    display: flex;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    display: block;
  }

  .nav-container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 1rem;
  }

  .nav-logo {
    font-size: 1.25rem;
  }

  .theme-toggle-btn {
    width: 36px;
    height: 36px;
  }

  .mobile-menu ul {
    padding: 0 1rem;
  }

  .mobile-menu a {
    font-size: 1rem;
  }
}
</style>
