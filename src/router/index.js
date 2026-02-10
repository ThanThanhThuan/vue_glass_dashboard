import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
    history: createWebHashHistory(), // Uses #/analytics instead of /analytics
    // history: createWebHistory(),
    routes: [
        { path: '/', component: Dashboard },
        { path: '/analytics', component: () => import('../views/Analytics.vue') },
        { path: '/users', component: () => import('../views/Users.vue') },
        { path: '/settings', component: () => import('../views/Settings.vue') },
        { path: '/login', component: () => import('../views/Login.vue') },
        {
            path: '/admin/billing',
            name: 'AdminBilling',
            component: () => import('../views/AdminBilling.vue')
        },
    ]
})

export default router