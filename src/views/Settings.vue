<script setup>
import { ref, onMounted, computed } from 'vue'
import { useThemeStore } from '../stores/theme'
import { billingHistory, fetchBillingHistory } from '../services/dataService'
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import GlassCard from '../components/GlassCard.vue'

const store = useThemeStore()
const activeTab = ref('profile')

// DYNAMIC DATE LOGIC
const nextBillingDate = computed(() => {
  const now = new Date();
  // Create a date for the 1st of NEXT month
  // Date constructor handles month overflow (12 -> 0) automatically
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  
  // Format it as "Feb 1, 2026"
  return nextMonth.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
});

onMounted(() => {
  fetchBillingHistory()
})

const tabs = [
  { id: 'profile', label: 'Profile', icon: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>` },
  { id: 'security', label: 'Security', icon: `<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>` },
  { id: 'notifications', label: 'Notifications', icon: `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>` },
  { id: 'appearance', label: 'Appearance', icon: `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/>` },
  { id: 'billing', label: 'Billing', icon: `<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>` }
]
</script>

<template>
  <div class="dashboard">
    <Sidebar />
    
    <main class="main-content">
      <Navbar title="Settings" />

      <div class="settings-grid">
        <!-- 1. Settings Navigation -->
        <GlassCard class="settings-nav-card">
          <ul class="settings-nav">
            <li v-for="tab in tabs" :key="tab.id" class="settings-nav-item">
              <a 
                href="#" 
                class="settings-nav-link" 
                :class="{ active: activeTab === tab.id }"
                @click.prevent="activeTab = tab.id"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="tab.icon" style="width:20px"></svg>
                {{ tab.label }}
              </a>
            </li>
          </ul>
        </GlassCard>

        <!-- 2. Settings Content Area -->
        <GlassCard>
          <!-- Profile Tab -->
          <div v-if="activeTab === 'profile'" class="settings-tab-content active">
            <div class="profile-header">
              <div class="profile-avatar-large">TM</div>
              <div class="profile-info">
                <h2>TemplateMo</h2>
                <p>admin@templatemo.com • Administrator</p>
              </div>
            </div>

            <div class="settings-section">
              <h3 class="settings-section-title">Profile Information</h3>
              <div class="form-grid">
                <div class="form-group-settings">
                  <label>First Name</label>
                  <input type="text" class="form-input" value="Template">
                </div>
                <div class="form-group-settings">
                  <label>Last Name</label>
                  <input type="text" class="form-input" value="Mo">
                </div>
                <div class="form-group-settings full-width">
                  <label>Bio</label>
                  <textarea class="form-input">Dashboard template creator and web design enthusiast.</textarea>
                </div>
              </div>
            </div>
            <button class="btn btn-primary">Save Changes</button>
          </div>

          <!-- Security Tab -->
          <div v-if="activeTab === 'security'" class="settings-tab-content active">
            <h3 class="settings-section-title">Security Settings</h3>
            <div class="settings-row">
              <div class="settings-label">
                <span class="settings-label-title">Two-Factor Authentication</span>
                <span class="settings-label-desc">Secure your account with 2FA</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="form-group-settings" style="margin-top: 20px;">
              <label>New Password</label>
              <input type="password" class="form-input" placeholder="••••••••">
            </div>
            <button class="btn btn-primary" style="margin-top: 20px;">Update Password</button>
          </div>

          <!-- Appearance Tab (Linked to Pinia Store) -->
          <div v-if="activeTab === 'appearance'" class="settings-tab-content active">
            <h3 class="settings-section-title">Appearance</h3>
            <div class="settings-row">
              <div class="settings-label">
                <span class="settings-label-title">Color Mode</span>
                <span class="settings-label-desc">Switch between light and dark themes</span>
              </div>
              <select 
                class="settings-select" 
                :value="store.theme" 
                @change="(e) => store.toggleTheme()"
              >
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
              </select>
            </div>
            <div class="settings-row">
              <div class="settings-label">
                <span class="settings-label-title">Glass Blur Effects</span>
                <span class="settings-label-desc">Enable background blur on cards</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- Billing Tab -->
            <div v-if="activeTab === 'billing'" class="settings-tab-content active">
            <!-- Plan Overview Card -->
            <div class="billing-plan-card" style="background: linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(212, 165, 116, 0.1)); border: 1px solid var(--glass-border); padding: 24px; border-radius: 16px; margin-bottom: 30px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h4 style="font-size: 20px; font-weight: 600; margin-bottom: 4px;">Pro Plan</h4>
                  <p style="color: var(--text-muted); font-size: 14px;">Your next billing date is {{ nextBillingDate }}</p>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 32px; font-weight: 700; font-family: 'Space Mono', monospace;">$29</span>
                  <span style="color: var(--text-muted); font-size: 14px;">/mo</span>
                </div>
              </div>
              <div style="margin-top: 20px; display: flex; gap: 12px;">
                <button class="btn btn-primary" style="padding: 10px 20px; width: auto;">Upgrade Plan</button>
                <button class="btn btn-secondary" style="padding: 10px 20px; width: auto;">Cancel</button>
              </div>
            </div>

            <h3 class="settings-section-title">Billing History (Live + Mock)</h3>
            <div class="table-wrapper" style="margin: 0;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- billingHistory is now a reactive Ref, so this updates automatically -->
                  <tr v-for="invoice in billingHistory" :key="invoice.id">
                    <td>{{ invoice.date }}</td>
                    <td>{{ invoice.desc }}</td>
                    <td><span class="table-amount">{{ invoice.amount }}</span></td>
                    <td>
                      <span 
                        class="status-badge" 
                        :class="invoice.status.toLowerCase() === 'paid' ? 'completed' : 'pending'"
                      >
                        {{ invoice.status }}
                      </span>
                    </td>
                    <td>
                      <a href="#" class="invoice-download">PDF</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <!-- Fallback for unfinished tabs -->
          <div v-if="['profile', 'security', 'notifications', 'appearance'].includes(activeTab) && activeTab !== 'billing'">
             <h3 class="settings-section-title">{{ activeTab.toUpperCase() }}</h3>
             <p>Manage your {{ activeTab }} settings here.</p>
          </div>
        </GlassCard>
      </div>
    </main>
  </div>

  <footer class="site-footer">
    <p>Copyright © 2026 Your Company. Designed by <a href="https://templatemo.com" target="_blank" rel="nofollow">TemplateMo</a></p>
  </footer>
</template>

<style scoped>
.settings-grid {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 24px;
}

@media (max-width: 992px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>