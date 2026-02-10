<script setup>
import { 
  analyticsStats, 
  trafficChartData, 
  browserStats, 
  countryStats,
  topPages // Assuming this is in your dataService from previous steps
} from '../services/dataService'

import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import GlassCard from '../components/GlassCard.vue'
</script>

<template>
  <div class="dashboard">
    <Sidebar />

    <main class="main-content">
      <Navbar title="Analytics Overview" />

      <!-- Breadcrumbs -->
      <div class="page-header" style="margin-top: -20px; margin-bottom: 30px;">
        <div class="page-breadcrumb">
          <router-link to="/">Dashboard</router-link>
          <span>/</span>
          <span>Analytics</span>
        </div>
      </div>

      <!-- 1. Analytics Metrics Grid -->
      <section class="stats-grid">
        <GlassCard 
          v-for="stat in analyticsStats" 
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

      <!-- 2. Traffic Chart & Top Pages -->
      <section class="content-grid">
        <!-- Main Traffic Chart (30 Days) -->
        <GlassCard class="chart-card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Traffic Overview</h2>
              <p class="card-subtitle">Daily unique visitors (Last 30 Days)</p>
            </div>
            <div class="card-actions">
              <button class="card-btn active">30 Days</button>
              <button class="card-btn">Export Data</button>
            </div>
          </div>
          <div class="chart-wrapper">
            <div class="chart-container">
              <div class="chart-y-axis">
                <span class="y-value">50K</span>
                <span class="y-value">25K</span>
                <span class="y-value">0</span>
              </div>
              <div class="chart-placeholder">
                <!-- Looping through the 30 bars from dataService -->
                <div v-for="bar in trafficChartData" :key="bar.label" class="chart-bar-group">
                  <div class="chart-bar" :class="bar.color" :style="{ height: bar.height }"></div>
                  <span class="chart-label">{{ bar.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <!-- Top Pages Activity Card -->
        <GlassCard class="activity-card">
          <div class="card-header">
            <h2 class="card-title">Top Performing Pages</h2>
          </div>
          <div class="activity-list">
            <div v-for="page in topPages" :key="page.id" class="activity-item">
              <div class="activity-avatar" :style="{ background: page.color[0] }">
                {{ page.rank }}
              </div>
              <div class="activity-content">
                <p class="activity-text"><strong>{{ page.path }}</strong></p>
                <span class="activity-time">{{ page.views }}</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      <!-- 3. Bottom Analysis Grid -->
      <section class="bottom-grid">
        <!-- Devices Donut Chart -->
        <GlassCard>
          <div class="card-header">
            <h2 class="card-title">Device Breakdown</h2>
          </div>
          <div class="donut-container">
            <div class="donut-chart">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle class="donut-bg" cx="70" cy="70" r="54"/>
                <!-- Hardcoded paths based on original template logic -->
                <circle class="donut-segment" cx="70" cy="70" r="54" stroke="var(--emerald-light)" stroke-dasharray="186.6 339.3" stroke-dashoffset="0"/>
                <circle class="donut-segment" cx="70" cy="70" r="54" stroke="var(--gold)" stroke-dasharray="118.8 339.3" stroke-dashoffset="-186.6"/>
                <circle class="donut-segment" cx="70" cy="70" r="54" stroke="var(--coral)" stroke-dasharray="33.9 339.3" stroke-dashoffset="-305.4"/>
              </svg>
              <div class="donut-center">
                <div class="donut-value">100%</div>
                <div class="donut-label">Total</div>
              </div>
            </div>
            <div class="donut-legend">
              <div class="legend-item"><span class="legend-color cyan"></span><span>Mobile (55%)</span></div>
              <div class="legend-item"><span class="legend-color magenta"></span><span>Desktop (35%)</span></div>
              <div class="legend-item"><span class="legend-color purple"></span><span>Tablet (10%)</span></div>
            </div>
          </div>
        </GlassCard>

        <!-- Browser Performance -->
        <GlassCard class="progress-card">
          <div class="card-header"><h2 class="card-title">Browsers</h2></div>
          <div v-for="browser in browserStats" :key="browser.label" class="progress-item">
            <div class="progress-header">
              <span class="progress-label">{{ browser.label }}</span>
              <span class="progress-value">{{ browser.value }}</span>
            </div>
            <div class="progress-bar">
              <div :class="['progress-fill', browser.color]" :style="{ width: browser.value }"></div>
            </div>
          </div>
        </GlassCard>

        <!-- Geographic Performance -->
        <GlassCard class="progress-card">
          <div class="card-header"><h2 class="card-title">Top Countries</h2></div>
          <div v-for="country in countryStats" :key="country.label" class="progress-item">
            <div class="progress-header">
              <span class="progress-label">{{ country.label }}</span>
              <span class="progress-value">{{ country.value }}</span>
            </div>
            <div class="progress-bar">
              <div :class="['progress-fill', country.color]" :style="{ width: country.value }"></div>
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
/* Icon consistency */
.stat-icon svg {
  width: 28px;
  height: 28px;
  display: block;
}

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

/* Ensure horizontal scroll on the 30-day chart for small screens */
.chart-wrapper {
    overflow-x: auto;
    padding-bottom: 10px;
}
</style>