const express = require("express");
const path = require("path");

const router = express.Router();

const distPath = path.resolve(__dirname, "../../Frontend/dist");

// Serve static assets
router.use(express.static(distPath));

// SPA fallback
router.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

module.exports = router;
