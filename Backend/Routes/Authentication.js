const express = require("express");
const router = express.Router();
const User = require("../Schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup
router.post("/signup", async (req, res) => {
    try {
        const { email, FName, password } = req.body;

        const isExists = await User.findOne({ email });
        if (isExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        await User.create({
            email,
            FName,
            password: hashPass
        });

        return res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

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
            secure: false,
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: "Login successful" });

    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
});

// Logout
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    return res.json({ message: "Logged out successfully" });
});

module.exports = router;
