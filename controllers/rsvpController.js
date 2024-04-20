const Rsvp = require('../models/rsvpModel')
const Event = require('../models/eventModel')
const rsvpMessage = require('../nodemailer/nodemailer')
require('dotenv').config()

module.exports = {

    sendMessage : async(req,res)=> {
        try {
            const result =  await rsvpMessage()
            res.send({result});
        } catch (error) {
           console.log(error); 
        }   
    },

    createRsvp : async(req,res)=>{
        const eventID = req.params.eventID
        
        const {guestName, email, attendanceStatus, plusOne, congratulatoryMessage } = req.body
        try {
            const event = Event.findOne({_id:eventID})

            if (!event) {
                throw Error("event not found")
            }

            const newRsvp = Rsvp.create({
             eventID, guestName, email, attendanceStatus, plusOne, congratulatoryMessage
            })

            if(attendanceStatus === "no"){
            return  res.status(200).json({msg:"Thank you for your response."}) 
            }

            if (attendanceStatus === "yes") {

                // send email logic 
            }
            
        }
         catch (error) {
            res.status(400).json({msg:error.message})
        }

    }, 

    updateRsvp : async(req,res)=>{

    }




}