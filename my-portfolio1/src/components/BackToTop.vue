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
      class="back-to-top"
      aria-label="Back to top"
    >
      <ChevronUp :size="24" />
    </button>
  </Teleport>
</template>

<style scoped>
.back-to-top {
  position: fixed !important;
  bottom: 2rem !important;
  right: 2rem !important;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 9999 !important;
  animation: fadeInUp 0.3s ease;
  pointer-events: auto;
}

.back-to-top:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.6);
}

.back-to-top:active {
  transform: translateY(-2px) scale(1.02);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 1.5rem !important;
    right: 1.5rem !important;
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 480px) {
  .back-to-top {
    bottom: 1rem !important;
    right: 1rem !important;
    width: 44px;
    height: 44px;
  }
}
</style>
