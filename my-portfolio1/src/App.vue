<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Navigation from './components/Navigation.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import TechStack from './components/TechStack.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import BackToTop from './components/BackToTop.vue'

const activeSection = ref('home')
const scrollY = ref(0)

const handleScroll = () => {
  scrollY.value = window.scrollY
  
  // Update active section based on scroll position
  const sections = ['home', 'about', 'tech', 'projects', 'contact']
  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        activeSection.value = section
        break
      }
    }
  }
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )
  
  // Observe all fade-in elements
  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div id="app" class="app">
    <ScrollProgress />
    <Navigation 
      :activeSection="activeSection" 
      :scrollY="scrollY"
      @scrollTo="scrollToSection"
    />
    
    <HeroSection @scrollTo="scrollToSection" />
    <AboutSection />
    <TechStack />
    <ProjectsSection />
    <ContactSection />
    
    <ThemeToggle />
    <BackToTop />
    
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} Harold F. Pasion. All rights reserved.</p>
        <p class="footer-note">Built with Vue 3 + TypeScript + Vite</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  background: var(--bg-darker);
  color: var(--text-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow-x: hidden;
}

.footer {
  background: var(--bg-dark);
  padding: 3rem 2rem;
  text-align: center;
  border-top: 1px solid var(--border);
}

.footer .container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer p {
  color: var(--text-muted);
  margin: 0.5rem 0;
}

.footer-note {
  font-size: 0.9rem;
  color: var(--text-muted);
}
</style>
