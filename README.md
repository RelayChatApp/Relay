# Relay — Real-Time Chat Application

Relay is a real-time chat application built using the MERN stack.  
The system is designed with proper **Authentication (AuthN)** and **Authorization (AuthZ)** to ensure secure user access and controlled data flow.

---

## Tech Stack

**Frontend**
- React
- Context API / Redux (state management)
- Socket.IO Client
- Tailwind CSS / CSS

**Backend**
- Node.js
- Express.js
- Socket.IO
- JWT (Authentication)
- bcrypt (Password hashing)

**Database**
- MongoDB
- Mongoose ODM

---

## Core Features

- User registration and login (AuthN)
- Role-based access control (AuthZ)
- One-to-one real-time messaging
- Secure JWT-based sessions
- Online / offline user tracking
- Message persistence in MongoDB
- Protected API routes
- Scalable socket architecture

---

## Authentication (AuthN)

- User signup with hashed passwords
- User login with JWT token generation
- Token stored securely (HTTP-only cookies / local storage)
- Middleware to verify token on protected routes

---

## Authorization (AuthZ)

- Route-level access control
- Users can only:
  - Access their own chats
  - Send messages to authorized users
- Admin or system roles can be extended later

---


---

## Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/relay.git

# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm start

Future Enhancements

Group chats

Message reactions

Media sharing

Read receipts

Typing indicators

End-to-end encryption

Contributors

Kartik

Muskan

