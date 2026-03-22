<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ChevronUp } from 'lucide-vue-next';

const isVisible = ref(false);

const checkScroll = () => {
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  checkScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <Teleport to="body">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="back-to-top-btn fixed! bottom-8 right-8 z-9999!
             w-14 h-14
             rounded-full
             bg-linear-to-br from-brand to-brand-2
             text-white border-none cursor-pointer
             flex items-center justify-center
             shadow-[0_8px_24px_rgba(158,29,76,0.45)]
             transition-all duration-300 ease-in-out
             hover:-translate-y-[5px] hover:scale-105 hover:shadow-[0_12px_32px_rgba(158,29,76,0.55)]
             active:-translate-y-0.5 active:scale-[1.02]
             md:bottom-6 md:right-6 md:w-12 md:h-12
             sm:bottom-4 sm:right-4 sm:w-11 sm:h-11"
      aria-label="Back to top"
    >
      <ChevronUp :size="24" />
    </button>
  </Teleport>
</template>
