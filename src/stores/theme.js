import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const theme = ref(localStorage.getItem('theme') || 'dark')
    const isSidebarOpen = ref(false)

    function toggleTheme() {
        theme.value = theme.value === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme', theme.value)
        document.documentElement.setAttribute('data-theme', theme.value)
    }

    function toggleSidebar() {
        isSidebarOpen.value = !isSidebarOpen.value
    }

    // Set initial theme
    document.documentElement.setAttribute('data-theme', theme.value)

    return { theme, isSidebarOpen, toggleTheme, toggleSidebar }
})