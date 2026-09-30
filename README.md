# SDE-1 (MERN Stack) To-Do List Application

An assessment-ready, highly optimized full-stack **MERN To-Do List Application** crafted to meet the exact Figma specification and assignment requirements.

---


---

## 🏗️ Architecture & Code Optimizations

- **Backend Architecture (`/server`)**:
  - **Modular Structure & Versioning (`v1`)**:
    - `src/routes/v1/taskRoutes.js`: Versioned routes including the dedicated **Search API** (`GET /api/v1/tasks/search?q=query`).
    - `src/routes/taskRoutes.js`: Route dispatcher mounting `/v1` routes with backward-compatible aliases.
    - `src/config/db.js`: Dedicated database connection module with resilient MongoDB connection handling and fallback.
    - `src/helpers/`:
      - [dateHelper.js](file:///d:/APPROACH%20ASSESMENT/server/src/helpers/dateHelper.js): ISO week and date calculation logic.
      - [memoryStore.js](file:///d:/APPROACH%20ASSESMENT/server/src/helpers/memoryStore.js): In-memory data store with seeded data and fast search index.
    - `src/controllers/taskController.js`: Controller methods handling task CRUD, `searchTasks`, and weekly aggregations.
    - `src/models/Task.js`: Mongoose Schema with validation, text indexes on `title` and `description`, and pre-save hooks.
    - `src/server.js`: Clean server bootstrapper with `/api/v1/health` and request logging.


- **Frontend Architecture (`/client`)**:
  - React 19 + Vite 8 + Tailwind CSS.
  - **Redux Toolkit (`@reduxjs/toolkit` + `react-redux`)**:
    - Centralized store in [store/index.js](file:///d:/APPROACH%20ASSESMENT/client/src/store/index.js).
    - [store/taskSlice.js](file:///d:/APPROACH%20ASSESMENT/client/src/store/taskSlice.js) manages async thunks (`fetchTasks`, `fetchWeeklySummaries`, `createTask`, `updateTask`, `deleteTask`, `checkServerHealth`) and UI state (modals, filters, active dates, notifications).
  - **Axios Instance & Interceptors**:
    - Configured client in [services/axiosInstance.js](file:///d:/APPROACH%20ASSESMENT/client/src/services/axiosInstance.js) with request interceptor (ready for JWT auth headers) and response interceptor (standardized error normalization & logging).
    - Clean API consumption layer in [services/api.js](file:///d:/APPROACH%20ASSESMENT/client/src/services/api.js).
  - **Dual Experience (Mobile & Desktop)**:
    - Mobile Figma-perfect view (iPhone frame simulation + screens).
    - Responsive, full-screen desktop dashboard view with live statistics, filters, and week switcher.


---

## 🚀 Running the Project Locally

### 1. Start the Backend Server
```bash
cd server
npm install
npm run dev
# Server runs on http://localhost:5000
```

### 2. Start the Frontend Client
```bash
cd client
npm install
npm run dev
# Vite runs on http://localhost:5173
```

Open `http://localhost:5173/` in your browser.
