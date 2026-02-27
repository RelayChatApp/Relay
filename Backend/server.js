require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./Database/Mongodb");
const socketHandler = require("./Sockets/socket");
const userInDb = require("./Database/userDatabase")

const app = express();
const server = http.createServer(app); // create http server properly
const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
const Authentication = require("./Routes/Authentication");
const ReactRoutes = require("./Routes/ReactRoutes");
const Pages = require("./Routes/Pages");

app.use("/api", Authentication);
app.use("/api", Pages);
app.use("/", ReactRoutes);
app.use("/api", userInDb)


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    },
});


socketHandler(io);


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});