const express = require("express")
const router = express.Router()
const passport = require("passport")

//@description authenticate with google
//@route GET /auth/google
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

//google auth callback
//@route GET /auth/google/callback
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });

//@description lout user
//@route GET /auth/logout
router.get('/logout', async (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/")
    })

});


module.exports = router