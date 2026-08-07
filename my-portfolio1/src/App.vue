<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Navigation from './components/Navigation.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import TechStack from './components/TechStack.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import BackToTop from './components/BackToTop.vue'
// import ChatBot from './components/ChatBot.vue'
// import CodedBackground from './components/CodedBackground.vue'

const activeSection = ref('home')
const scrollY = ref(0)
let observer: IntersectionObserver | null = null

const handleScroll = () => {
  scrollY.value = window.scrollY
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
  if (element) element.scrollIntoView({ behavior: 'smooth' })
}

const initScrollObserver = () => {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), 50)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )
  setTimeout(() => {
    const selectors = ['.fade-in', '.fade-in-left', '.fade-in-right', '.scale-in']
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el) => observer?.observe(el))
    })
  }, 100)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  initScrollObserver()

  // Fix HMR: re-init observer after any hot module update
  if (import.meta.hot) {
    import.meta.hot.on('vite:afterUpdate', () => {
      setTimeout(initScrollObserver, 200)
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  observer?.disconnect()
})
</script>

<template>
  <div class="bg-s0 text-ink font-sans overflow-x-hidden relative min-h-screen w-full">
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

    <BackToTop />
    <!-- <ChatBot /> -->

    <footer class="bg-s1 py-12 px-8 text-center border-t border-edge">
        <!-- <CodedBackground /> -->
      <div class="site-container">
        <p class="text-ink-3 my-2">&copy; {{ new Date().getFullYear() }} Harold F. Pasion. All rights reserved.</p>
        <p class="text-ink-3 text-[0.9rem] my-2">Built with Vue 3 + TypeScript + Vite + Tailwind CSS v4</p>
      </div>
    </footer>
  </div>
</template>
