const express = require("express");
const router = express.Router();
const User = require("../Schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* =========================
   SIGNUP
========================= */
router.post("/signup", async (req, res) => {
    try {
        const { email, FName, password } = req.body;

        if (!email || !FName || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isExists = await User.findOne({ email });
        if (isExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        await User.create({
            email,
            FName,
            password: hashPass,
        });

        return res.status(201).json({
            message: "User registered successfully",
        });

    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not registered" });
        }

        const passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) {
            return res.status(401).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,           // required for HTTPS (Render)
            sameSite: "none",       // required for cross-origin
            path: "/",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful",
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

/* =========================
   LOGOUT
========================= */
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    });

    return res.status(200).json({
        message: "Logged out successfully",
    });
});

/* =========================
   VERIFY AUTH (ME)
========================= */
router.get("/me", async (req, res) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        return res.status(200).json({
            user,
        });

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
});

module.exports = router;
