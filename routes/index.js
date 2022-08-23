const express = require("express")
const router = express.Router()

//@description login/landing page
//@route GET/
router.get("/", (req, res) => {
    res.send("login")
})

//@description dashboard
//@route GET /dashboard
router.get("/dashboard", (req, res) => {
    res.send("dashboard")
})

module.exports = router