// src/services/dataService.js
import { ref } from 'vue';

// --- CONSTANTS ---
const BASE_URL = 'https://api.nocodebackend.com'; // <--- THIS WAS MISSING
const TABLE_NAME = import.meta.env.VITE_TABLE_NAME;
const INSTANCE_ID = import.meta.env.VITE_INSTANCE_ID;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const topPages = [
    { id: 1, path: "/dashboard", views: "45,234 views", rank: 1, color: "emerald" },
    { id: 2, path: "/products", views: "32,891 views", rank: 2, color: "gold" },
    { id: 3, path: "/pricing", views: "28,456 views", rank: 3, color: "coral" },
    { id: 4, path: "/about", views: "19,234 views", rank: 4, color: "success" },
    { id: 5, path: "/contact", views: "12,567 views", rank: 5, color: "warning" },
];

export const countryStats = [
    { label: "🇺🇸 United States", value: "38%", color: "cyan" },
    { label: "🇬🇧 United Kingdom", value: "18%", color: "magenta" },
    { label: "🇩🇪 Germany", value: "12%", color: "purple" },
    { label: "🇨🇦 Canada", value: "9%", color: "cyan" },
];
// --- DASHBOARD DATA ---
export const dashboardStats = [
    {
        id: 1,
        label: "Total Revenue",
        value: "$84,254",
        change: "+12.5%",
        changeType: "positive",
        iconColor: "cyan",
        icon: `<line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />`
    },
    {
        id: 2,
        label: "Active Users",
        value: "24,521",
        change: "+8.2%",
        changeType: "positive",
        iconColor: "magenta",
        icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />`
    },
    {
        id: 3,
        label: "Total Orders",
        value: "8,461",
        change: "-3.1%",
        changeType: "negative",
        iconColor: "purple",
        icon: `<circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />`
    },
    {
        id: 4,
        label: "Conversion Rate",
        value: "3.24%",
        change: "+2.4%",
        changeType: "positive",
        iconColor: "success",
        icon: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />`
    }
];

export const revenueChartData = [
    { label: 'Jan', height: '120px', color: 'bar-emerald' },
    { label: 'Feb', height: '160px', color: 'bar-gold' },
    { label: 'Mar', height: '90px', color: 'bar-coral' },
    { label: 'Apr', height: '140px', color: 'bar-teal' },
    { label: 'May', height: '180px', color: 'bar-amber' },
    { label: 'Jun', height: '130px', color: 'bar-emerald' },
    { label: 'Jul', height: '170px', color: 'bar-gold' },
    { label: 'Aug', height: '150px', color: 'bar-coral' },
    { label: 'Sep', height: '190px', color: 'bar-teal' },
    { label: 'Oct', height: '140px', color: 'bar-amber' },
    { label: 'Nov', height: '175px', color: 'bar-emerald' },
    { label: 'Dec', height: '200px', color: 'bar-gold' },
];

export const recentActivity = [
    { id: 1, name: "John Doe", action: "purchased Premium Plan", time: "2 minutes ago", avatar: "JD", color: "linear-gradient(135deg, var(--emerald-light), var(--emerald))" },
    { id: 2, name: "Anna Smith", action: "submitted a support ticket", time: "15 minutes ago", avatar: "AS", color: "linear-gradient(135deg, var(--gold), var(--amber))" },
    { id: 3, name: "Mike Johnson", action: "upgraded subscription", time: "1 hour ago", avatar: "MJ", color: "linear-gradient(135deg, var(--coral), var(--gold))" },
    { id: 4, name: "Emily White", action: "completed onboarding", time: "2 hours ago", avatar: "EW", color: "linear-gradient(135deg, var(--success), var(--emerald))" }
];

export const recentTransactions = [
    { id: 1, customer: "John Doe", product: "Premium Plan", date: "Jan 15, 2025", status: "completed", amount: "$299.00", initials: "JD", color: "var(--emerald-light)" },
    { id: 2, customer: "Anna Smith", product: "Enterprise License", date: "Jan 14, 2025", status: "processing", amount: "$1,499.00", initials: "AS", color: "var(--gold)" },
    { id: 3, customer: "Mike Johnson", product: "Team Bundle", date: "Jan 13, 2025", status: "completed", amount: "$599.00", initials: "MJ", color: "var(--success)" }
];

