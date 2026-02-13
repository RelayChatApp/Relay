const express = require("express");
const router = express.Router();
const User = require("../Schema/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/profile", async (req, res) => {
    const validUser = req.cookies.token
    if (!validUser) {
        res.status(401).json({ message: "User not authenticated" })
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET)
    const id = verify.id

    const { email, FName } = req.body

    const EmailCheck = User.findOne({ email })
    if (EmailCheck) {
        res.status(401).status({ message: "Email already in use" })
    }

    User.findByIdAndUpdate(id, { email, FName })

})