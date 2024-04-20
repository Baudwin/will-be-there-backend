const bcrypt = require("bcrypt")
const saltRounds = 10
const User = require("../models/userModel")
const validator = require('validator')
const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = {

    // REGISTER USER
    register: async (req, res) => {
        const { username, email, password} = req.body
        try {

        if (!username.trim() || !email.trim() || !password.trim() ) {
            throw Error("All fields must be provided!")
        }

        if (!validator.isEmail(email)) {
            throw Error(`${email} is not a valid email`)
        }

        if (!validator.isStrongPassword(password)) {
            throw Error(`password must be atleast 8 characters, must contain an uppercase letter, a lowercase letter, a number and a special character or symbol `)
        }

        const user = await User.findOne({email:email})
        if (user) {
            throw Error(`Email ${email} is already in use`)
        }

       const hash = await bcrypt.hash(password, saltRounds)
       const newUser = await User.create({
                username: username,
                email: email,
                password: hash
            })

            const token = jwt.sign({_id:newUser._id, email : newUser.email}, process.env.JWT_SECRET)          
            const userInfo = {
                _id:newUser._id, 
                email: newUser.email,
                createdOn : newUser.createdOn, 
                token
            }
            res.status(200).json({msg:"User Registered",userInfo})
        }
         catch (error) {
           res.status(400).json(error.message)            
        }
    },


    protected : (req,res)=>{
        res.send(req.user);
    }, 

    // Sign In USER 
    signin: async (req, res) => {
        const { email, password } = req.body
      
        // check if user with info provided exists 
        try {
        if (!email.trim() || !password.trim()) {
            throw Error( "All fields are required")
        }

        // check database if user with email exists 
        const user = await User.findOne({email: email })

        if (!user) {
           throw Error(" email does not exist")
        }

        //if the user exists compare the provided password with the hashed password in the database 
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw Error("Incorrect Password")
        }
          // if there is a match asign  token to that user 
          const token = jwt.sign({_id:user._id, email : user.email}, process.env.JWT_SECRET)
         const userInfo = {
            _id:user._id, 
            email: user.email,
            createdOn : user.createdOn, 
            username : user.username, 
            token
        }
        res.status(200).json({ msg: "Login successful", userInfo})
        }
         catch (error) {
            res.status(400).json(error.message)
        }
    },





}