export const projectProgress = [
    { label: "UI Design", value: 85, color: "cyan" },
    { label: "Backend API", value: 62, color: "magenta" },
    { label: "Testing", value: 45, color: "purple" },
    { label: "Documentation", value: 28, color: "cyan" },
];

// --- USERS DATA ---
export const userStats = [
    { id: 1, label: "Total Users", value: "24,521", change: "+8.2%", changeType: "positive", iconColor: "cyan", icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />` },
    { id: 2, label: "Active Now", value: "1,234", change: "+12.5%", changeType: "positive", iconColor: "magenta", icon: `<circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />` },
    { id: 3, label: "New Today", value: "156", change: "-3.1%", changeType: "negative", iconColor: "purple", icon: `<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />` },
    { id: 4, label: "Premium Users", value: "4,892", change: "+18.7%", changeType: "positive", iconColor: "success", icon: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />` }
];

export const usersList = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Administrator", status: "completed", statusText: "Active", joined: "Jan 15, 2024", active: "2 mins ago", initials: "JD", gradient: "linear-gradient(135deg, var(--emerald-light), var(--emerald))" },
    { id: 2, name: "Anna Smith", email: "anna@example.com", role: "Editor", status: "completed", statusText: "Active", joined: "Feb 22, 2024", active: "15 mins ago", initials: "AS", gradient: "linear-gradient(135deg, var(--gold), var(--amber))" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User", status: "pending", statusText: "Away", joined: "Mar 10, 2024", active: "2 hours ago", initials: "MJ", gradient: "linear-gradient(135deg, var(--success), var(--emerald))" },
    { id: 4, name: "Emily White", email: "emily@example.com", role: "Moderator", status: "completed", statusText: "Active", joined: "Apr 5, 2024", active: "30 mins ago", initials: "EW", gradient: "linear-gradient(135deg, var(--coral), var(--gold))" }
];

// --- ANALYTICS DATA ---
export const analyticsStats = [
    { id: 1, label: "Page Views", value: "1,284,521", change: "+24.5%", changeType: "positive", iconColor: "cyan", icon: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />` },
    { id: 2, label: "Unique Visitors", value: "452,892", change: "+18.3%", changeType: "positive", iconColor: "magenta", icon: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />` },
    {
        id: 3,
        label: "Bounce Rate",
        value: "32.8%",
        change: "+5.2%",
        changeType: "negative",
        iconColor: "purple",
        icon: `<polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />`
    },
    {
        id: 4,
        label: "Avg. Session",
        value: "4:32",
        change: "+12.1%",
        changeType: "positive",
        iconColor: "success",
        icon: `<circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />`
    }

];

export const trafficChartData = [
    { label: '1', height: '80px', color: 'bar-emerald' },
    { label: '2', height: '95px', color: 'bar-emerald' },
    { label: '3', height: '70px', color: 'bar-emerald' },
    { label: '4', height: '110px', color: 'bar-emerald' },
    { label: '5', height: '130px', color: 'bar-emerald' },
    { label: '6', height: '145px', color: 'bar-gold' },
    { label: '7', height: '120px', color: 'bar-gold' },
    { label: '8', height: '100px', color: 'bar-gold' },
    { label: '9', height: '135px', color: 'bar-gold' },
    { label: '10', height: '155px', color: 'bar-gold' },
    { label: '11', height: '140px', color: 'bar-coral' },
    { label: '12', height: '125px', color: 'bar-coral' },
    { label: '13', height: '160px', color: 'bar-coral' },
    { label: '14', height: '175px', color: 'bar-coral' },
    { label: '15', height: '150px', color: 'bar-coral' },
    { label: '16', height: '165px', color: 'bar-teal' },
    { label: '17', height: '145px', color: 'bar-teal' },
    { label: '18', height: '130px', color: 'bar-teal' },
    { label: '19', height: '155px', color: 'bar-teal' },
    { label: '20', height: '180px', color: 'bar-teal' },
    { label: '21', height: '170px', color: 'bar-amber' },
    { label: '22', height: '160px', color: 'bar-amber' },
    { label: '23', height: '185px', color: 'bar-amber' },
    { label: '24', height: '175px', color: 'bar-amber' },
    { label: '25', height: '165px', color: 'bar-amber' },
    { label: '26', height: '190px', color: 'bar-emerald' },
    { label: '27', height: '175px', color: 'bar-emerald' },
    { label: '28', height: '195px', color: 'bar-emerald' },
    { label: '29', height: '185px', color: 'bar-emerald' },
    { label: '30', height: '200px', color: 'bar-emerald' },
];

