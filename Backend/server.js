const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
const ReactRoutes = require("./Routes/ReactRoutes");
const Authentication = require("./Routes/Authentication");

app.use("/api", Authentication);
app.use("/", ReactRoutes);

// Serve frontend build
const distPath = path.resolve(__dirname, "../Frontend/dist");
app.use(express.static(distPath));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
