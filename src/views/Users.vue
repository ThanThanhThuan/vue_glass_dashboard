<script setup>
import { userStats, usersList } from '../services/dataService'
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import GlassCard from '../components/GlassCard.vue'
</script>

<template>
  <div class="dashboard">
    <Sidebar />

    <main class="main-content">
      <Navbar title="Users Management" />

      <!-- Breadcrumbs -->
      <div class="page-header" style="margin-top: -20px; margin-bottom: 30px;">
        <div class="page-breadcrumb">
          <router-link to="/">Dashboard</router-link>
          <span>/</span>
          <span>Users</span>
        </div>
      </div>

      <!-- 1. User Stats Grid -->
      <section class="stats-grid">
        <GlassCard 
          v-for="stat in userStats" 
          :key="stat.id" 
          :is3d="true" 
          class="stat-card"
        >
          <div class="stat-card-inner">
            <div class="stat-info">
              <h3>{{ stat.label }}</h3>
              <div class="stat-value">{{ stat.value }}</div>
              <span class="stat-change" :class="stat.changeType">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline v-if="stat.changeType === 'positive'" points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline v-else points="23 18 13.5 8.5 8.5 13.5 1 6"/>
                </svg>
                {{ stat.change }}
              </span>
            </div>
            <div :class="['stat-icon', stat.iconColor]">
              <!-- SVG Wrapper for icons from dataService -->
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                v-html="stat.icon"
              ></svg>
            </div>
          </div>
        </GlassCard>
      </section>

      <!-- 2. Users Main Table -->
      <section class="content-grid" style="grid-template-columns: 1fr;">
        <GlassCard class="table-card">
          <div class="card-header">
            <div>
              <h2 class="card-title">All Users</h2>
              <p class="card-subtitle">Manage user roles, permissions, and status</p>
            </div>
            <div class="card-actions">
              <button class="card-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add User
              </button>
              <button class="card-btn">Export</button>
            </div>
          </div>

          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in usersList" :key="user.id">
                  <td>
                    <div class="table-user">
                      <div class="table-avatar" :style="{ background: user.gradient }">
                        {{ user.initials }}
                      </div>
                      <div class="table-user-info">
                        <span class="table-user-name">{{ user.name }}</span>
                        <span class="table-user-email">{{ user.email }}</span>
                      </div>
                    </div>
                  </td>
                  <td>{{ user.role }}</td>
                  <td>
                    <span :class="['status-badge', user.status]">
                      {{ user.statusText }}
                    </span>
                  </td>
                  <td>{{ user.joined }}</td>
                  <td>{{ user.active }}</td>
                  <td>
                    <div class="card-actions">
                        <button class="card-btn" style="padding: 6px 12px;">Edit</button>
                        <button class="card-btn" style="padding: 6px 12px;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>
    </main>
  </div>

  <footer class="site-footer">
    <p>Copyright © 2026 Your Company. Designed by <a href="https://templatemo.com" target="_blank" rel="nofollow">TemplateMo</a></p>
  </footer>
</template>

<style scoped>
/* Standardize icon sizing for v-html icons */
.stat-icon svg {
  width: 28px;
  height: 28px;
  display: block;
}

/* Ensure table user info is aligned */
.table-user-name {
    display: block;
    font-weight: 500;
    color: var(--text-primary);
}

.table-user-email {
    display: block;
    font-size: 12px;
    color: var(--text-muted);
}

/* Fix for stat cards icon colors */
.stat-icon.cyan svg { color: var(--emerald-light); }
.stat-icon.magenta svg { color: var(--gold); }
.stat-icon.purple svg { color: var(--coral); }
.stat-icon.success svg { color: var(--success); }

/* Breadcrumb Styling */
.page-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--text-muted);
}

.page-breadcrumb a {
    color: var(--text-secondary);
    transition: color 0.2s ease;
}

.page-breadcrumb a:hover {
    color: var(--emerald-light);
}
</style>