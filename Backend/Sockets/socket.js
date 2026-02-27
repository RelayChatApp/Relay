module.exports = (io) => {

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("welcome", (data) => {
            console.log(data);
        });

        socket.on("send_message", (data) => {
            console.log("Message received:", data);

            // Send to all clients
            io.emit("receive_message", data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

};