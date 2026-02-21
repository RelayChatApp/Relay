require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./Database/Mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const Authentication = require("./Routes/Authentication");
const ReactRoutes = require("./Routes/ReactRoutes");
const Pages = require("./Routes/Pages")

app.use("/api", Authentication);
app.use("/", ReactRoutes);
app.use("/api", Pages);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});