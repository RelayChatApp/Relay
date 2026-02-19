require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./Database/Mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
const Authentication = require("./Routes/Authentication");
const ReactRoutes = require("./Routes/ReactRoutes");

app.use("/api", Authentication);
app.use("/", ReactRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
