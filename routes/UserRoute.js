const express = require("express")
const { getUsers, createUsers, register, updateUser, getSingleUser } = require("../controllers/UsersController")

const  router  = express.Router()

router.route("/").get(getUsers)

router.route("/").post(register)

router.route("/:id").put(updateUser)
router.route("/:id").get(getSingleUser)

module.exports = router