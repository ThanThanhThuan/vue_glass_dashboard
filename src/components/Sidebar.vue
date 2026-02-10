<script setup>
import { useThemeStore } from '../stores/theme'

const store = useThemeStore()

// Navigation structure to keep the template clean
const menuItems = [
  {
    title: 'Dashboard',
    path: '/',
    icon: `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>`
  },
  {
    title: 'Analytics',
    path: '/analytics',
    badge: 'New',
    icon: `<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>`
  },
  {
    title: 'Users',
    path: '/users',
    icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`
  }
]
</script>

<template>
  <aside class="sidebar" :class="{ 'open': store.isSidebarOpen }">
    <!-- Close button for mobile -->
    <button class="mobile-close" @click="store.toggleSidebar">✕</button>

    <div class="sidebar-header">
      <div class="logo">G</div>
      <span class="logo-text">GlassDash</span>
    </div>

    <ul class="nav-menu">
      <li class="nav-section">
        <span class="nav-section-title">Main Menu</span>
        <ul>
          <li v-for="item in menuItems" :key="item.path" class="nav-item">
            <router-link :to="item.path" class="nav-link" active-class="active" @click="store.isSidebarOpen = false">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="item.icon"></svg>
              {{ item.title }}
              <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
            </router-link>
          </li>
          <li class="nav-item">
  <router-link to="/admin/billing" class="nav-link" active-class="active">
    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
    Billing Admin
  </router-link>
</li>
        </ul>
      </li>

      <li class="nav-section">
        <span class="nav-section-title">Account</span>
        <ul>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </router-link>
          </li>
        </ul>
      </li>
    </ul>

    <!-- Sidebar User Profile Footer -->
    <div class="sidebar-footer">
      <div class="user-profile">
        <div class="user-avatar">TM</div>
        <div class="user-info">
          <div class="user-name">TemplateMo</div>
          <div class="user-role">Administrator</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* mobile-close is useful for UX on small screens */
.mobile-close {
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 24px;
  cursor: pointer;
}

@media (max-width: 992px) {
  .mobile-close {
    display: block;
  }
}

/* Ensure icons scale correctly */
.nav-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}
</style>