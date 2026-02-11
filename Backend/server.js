const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Routes
const Authentication = require("./Routes/Authentication");

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api", Authentication);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});