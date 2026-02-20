# 🚀 TaskFlow &mdash; Scalable REST API & React Dashboard

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-lightgrey?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-18.x-blue?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

A robust, scalable RESTful API with Role-Based Access Control (RBAC) and a modern, glassmorphism-inspired React frontend. Built as a comprehensive demonstration of full-stack engineering principles, including secure authentication, database modeling, and modular API design.

---

## ✨ Key Features

- **🔐 Secure Authentication**: JWT-based stateless authentication with `bcryptjs` password hashing.
- **🛡️ Role-Based Access Control (RBAC)**: Fine-grained permissions for `admin` and `user` roles. Admins enjoy global visibility, while users manage their own isolated data.
- **📚 Complete CRUD Operations**: Full lifecycle management for the `Task` entity.
- **🧼 Input Validation & Sanitization**: Comprehensive request validation using `express-validator` to prevent injection and malformed data.
- **📜 Interactive API Documentation**: Pre-configured **Swagger UI** mapping out the entire RESTful interface.
- **💻 Modern React Dashboard**: A fast, responsive Vite + React frontend utilizing dynamic Vanilla CSS for a premium glassmorphism aesthetic.
- **⚙️ Centralized Error Handling**: Unified and structured error responses across all endpoints.

---

## 🛠️ Technology Stack

| Component         | Technology       | Description                                           |
|-------------------|------------------|-------------------------------------------------------|
| **Core Backend**  | Node.js, Express | Fast, unopinionated web framework for APIs.           |
| **Database**      | MongoDB, Mongoose| NoSQL database for flexible data modeling and queries.|
| **Core Frontend** | React, Vite      | Lightning-fast frontend tooling and component logic.  |
| **Routing (UI)**  | React Router DOM | Client-side routing for the dashboard SPA.            |
| **HTTP Client**   | Axios            | Promise-based HTTP client with JWT interceptors.      |

---

## 🚦 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **MongoDB** (A local instance or a free MongoDB Atlas cluster)
- **Git**

### 1. Database Configuration

By default, the backend is configured to connect to a MongoDB cluster via the `MONGODB_URI` environment variable. Ensure your database is running before starting the server.

### 2. Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Configure your Environment Variables in `backend/.env` (already configured for this environment):
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=supersecretkey_dev_only_change_in_prod
   NODE_ENV=development
   ```
4. Boot up the development server:
   ```bash
   npm run dev
   ```
   > The API will report `Server running in development mode on port 5000` and `MongoDB Connected`.

### 3. Frontend Setup

1. Open a **new** terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Boot up the Vite development server:
   ```bash
   npm run dev
   ```
   > The frontend UI will be accessible at `http://localhost:5173`.

---

## 📖 API Documentation

This project utilizes **Swagger UI** for beautiful, interactive API documentation. 

Once your backend server is running, navigate your browser to:
👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

From there, you can view all available endpoints, their required schemas, and even test them directly by authorizing with a JWT Bearer token.

---

## � Project Structure

```text
Backend_assignment/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & environment configurations
│   │   ├── controllers/     # Request handlers and business logic
│   │   ├── middleware/      # Authentication and centralized error handling
│   │   ├── models/          # Mongoose data schemas (User, Task)
│   │   └── routes/          # Express REST endpoint groupings
│   ├── server.js            # Main application bootstrap
│   ├── swagger.yaml         # OpenAPI 3.0 specification file
│   └── package.json         # Backend dependencies & scripts
└── frontend/
    ├── src/
    │   ├── components/      # Reusable UI pages (Login, Register, Dashboard)
    │   ├── services/        # Centralized Axios API configuration
    │   ├── App.jsx          # React Router entry point
    │   └── index.css        # Global CSS variables and utility classes
    └── package.json         # Frontend dependencies & scripts
```

---

## 📈 Scalability Considerations

Please refer to the accompanying [Scalability_Note.md](Scalability_Note.md) for a detailed brief on how this architecture can evolve through Database Replication, Redis Caching, and Docker/Kubernetes container orchestration to handle enterprise-level traffic.
