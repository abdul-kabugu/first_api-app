const express = require("express")
const { getUsers } = require("../controllers/UsersController")

const router = express.Router()

router.route("/").get((re,res) =>  {
    res.status(200).json({message : "I love  that"})
})

router.route("/onboard").get((req, res) =>  {
    res.status(200).json({message : "it's onboarding page hahaaa"})
})

module.exports = router