<script setup>
import { ref, onMounted, computed } from 'vue'
import { billingHistory, fetchBillingHistory, updateBillingRecord, deleteBillingRecord } from '../services/dataService'
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import GlassCard from '../components/GlassCard.vue'

// API Config
const API_TOKEN = import.meta.env.VITE_API_TOKEN
const TABLE_NAME = import.meta.env.VITE_TABLE_NAME
const INSTANCE_ID = import.meta.env.VITE_INSTANCE_ID

// State
const formData = ref({
  desc: '',
  amount: 29.00,
  status: 'paid',
  date: new Date().toISOString().slice(0, 16)
})

const isEditing = ref(false)
const currentEditId = ref(null)
const isLoading = ref(false)
const message = ref({ text: '', type: '' })

// Filter out mock data for the admin view (Mock IDs start with 'm')
const dbRecords = computed(() => billingHistory.value.filter(item => !String(item.id).startsWith('m')))

onMounted(() => {
  fetchBillingHistory()
})

// ACTIONS
const handleEdit = (item) => {
  isEditing.value = true
  currentEditId.value = item.id
  formData.value = {
    desc: item.desc,
    amount: parseFloat(item.amount.replace('$', '')),
    status: item.status.toLowerCase(),
    // Attempt to parse date back to local datetime format
    date: item.date.replace(' ', 'T').slice(0, 16)
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => {
  isEditing.value = false
  currentEditId.value = null
  formData.value = { desc: '', amount: 29.00, status: 'paid', date: new Date().toISOString().slice(0, 16) }
}

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this record?')) return
  
  const success = await deleteBillingRecord(id)
  if (success) {
    message.value = { text: 'Deleted successfully', type: 'success' }
    fetchBillingHistory()
  }
}

const handleSubmit = async () => {
  isLoading.value = true
  const payload = {
    sub_table: "billing",
    date: formData.value.date.replace('T', ' ') + ':00',
    desc: formData.value.desc,
    amount: parseFloat(formData.value.amount),
    status: formData.value.status
  }

  let success = false
  if (isEditing.value) {
    success = await updateBillingRecord(currentEditId.value, payload)
  } else {
    const API_URL = `https://api.nocodebackend.com/create/${TABLE_NAME}?Instance=${INSTANCE_ID}`
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'accept': 'application/json', 'Authorization': `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    success = response.ok
  }

  if (success) {
    message.value = { text: isEditing.value ? 'Updated!' : 'Added!', type: 'success' }
    cancelEdit()
    fetchBillingHistory()
  } else {
    message.value = { text: 'Error occurred', type: 'error' }
  }
  isLoading.value = false
}
</script>

<template>
  <div class="dashboard">
    <Sidebar />

    <main class="main-content">
      <Navbar title="Billing Administration" />

      <!-- FORM SECTION -->
      <section class="content-grid" style="grid-template-columns: 1fr; margin-bottom: 40px;">
        <GlassCard style="max-width: 800px; margin: 0 auto; width: 100%;">
          <div class="card-header">
            <h2 class="card-title">{{ isEditing ? 'Edit Record' : 'Add New Record' }}</h2>
            <button v-if="isEditing" class="card-btn" @click="cancelEdit">Cancel Edit</button>
          </div>

          <form @submit.prevent="handleSubmit" class="settings-section">
            <div class="form-grid">
              <div class="form-group-settings full-width">
                <label>Description</label>
                <input v-model="formData.desc" type="text" class="form-input" required>
              </div>
              <div class="form-group-settings">
                <label>Amount ($)</label>
                <input v-model="formData.amount" type="number" step="0.01" class="form-input" required>
              </div>
              <div class="form-group-settings">
                <label>Status</label>
                <select v-model="formData.status" class="settings-select" style="width: 100%;">
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div class="form-group-settings full-width">
                <label>Date & Time</label>
                <input v-model="formData.date" type="datetime-local" class="form-input" required>
              </div>
            </div>

            <div v-if="message.text" :style="{ color: message.type === 'success' ? 'var(--success)' : 'var(--danger)', marginTop: '15px' }">
              {{ message.text }}
            </div>

            <div class="btn-group" style="margin-top: 20px;">
              <button type="submit" class="btn btn-primary" :disabled="isLoading">
                {{ isEditing ? 'Update Record' : 'Create Record' }}
              </button>
            </div>
          </form>
        </GlassCard>
      </section>

      <!-- DATABASE LIST SECTION -->
      <section class="content-grid" style="grid-template-columns: 1fr;">
        <GlassCard>
          <div class="card-header">
            <h2 class="card-title">Database Records</h2>
            <p class="card-subtitle">Live records from nocodebackend.com</p>
          </div>

          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in dbRecords" :key="item.id">
                  <td>{{ item.date }}</td>
                  <td>{{ item.desc }}</td>
                  <td><span class="table-amount">{{ item.amount }}</span></td>
                  <td>
                    <span class="status-badge" :class="item.status.toLowerCase() === 'paid' ? 'completed' : 'pending'">
                      {{ item.status }}
                    </span>
                  </td>
                  <td>
                    <div class="card-actions">
                      <button class="card-btn" title="Edit" @click="handleEdit(item)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button class="card-btn" title="Delete" @click="handleDelete(item.id)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="dbRecords.length === 0">
                  <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">No database records found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>
    </main>
  </div>
</template>

<style scoped>
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.full-width { grid-column: span 2; }
.card-actions { display: flex; gap: 8px; }
</style>