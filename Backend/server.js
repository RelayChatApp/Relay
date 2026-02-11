const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Routes Folder
const ReactRoutes = require("./Routes/ReactRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Mounted frontend routes
app.use("/", ReactRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
