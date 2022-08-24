//where we will take our strategy

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose")
const User = require("../models/User")

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, cb) => {
            //User.findOrCreate({
            //  googleId: profile.id
            // }, function (err, user) {
            //    return cb(err, user);

            //});

            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value

            }
            try {
                let user = await User.findOne({
                    googleId: profile.id
                })
                if (user) {
                    cb(null, user)
                } else {
                    user = User.create(newUser)
                    cb(null, user)
                }
            } catch (err) {
                console.log(err)

            }

        }))
    passport.serializeUser((user, cb) => {
        cb(null, user.id);

    });

    // used to deserialize the user
    passport.deserializeUser((id, cb) => {
        User.findById(id, function (err, user) {
            cb(err, user);
        });
    });
}