const express = require("express")
const dotenv = require("dotenv")
const connectDb = require("./config/db")
const morgan = require("morgan")
const ejs = require("ejs")

//load config
dotenv.config({
    path: "./config/config.env"
})
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
app.use(express.static("public"));

//view engine
app.set("view engine", "ejs")

//Routes
app.use("/", require("./routes/index"))


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server started on ${process.env.NODE_ENV} mode on port ${PORT}`))