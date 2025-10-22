import { onMounted, onUnmounted } from 'vue';

export function useScrollAnimation() {
  let observer: IntersectionObserver | null = null;

  const initScrollAnimation = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    // Observe all elements with fade-in class
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer?.observe(el));
  };

  onMounted(() => {
    initScrollAnimation();
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return {
    initScrollAnimation,
  };
}
