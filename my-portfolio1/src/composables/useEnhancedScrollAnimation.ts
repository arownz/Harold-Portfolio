import { onMounted, onUnmounted } from "vue";

export function useEnhancedScrollAnimation() {
  let observer: IntersectionObserver | null = null;

  const initScrollAnimation = () => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px 0px -100px 0px", // Trigger animation earlier
      threshold: [0, 0.1, 0.2, 0.3], // Multiple thresholds for smoother animations
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add a slight delay for stagger effect
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, 50);
        }
      });
    }, options);

    // Observe all animation elements
    const selectors = [
      ".fade-in",
      ".fade-in-left",
      ".fade-in-right",
      ".scale-in",
    ];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => observer?.observe(el));
    });
  };

  // Progressive reveal for grids and lists
  const initProgressiveReveal = () => {
    const gridContainers = document.querySelectorAll(
      ".projects-grid, .tech-grid, .cert-grid"
    );

    gridContainers.forEach((container) => {
      const items = container.querySelectorAll(
        ".fade-in, .fade-in-left, .fade-in-right"
      );
      items.forEach((item, index) => {
        // Add progressive delay
        (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
      });
    });
  };

  onMounted(() => {
    // Wait for DOM to be ready
    setTimeout(() => {
      initScrollAnimation();
      initProgressiveReveal();
    }, 100);
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return {
    initScrollAnimation,
    initProgressiveReveal,
  };
}
