# 🌟 Simple Chat Application - Backend  

## Overview  
Welcome to the **Simple Chat Application** backend! This application is built with **Node.js** and **Express** and provides a robust platform for real-time messaging. Key features include:  

- 🔐 **JWT-based authentication**  
- 💬 **WebSocket integration** for real-time messaging  
- 🗄️ **MongoDB** for data storage  
- 🔄 Future plans for **Redis integration** for caching and session management  

---  

## Features  

### User Authentication  
- **Secure User Login/Registration** using JWT.  
- **Password Protection**: Passwords are hashed using **bcrypt** for added security.  

### Real-Time Messaging  
- **WebSocket Integration** for instant chat experience.  
- WebSocket connections are established upon user login and closed upon logout.  

### Database  
- User data and messages are stored in **MongoDB**.  
- Future **Redis integration** is planned for enhanced caching and session management.  

### Security  
- JWT tokens stored securely in **HTTP-only cookies**.  
- Protection against CSRF with **SameSite policy**.  
- Robust password hashing and authentication flows ensure data security.  

---  

## Installation  

### Step 1: Clone the repository  
```bash  
git clone <repository-url>  
cd simple-chat-backend  
```  

### Step 2: Install dependencies  
```bash  
npm install  
```  

### Step 3: Configure Environment Variables  
Create a `.env` file in the root directory with the following variables:  

```plaintext  
PORT=3000  
MONGODB_URI=mongodb://localhost:27017/chat-db  
JWT_SECRET=your_jwt_secret_key  
NODE_ENV=development  
```  

### Step 4: Run the server  
```bash  
npm run dev  
npm run build  
```  

---  

## API Endpoints  

| Method  | Endpoint                   | Description                                       |  
|---------|----------------------------|---------------------------------------------------|  
| **POST**| `/api/auth/register`      | Register a new user.                              |  
| **POST**| `/api/auth/login`         | Login and receive a JWT token.                    |  
| **POST**| `/api/auth/logout`        | Logout and clear session cookie.                  |  
| **WebSocket** | `/ws/chat`        | WebSocket endpoint for real-time chat communication. |  

---  

## Future Updates  
- 🚀 **Redis Integration**: Implement caching and session management.  
- 🗃️ **Additional Databases**: Develop a modular database connection interface for future database integrations.  

---  

## 🎉 Contributing  
Contributions are welcome! Please submit a pull request or an issue for any enhancements or bug fixes.  

## 📄 License  
This project is licensed under the MIT License.  

---  

Thank you for checking out the Simple Chat Application backend! For further questions, feel free to reach out.