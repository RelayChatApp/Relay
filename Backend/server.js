const express = require("express")
const app = express()
const cors = require("cors")
const path = 3000

//Signup
app.post((req, res) => {
    const { email, name, password } = req.body
})

//Login
app.post((req, res) => {
    const { email, password } = req.body
})

//Profile
app.post((req, res) => {
    const { email, name } = req.body
})

app.listen((port) => {
    console.log("server running...")
})

