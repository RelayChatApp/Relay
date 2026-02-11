const express = require("express");
<<<<<<< Updated upstream
=======
const path = require("path");
>>>>>>> Stashed changes
const cors = require("cors");

<<<<<<< Updated upstream
// Routes Folder
const ReactRoutes = require("./Routes/ReactRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
=======
const app = express();
const PORT = 3000;
>>>>>>> Stashed changes

app.use(cors());

<<<<<<< Updated upstream
// Mounted frontend routes
app.use("/", ReactRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
=======
app.use("/api", require("./Routes/Authentication"));

const distPath = path.resolve(__dirname, "../Frontend/dist");

app.use(express.static(distPath));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
>>>>>>> Stashed changes