export const browserStats = [
    { label: "Chrome", value: 64, color: "cyan" },
    { label: "Safari", value: 22, color: "magenta" },
    { label: "Firefox", value: 8, color: "purple" }
];

// --- SETTINGS DATA ---
// export const billingHistory = [
//     { id: 1, date: "Jan 1, 2025", desc: "Pro Plan - Monthly", amount: "$29.00", status: "Paid" },
//     { id: 2, date: "Dec 1, 2024", desc: "Pro Plan - Monthly", amount: "$29.00", status: "Paid" }
// ];

// 1. Define the static mock data
const mockBillingHistory = [
    { id: 'm1', date: "2025-12-01 12:00:00", desc: "Pro Plan - Monthly (Mock)", amount: "$29.00", status: "Paid" },
    { id: 'm2', date: "2025-11-01 12:00:00", desc: "Pro Plan - Monthly (Mock)", amount: "$29.00", status: "Paid" },
    { id: 'm3', date: "2025-10-01 12:00:00", desc: "Pro Plan - Monthly (Mock)", amount: "$29.00", status: "Paid" },
];

// 2. Export a reactive variable initialized with mock data
export const billingHistory = ref([...mockBillingHistory]);

// 3. Logic to fetch from nocodebackend.com
// src/services/dataService.js

export const fetchBillingHistory = async () => {
    const TABLE_NAME = import.meta.env.VITE_TABLE_NAME;
    const INSTANCE_ID = import.meta.env.VITE_INSTANCE_ID;
    const API_TOKEN = import.meta.env.VITE_API_TOKEN;
    const BASE_URL = 'https://api.nocodebackend.com';

    const API_URL = `${BASE_URL}/read/${TABLE_NAME}?Instance=${INSTANCE_ID}&sub_table=billing`;

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });

        const dbData = await response.json();

        let records = [];
        if (Array.isArray(dbData)) {
            records = dbData;
        } else if (dbData && Array.isArray(dbData.data)) {
            records = dbData.data;
        }

        const formattedDbData = records.map(item => ({
            id: item.id,
            date: item.date, // Format: 2026-02-09 20:10:00
            desc: item.desc,
            amount: `$${parseFloat(item.amount || 0).toFixed(2)}`,
            status: item.status ? (item.status.charAt(0).toUpperCase() + item.status.slice(1)) : 'Pending'
        }));

        // 1. Combine DB data and Mock data
        const combinedData = [...formattedDbData, ...mockBillingHistory];

        // 2. SORT DESCENDING (Newest Date First)
        combinedData.sort((a, b) => {
            // Convert strings to Date objects for comparison
            return new Date(b.date) - new Date(a.date);
        });

        // 3. Update the reactive reference
        billingHistory.value = combinedData;

    } catch (err) {
        console.error("Failed to fetch billing records:", err);

        // Sort mock data even if API fails
        const sortedMock = [...mockBillingHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
        billingHistory.value = sortedMock;
    }
};

// UPDATE RECORD
export const updateBillingRecord = async (id, payload) => {
    try {
        const response = await fetch(`${BASE_URL}/update/${TABLE_NAME}/${id}?Instance=${INSTANCE_ID}`, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        return response.ok;
    } catch (err) {
        console.error("Update error:", err);
        return false;
    }
};

// DELETE RECORD
export const deleteBillingRecord = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/delete/${TABLE_NAME}/${id}?Instance=${INSTANCE_ID}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });
        return response.ok;
    } catch (err) {
        console.error("Delete error:", err);
        return false;
    }
};