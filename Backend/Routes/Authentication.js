const express = require("express");
const router = express.Router();
const User = require("../Schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(cookieParser());

// Signup
router.post("/api/signup", async (req, res) => {
    const { email, FName, password } = req.body;

    const isExists = User.findOne({ email });

    if (isExists) {
        res.status(201).json({ message: "Email already registered" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const data = await User.create({
        email,
        FName,
        password: hashPass
    });

    data.save();
});

// Login
router.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const isExists = await User.findOne({ email });

    if (!isExists) {
        res.status(404).json({ message: "Email not registered,Try sigining up!" });
    }

    const PassCheck = await bcrypt.compare(password, User.password);

    if (!PassCheck) {
        res.status(401).json({ message: "Wrong password" });
    }

    // setting token n cookie
    const token = jwt.sign(
        { id: User._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    );

    res.cookie(token, "token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: "3d"
    });
});

// Logout
router.post("/logout", async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: "3d"
    });

    res.json({ message: "Logged Out successfully" });
});

module.exports = router;