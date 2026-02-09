const express = require("express");
const router = express.Router();
const User = require("../Schema/User");


router.post("/api/signup", async (req, res) => {
    const { email, FName, password } = req.body
    cons
    const data = await User.create({ email, FName, password })
    data.save()



});

module.exports = router;