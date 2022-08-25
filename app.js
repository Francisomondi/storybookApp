const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
const passport = require("passport")
const session = require("express-session")
const mongoStore = require('connect-mongo')
const indexRoute = require("./routes/index")
const authRoute = require("./routes/auth")
const storiesRoute = require("./routes/stories")
const connectDb = require("./config/db")


//load config
dotenv.config({
    path: "./config/config.env"
})

//passport config
require("./config/passport")(passport)

connectDb()

const app = express()

//logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}
//middleware/static files
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(express.static("public"));

//view engine
app.set("view engine", "ejs")

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })

}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use("/", indexRoute)
app.use("/auth", authRoute)
app.use("/stories", storiesRoute)


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server started on ${process.env.NODE_ENV} mode on port ${PORT}`))