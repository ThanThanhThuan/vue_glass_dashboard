# Vue Dashboard Interactive
View live at: https://thanthanhthuan.github.io/vue_glass_dashboard/

Click Admin Billing to add/ edit/ delete billing records

See live Billing History at Settings -> Billing 

<img width="1863" height="1056" alt="image" src="https://github.com/user-attachments/assets/8ed8665a-caa1-469c-bbeb-b17f2655fc5a" />

This project is a high-performance 3D Glassmorphism Admin Dashboard migrated from a static HTML template into a modern, full-stack Vue 3 SPA (Single Page Application).
Below is a summary of the project architecture, features, and technical stack.

🚀 1. Technical Stack

Framework: Vue 3 (Composition API)
Build Tool: Vite (Lightning-fast HMR and bundling)
State Management: Pinia (Global handling of Dark/Light themes and Sidebar states)
Routing: Vue Router (Clean navigation with component-based views)
Backend Integration: nocodebackend.com (RESTful API for live data)
Design Language: Glassmorphism (Backdrop blurs, 3D tilt effects, floating animated orbs)

📊 2. Key Features

Dynamic Dashboard: Real-time stats, revenue charts, and project progress tracking using shared reactive data.
Live Analytics: Visualized traffic data, device breakdowns (custom SVG donut charts), and geographic performance.
User Management: A full-blown management table with status badges and customizable user avatars.
Admin Billing (Full CRUD):
Create: A dedicated form to push new billing records to the database.
Read: Automatically fetches live records and merges them with design-ready mock data.
Update: Edit existing database records via a reactive "Edit Mode."
Delete: Remove records directly from the UI with instant state synchronization.
Theme Engine: Persistent Dark/Light mode that updates the entire UI via CSS variables and data-theme attributes.

🏗️ 3. Architecture Highlights

dataService.js (The Engine): A centralized, reactive service that manages data for the entire app. It handles API communication, data formatting, and automatic date sorting (DESC) to ensure newest records always appear first.
GlassCard.vue: A reusable high-order component that encapsulates the 3D Tilt Logic, allowing any content to gain interactive depth via mouse tracking.
Environment Security: Implementation of .env variables to protect sensitive API Tokens and Instance IDs while allowing flexible deployment.
Smart Date Logic: Automated "Next Billing Date" calculation that handles month and year overflows (e.g., Dec -> Jan) without manual updates.

🛠️ 4. API & Data Flow

POST: Admin Billing pushes records to nocodebackend.com with a fixed sub_table: "billing" identifier.
GET: Data is fetched, mapped for the UI, and combined with local mock data.
PUT/DELETE: Specific records are targeted by ID for modification or removal.
Reactivity: Because the data is stored in a shared Pinia/Service ref, updating an item in the Admin view instantly reflects the change in the Settings billing table
.
🎨 5. User Experience (UX)

Zero-Refresh Navigation: Smooth transitions between pages via Vue Router.
Mobile-First: A fully responsive sidebar that toggles and auto-closes on mobile navigation.
Visual Feedback: Loading states, success/error messages for API calls, and capitalize-on-the-fly status badges.

Current Status: The project is a production-ready dashboard capable of both displaying static design data and managing real-world database transactions. It is highly maintainable, with logic separated from the presentation layer.
