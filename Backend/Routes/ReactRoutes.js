const express = require("express");
const path = require("path");
const router = express.Router();

const distPath = path.join(__dirname, "../../Frontend/dist");

// Serve static files
router.use(express.static(distPath));

// SPA fallback
router.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

module.exports = router;
