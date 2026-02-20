# TaskFlow API & Dashboard

A scalable REST API with Role-Based Access Control and a beautiful React Frontend, built as part of the Backend Assignment.

## Features

- **Authentication & Authorization**: Secure JWT-based login and registration.
- **Role-Based Access**: `admin` and `user` roles. Admins can view and manage all tasks, while users can only manage their own tasks.
- **Task Management**: Full CRUD capabilities for the Tasks entity.
- **Security**: Password hashing using `bcryptjs`, environment variables, validation using `express-validator`, and custom error handling.
- **API Documentation**: Pre-configured Swagger documentation.
- **Frontend UI**: Integrated React (Vite) frontend with a beautiful, responsive, glassmorphism UI utilizing Vanilla CSS.

---

## Prerequisites

- **Node.js** (v16+)
- **MongoDB** (Local instance or Atlas URI)

---

## 🚀 Quick Setup Guide

### 1. Database Configuration
Ensure you have MongoDB running locally on `mongodb://127.0.0.1:27017` or update the environment variable.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables (The included `.env` requires no changes for local testing):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/backend_assignment
   JWT_SECRET=supersecretkey_dev_only_change_in_prod
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run dev
   # Server will start on http://localhost:5000
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   # Application will start on http://localhost:5173
   ```

---

## 📖 API Documentation (Swagger)

A full API documentation interface is available via Swagger UI. Once the backend server is running, navigate to:

👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

This interface allows you to view all endpoints, request/response schemas, and interactively test the API using your Bearer token.

---

## 🛠 Project Structure

```text
Backend_assignment/
├── backend/
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Route logic handlers
│   │   ├── middleware/   # Custom Express middlewares (auth, error)
│   │   ├── models/       # Mongoose Schemas (User, Task)
│   │   └── routes/       # Express route definitions
│   ├── server.js         # Entry point
│   ├── swagger.yaml      # OpenAPI 3.0 specs
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/   # React pages (Login, Register, Dashboard)
    │   ├── services/     # Axios API configuration
    │   ├── App.jsx       # Routing entry point
    │   └── index.css     # Global CSS and Styles
    └── package.json
```
