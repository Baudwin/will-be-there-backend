const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const dotenv = require('dotenv')
const User = require("../models/userModel")

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}


passport.use( new JwtStrategy(options, async(payload, done)=>{
    try {
      const user = payload
     if (user) {
        return done(null, user)
     }
     else{
        return done(null, false)
     }
    } catch (error) {
       return done(error, false)
    }
}))