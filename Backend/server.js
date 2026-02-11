const express = require("express");
const path = require("path");
const cors = require("cors");

// Routes
const ReactRoutes = require("./Routes/ReactRoutes");
const AuthenticationRoutes = require("./Routes/Authentication");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// API routes
app.use("/api", AuthenticationRoutes);

// Frontend routes (if needed separately)
app.use("/", ReactRoutes);

// Serve frontend build
const distPath = path.resolve(__dirname, "../Frontend/dist");
app.use(express.static(distPath));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
