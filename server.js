const express = require("express")
const {errorHandler} = require("./middleware/errorHandler")
const connectionDb = require("./config/dbConnection")

const env = require("dotenv").config()

connectionDb()

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use("/api/users" , require("./routes/UserRoute"))
app.use("/", require("./routes/FakeRoute"))

app.use(errorHandler)

app.listen(PORT, () =>  {
    console.log(`app started on ${PORT}`)
})


module.exports = app;