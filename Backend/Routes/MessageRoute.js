const express = require("express");
const router = express.Router();
const Message = require("../Schema/Message");

router.get("/messages/:roomId", async (req, res) => {
    try {
        const messages = await Message.find({
            room: req.params.roomId
        }).sort({ createdAt: 1 });

        res.json(messages);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;