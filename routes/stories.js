const express = require("express")
const router = express.Router()
const story = require("../models/story")
const ensureAuth = require("../middleware/auth")

//@description show add page
//@route GET /stories/add
router.get("/add", (req, res) => {

    res.render("stories/add", ensureAuth)
})

//@description show add page
//@route POST /stories
router.post("/", async (req, res) => {
    try {
        req.body.user = req.user.id
        await story.create(req.body)
        res.redirect("/dashboard")

    } catch (err) {
        console.log(err)
        res.render("stories/500")
    }


})






module.exports = router