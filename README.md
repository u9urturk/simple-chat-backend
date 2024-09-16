# Simple Chat Application - Backend

## Overview

This is the backend for a simple chat application built with **Node.js** and **Express**. It features **JWT-based authentication**, **WebSocket** integration for real-time messaging, and **MongoDB** for data storage. Redis will be integrated later for caching and session management.

## Features

- **User Authentication:**
  - Secure user login and registration using JWT.
  - Passwords are hashed with bcrypt.
  
- **Real-Time Messaging:**
  - WebSocket integration for live chat functionality.
  - WebSocket connections are initiated after user login and closed upon logout.
  
- **Database:**
  - MongoDB is used for storing user data and messages.
  - Redis integration (upcoming) for caching and session management.

- **Security:**
  - JWT token stored securely in HTTP-only cookies.
  - CSRF protection with `SameSite` policy.
  - Password hashing and secure authentication flows.

## Installation

1. **Clone the repository:**
   ```bash
    git clone <repository-url>
    cd simple-chat-backend

2. **Install dependencies:**
    ```bash
        npm install


3. **Environment Variables:** Create a .env file in the root directory with the following variables:
    ```makefile
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/chat-db
    JWT_SECRET=your_jwt_secret_key
    NODE_ENV=development


4. **Run the server:**
    ``` bash
        npm run dev 

        npm run build 


**API Endpoints**
 -POST /api/auth/register - Register a new user.
 -POST /api/auth/login - Login and get a JWT token.
 -POST /api/auth/logout - Logout and clear session cookie.
 -WebSocket /ws/chat - WebSocket endpoint for real-time chat communication.


**Future Updates**
 -Redis Integration: For caching and session management.
 -Additional Databases: Modular database connection interface for future database integrations.