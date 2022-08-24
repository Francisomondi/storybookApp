const express = require("express")
const router = express.Router()
const {
    ensureAuth,
    ensureGuest
} = require("../middleware/auth")

//@description login/landing page
//@route GET/
router.get("/", ensureGuest, (req, res) => {
    res.render("login")
})

//@description dashboard
//@route GET /dashboard
router.get("/dashboard", ensureAuth, (req, res) => {
    console.log(req.user)
    res.render("dashboard")
})

module.exports = router