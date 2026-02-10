<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const handleLogin = () => {
  // Logic here
  router.push('/')
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="login-logo">G</div>
          <h1 class="login-title">Welcome Back</h1>
          <p class="login-subtitle">Sign in to continue to GlassDash</p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" placeholder="admin@example.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" placeholder="••••••••" required>
          </div>
          
          <button type="submit" class="btn btn-primary">Sign In</button>
        </form>

        <div class="divider"><span>or continue with</span></div>
        <div class="social-login">
          <button class="social-btn">Google</button>
          <button class="social-btn">Github</button>
        </div>
      </div>
    </div>
  </div>
</template>