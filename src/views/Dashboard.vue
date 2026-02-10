<script setup>
import { 
  dashboardStats, 
  revenueChartData, 
  recentActivity, 
  recentTransactions, 
  projectProgress 
} from '../services/dataService'

import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import GlassCard from '../components/GlassCard.vue'
</script>

<template>
  <div class="dashboard">
    <Sidebar />

    <main class="main-content">
      <Navbar title="Dashboard Overview" />

      <!-- 1. Stats Grid -->
      <section class="stats-grid">
        <GlassCard 
          v-for="stat in dashboardStats" 
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

      <!-- 2. Charts and Activity Grid -->
      <section class="content-grid">
        <!-- Revenue Chart -->
        <GlassCard class="chart-card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Revenue Analytics</h2>
              <p class="card-subtitle">Monthly revenue overview</p>
            </div>
            <div class="card-actions">
              <button class="card-btn active">Monthly</button>
              <button class="card-btn">Weekly</button>
            </div>
          </div>
          <div class="chart-wrapper">
            <div class="chart-container">
              <div class="chart-y-axis">
                <span class="y-value">$100K</span>
                <span class="y-value">$50K</span>
                <span class="y-value">$0</span>
              </div>
              <div class="chart-placeholder">
                <div v-for="bar in revenueChartData" :key="bar.label" class="chart-bar-group">
                  <div class="chart-bar" :class="bar.color" :style="{ height: bar.height }"></div>
                  <span class="chart-label">{{ bar.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <!-- Recent Activity Feed -->
        <GlassCard class="activity-card">
          <div class="card-header">
            <h2 class="card-title">Recent Activity</h2>
          </div>
          <div class="activity-list">
            <div v-for="act in recentActivity" :key="act.id" class="activity-item">
              <div class="activity-avatar" :style="{ background: act.color }">
                {{ act.avatar }}
              </div>
              <div class="activity-content">
                <p class="activity-text"><strong>{{ act.name }}</strong> {{ act.action }}</p>
                <span class="activity-time">{{ act.time }}</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <!-- Transaction Table -->
        <GlassCard class="table-card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Recent Transactions</h2>
              <p class="card-subtitle">Latest orders and payments</p>
            </div>
            <div class="card-actions">
              <button class="card-btn">View All</button>
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tx in recentTransactions" :key="tx.id">
                  <td>
                    <div class="table-user">
                      <div class="table-avatar" :style="{ background: tx.color }">{{ tx.initials }}</div>
                      <div class="table-user-info">
                        <span class="table-user-name">{{ tx.customer }}</span>
                      </div>
                    </div>
                  </td>
                  <td>{{ tx.product }}</td>
                  <td><span :class="['status-badge', tx.status]">{{ tx.status }}</span></td>
                  <td><span class="table-amount">{{ tx.amount }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>

      <!-- 3. Bottom Grid (Calendar, Traffic, Progress) -->
      <section class="bottom-grid">
        <!-- Static Calendar Widget -->
        <GlassCard>
          <div class="calendar-header">
            <h2 class="card-title">January 2025</h2>
            <div class="calendar-nav">
              <button class="calendar-nav-btn">◀</button>
              <button class="calendar-nav-btn">▶</button>
            </div>
          </div>
          <div class="calendar-grid">
            <span class="calendar-day-name">S</span><span class="calendar-day-name">M</span><span class="calendar-day-name">T</span><span class="calendar-day-name">W</span><span class="calendar-day-name">T</span><span class="calendar-day-name">F</span><span class="calendar-day-name">S</span>
            <!-- Simple placeholder loop for calendar days -->
            <span v-for="d in 31" :key="d" class="calendar-day" :class="{ 'today': d === 1 }">{{ d }}</span>
          </div>
        </GlassCard>

        <!-- Donut Chart -->
        <GlassCard>
          <div class="card-header">
            <h2 class="card-title">Traffic Sources</h2>
          </div>
          <div class="donut-container">
            <div class="donut-chart">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle class="donut-bg" cx="70" cy="70" r="54"/>
                <circle class="donut-segment" cx="70" cy="70" r="54" stroke="var(--emerald-light)" stroke-dasharray="169.6 339.3" stroke-dashoffset="0"/>
              </svg>
              <div class="donut-center">
                <div class="donut-value">24.5K</div>
                <div class="donut-label">Visitors</div>
              </div>
            </div>
            <div class="donut-legend">
              <div class="legend-item"><span class="legend-color cyan"></span><span>Organic (50%)</span></div>
              <div class="legend-item"><span class="legend-color magenta"></span><span>Social (30%)</span></div>
            </div>
          </div>
        </GlassCard>

        <!-- Progress Card -->
        <GlassCard class="progress-card">
          <div class="card-header">
            <h2 class="card-title">Project Progress</h2>
          </div>
          <div v-for="item in projectProgress" :key="item.label" class="progress-item">
            <div class="progress-header">
              <span class="progress-label">{{ item.label }}</span>
              <span class="progress-value">{{ item.value }}%</span>
            </div>
            <div class="progress-bar">
              <div :class="['progress-fill', item.color]" :style="{ width: item.value + '%' }"></div>
            </div>
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
/* Ensure content wrapper doesn't stay hidden if JS transitions were removed */
.dashboard {
  opacity: 1;
  visibility: visible;
}

/* Fix for stat cards icons */
:deep(.stat-icon svg) {
  width: 26px;
  height: 26px;
}
</style>