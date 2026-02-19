# Relay — Real-Time Chat Application

Relay is a real-time chat application built using the MERN stack. The system is designed with proper Authentication (AuthN) and Authorization (AuthZ) to ensure secure user access and controlled data flow. This was developed as a collaborative duo project by Kartik and Muskan.

---

## Tech Stack

Frontend

* React
* Context API / Redux (state management)
* Socket.IO Client
* Tailwind CSS / CSS

Backend

* Node.js
* Express.js
* Socket.IO
* JWT (Authentication)
* bcrypt (Password hashing)

Database

* MongoDB
* Mongoose ODM

---

## Core Features

* User registration and login (AuthN)
* Role-based access control (AuthZ)
* One-to-one real-time messaging
* Secure JWT-based sessions
* Online / offline user tracking
* Message persistence in MongoDB
* Protected API routes
* Scalable socket architecture

---

## Authentication (AuthN)

* User signup with hashed passwords
* User login with JWT token generation
* Token stored securely (HTTP-only cookies / local storage)
* Middleware to verify token on protected routes

---

## Authorization (AuthZ)

* Route-level access control
* Users can only:

  * Access their own chats
  * Send messages to authorized users
* Admin or system roles can be extended later

---

## Project Structure

```
Relay/
│
├── Backend/
│   ├── Database/
│   │   └── Mongodb.js
│   ├── Routes/
│   │   ├── Authentication.js
│   │   ├── Pages.js
│   │   └── ReactRoutes.js
│   ├── Schema/
│   │   └── User.js
│   ├── User.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── dist/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── Pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── .env
│
└── README.md
```

## Environment Variables

Do not commit real credentials to version control. Use a local `.env` file.

### Backend (Backend/.env)
```

PORT=3000
MONGO_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

````

Add `.env` to `.gitignore` to prevent credential leaks.

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
````

---

## Future Enhancements

* Group chats
* Message reactions
* Media sharing
* Read receipts
* Typing indicators
* End-to-end encryption

---

## Contributors

Kartik
Muskan
