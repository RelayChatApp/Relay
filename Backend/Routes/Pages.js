const express = require("express");
const router = express.Router();
const User = require("../Schema/User");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();

const upload = multer({ dest: "uploads/" });

/* =========================
   GET PROFILE
========================= */
router.get("/profile", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verify.id).select("email FName");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
});

/* =========================
   UPDATE PROFILE
========================= */
router.post("/profile", upload.single("file"), async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const userId = verify.id;

        const { email, FName } = req.body;

        // Email uniqueness check
        if (email) {
            const existingUser = await User.findOne({ email });

            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        const updateData = { email, FName };

        // If file uploaded
        if (req.file) {
            updateData.profileImage = req.file.filename;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select("email FName");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;