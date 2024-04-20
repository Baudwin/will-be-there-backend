const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rsvpSchema = new Schema({
    eventID :  {
        type : mongoose.Schema.Types.ObjectId, ref:'Event'
    },

    email : {
        type: String,
        required: true,
        unique: true
    }, 

    attendanceStatus : {
        type: String,
        enum :['yes', "no"], 
        required: true   
    }, 

    plusOne : {
        type : Array,
        default : [],
        required: false
    }, 
    
    congratulatoryMessage : {
        type : String,
        required: false 
    },

    createdOn : {
        type : Date,
        default : Date.now
    },

    updatedOn : {
        type : Date,
    }
 
})

module.exports = mongoose.model("Rsvp", rsvpSchema)