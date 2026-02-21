const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        FName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePhoto: {
            type: String,
            default: "https://tse2.mm.bing.net/th/id/OIP.IKpJatzr_kSkN7k8VHXF6wHaGQ?rs=1&pid=ImgDetMain&o=7&rm=3",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);