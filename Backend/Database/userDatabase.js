const express = require("express");
const router = express.Router();
const User = require("../Schema/User");

router.get("/database", async (req, res) => {
    try {
        const users = await User.find().select("-password");// fetch users from DB
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router; 