const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT || 3000



app.listen(PORT, () => {
    console.log(`http://localhost/${PORT}`)
})

