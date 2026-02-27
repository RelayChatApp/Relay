const Message = require("../Schema/Message");

module.exports = (io) => {

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        /* ================= JOIN ROOM ================= */

        socket.on("join_room", (roomId) => {
            if (!roomId) return;
            socket.join(roomId);
        });

        /* ================= SEND MESSAGE ================= */

        socket.on("send_message", async (data, callback) => {
            try {
                // Basic validation
                if (!data || !data.room || !data.sender || !data.receiver || !data.text) {
                    if (callback) callback({ status: "error", message: "Invalid payload" });
                    return;
                }

                if (data.text.trim().length === 0) {
                    if (callback) callback({ status: "error", message: "Empty message" });
                    return;
                }

                const savedMessage = await Message.create({
                    room: data.room,
                    sender: data.sender,
                    receiver: data.receiver,
                    text: data.text.trim()
                });

                // Emit to room
                io.to(data.room).emit("receive_message", savedMessage);

                // Acknowledge sender
                if (callback) callback({ status: "success", message: savedMessage });

            } catch (error) {
                console.error("Message save failed:", error);

                if (callback) {
                    callback({ status: "error", message: "Server error" });
                }
            }
        });

        /* ================= DISCONNECT ================= */

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });

    });

};