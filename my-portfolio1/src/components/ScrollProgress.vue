<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const scrollProgress = ref(0);

const updateScrollProgress = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  const scrollableHeight = documentHeight - windowHeight;
  
  scrollProgress.value = (scrollTop / scrollableHeight) * 100;
};

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress);
});
</script>

<template>
  <div class="scroll-progress-container">
    <div 
      class="scroll-progress-bar" 
      :style="{ width: `${scrollProgress}%` }"
    ></div>
  </div>
</template>

<style scoped>
.scroll-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--bg-light);
  z-index: 9999;
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transition: width 0.1s ease;
}
</style>
