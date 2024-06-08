const User = require("../Models/UserModel")
const bcrypt = require("bcrypt")
const { constants } = require("../constants")
const asyncHandler = require("express-async-handler")
//@ get all users
//@ everything is public

const  getUsers = asyncHandler ( async (req, res) =>  {
     const users = await User.find()
    res.status(200).json(users)
})


//@ create users
//@ everything is public

const  createUsers =  asyncHandler(async (req, res) =>  {
   const {name, email, password, } = req.body

      console.log("the req  body" , req.body)

    if(!name || !email || !password){
        res.status(constants.VALIDATION_ERROR)
        throw new Error("fill all fields")
    }

    const user = await User.findOne({email})

    if(user){
        res.status(constants.VALIDATION_ERROR)
    throw  new Error("email have been used ")
    }
   
     const hashedPassword = await bcrypt.hash(password, 10)
     const  newUser =  await User.create({
        name,
        email,
        password : hashedPassword
     })  

   

    res.status(201).json( newUser)
})


const register =  asyncHandler(async (req, res) =>  {
    const {name, email,  password,} =  req.body 
  
    if(!name || !email  || !password){
      res.status(constants.VALIDATION_ERROR);
      throw new Error("all field  are required")
    }
  const isAvailable = await User.findOne({email})

    console.log("is user available", isAvailable)
  
  if(isAvailable){
      res.status(constants.VALIDATION_ERROR)
      throw new Error("user  have been registerd ")
  }
  
  // HASH PASSWORD
  
  const hashedPassword =  await bcrypt.hash(password, 10)
  
   console.log("hashed passwords", hashedPassword)
  
   const newUser = await User.create({
      name,
      email,
      password : hashedPassword,
  
   })
  
   res.status(200)
   res.json(newUser)
  })

//@  update particular  users
//@ everything is public

const  updateUser =  asyncHandler (async(req, res,) =>  {
  const userId = req.params.id

   const user = await User.findById(userId)

   if(! user){
    res.status(constants.NOT_FOUND)
    throw new Error("No user found")
   }

   const updateDUser = await User.findByIdAndUpdate(userId, req.body, {new : true})
  res.status(201).json(updateDUser)


})

//@  update particular  users
//@ everything is public

const  getSingleUser = asyncHandler( async (req, res,) =>  {
    const userId = req.params.id

    console.log("the user id", userId)

    const user = await User.findById(userId)

    if(! user){
        res.status(constants.NOT_FOUND)
        throw new  Error("No user found")
    }
  
    res.status(200).json(user)
  })

module.exports =  {getUsers, register, createUsers, updateUser, getSingleUser}