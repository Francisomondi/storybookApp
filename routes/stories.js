const express = require("express")
const router = express.Router()
const story = require("../models/story")
const ensureAuth = require("../middleware/auth")

//@description show add page
//@route GET /stories/add
router.get("/add", (req, res) => {

    res.render("stories/add", ensureAuth)
})



module.exports = router