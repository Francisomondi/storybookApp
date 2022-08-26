const express = require("express");
const router = express.Router();
const story = require("../models/story");
const user = require("../models/User");
const ensureAuth = require("../middleware/auth");

//@description show add page
//@route GET /stories/add
router.get("/add", (req, res) => {
    res.render("stories/add", ensureAuth);
});

//@description show add page
//@route POST /stories
router.post("/", async (req, res) => {
    try {
        req.body.user = req.user.id;
        await story.create(req.body);
        res.redirect("/dashboard")
    } catch (err) {
        console.log(err);
        res.render("error/500")
    }
})

//@description show all stories
//@route GET /stories/
router.get("/", async (req, res) => {
    try {

        const stories = await story.find({
            status: "public"
        }).populate("user").sort({
            createdAt: "desc"
        }).lean()
        res.render("stories/index", ensureAuth, {
            stories
        })
    } catch (err) {
        console.log(err)
        res.render("error/500");

    }
});


module.exports = router;