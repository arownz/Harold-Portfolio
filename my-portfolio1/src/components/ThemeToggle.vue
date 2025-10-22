<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'

const { currentTheme, toggleTheme } = useTheme()
</script>

<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle"
    :aria-label="`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`"
  >
    <transition name="fade" mode="out-in">
      <Sun v-if="currentTheme === 'dark'" :size="20" key="sun" />
      <Moon v-else :size="20" key="moon" />
    </transition>
  </button>
</template>

<style scoped>
.theme-toggle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 1000;
}

.theme-toggle:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.theme-toggle:active {
  transform: translateY(-1px) scale(0.98);
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
  .theme-toggle {
    width: 48px;
    height: 48px;
    bottom: 1.5rem;
    right: 1.5rem;
  }
}
</style>
