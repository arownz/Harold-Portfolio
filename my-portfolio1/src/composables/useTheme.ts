import { ref } from 'vue'

export type Theme = 'dark' | 'light'

const THEME_KEY = 'portfolio-theme'

// Initialize theme from localStorage or default to 'dark'
const currentTheme = ref<Theme>((localStorage.getItem(THEME_KEY) as Theme) || 'dark')

export function useTheme() {
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  const toggleTheme = () => {
    const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  // Initialize theme on mount
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', currentTheme.value)
  }

  return {
    currentTheme,
    setTheme,
    toggleTheme
  }
}
