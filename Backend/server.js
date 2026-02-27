require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./Database/Mongodb");
const socketHandler = require("./Sockets/socket");

const Authentication = require("./Routes/Authentication");
const Pages = require("./Routes/Pages");
const userInDb = require("./Database/userDatabase");
const messageRoutes = require("./Routes/MessageRoute");
const ReactRoutes = require("./Routes/ReactRoutes");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

/* ================= DATABASE ================= */

connectDB();

/* ================= MIDDLEWARE ================= */

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

/* ================= API ROUTES (MUST COME FIRST) ================= */

app.use("/api", Authentication);
app.use("/api", Pages);
app.use("/api", userInDb);
app.use("/api", messageRoutes);

/* ================= REACT ROUTES (MUST BE LAST) ================= */

app.use("/", ReactRoutes);

/* ================= SOCKET.IO ================= */

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

socketHandler(io);

/* ================= START SERVER ================= */

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});