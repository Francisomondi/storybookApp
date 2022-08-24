const express = require("express")
const router = express.Router()
const story = require("../models/story")
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
router.get("/dashboard", ensureAuth, async (req, res) => {
    const User = req.user
    try {
        const stories = await story.find({
            user: User.id
        }).lean()
        res.render("dashboard", {
            user: User,
            stories: stories
        })
    } catch (err) {
        console.log(err)
    }


})

module.exports = router