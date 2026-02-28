<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const scrollProgress = ref(0);

const updateScrollProgress = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  const scrollableHeight = documentHeight - windowHeight;

  scrollProgress.value = (scrollTop / scrollableHeight) * 100;
};

onMounted(() => {
  window.addEventListener("scroll", updateScrollProgress);
  updateScrollProgress();
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollProgress);
});
</script>

<template>
  <div class="fixed top-0 left-0 right-0 h-[3px] bg-s2 z-9999">
    <div
      class="h-full bg-linear-to-r from-brand to-brand-2 transition-[width] duration-100 ease-linear"
      :style="{ width: `${scrollProgress}%` }"
    />
  </div>
</template>
