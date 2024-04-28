const Rsvp = require('../models/rsvpModel')
const Event = require('../models/eventModel')
const rsvpMessage = require('../nodemailer/nodemailer')
require('dotenv').config()

module.exports = {

    createRsvp : async(req,res)=>{
        const {eventId} = req.params 
        const {guestName, email, attendanceStatus,additionalItem,  plusOne, congratulatoryMessage } = req.body
        try {

            if (!guestName.trim() || !email.trim() || !attendanceStatus.trim()) {
                throw Error( "All fields must be provided!")
            }

            const event = await Event.findOne({_id:eventId})
             
            if (!event) {
                throw Error("event not found")
            }

            const newRsvp = await Rsvp.create({
             eventID:eventId, guestName, email, attendanceStatus,additionalItem, plusOne, congratulatoryMessage
            })

            if(newRsvp.attendanceStatus === "no"){
            return  res.status(200).json({msg:"Thank you for your response."}) 
            }

            if (attendanceStatus === "yes") {
            const result =  await rsvpMessage(newRsvp.email,newRsvp.guestName, event.eventName, event.eventImgUrl,event.location, event.date, event.time, event.description, newRsvp.plusOne, newRsvp.additionalItem )
           
            res.status(200).json({msg:"Rsvp successful"})
            }
            
        }
         catch (error) {
            res.status(400).json({msg:error.message})
        }

    }, 


    getUserRsvps : async(req,res)=>{
        try {
        const {email} = req.user
        const userRsvps = await Rsvp.find({email})
        .populate({
            path: "eventID", 
            model:"Event"
        })
        .exec()
        res.status(200).json(userRsvps)
        } catch (error) {
            res.status(401).json({msg:error.message})
        }    
    },

    
    updateRsvp : async(req,res)=>{
        const {newAttendanceStatus,rsvpId} = req.body
        try {
              await Rsvp.findOneAndUpdate({_id:rsvpId}, {attendanceStatus:newAttendanceStatus}, 
                { 
                    new: true, 
                    runValidators: true
                }
            )
            res.status(200).json({msg:"Update successful"})
            } catch (error) {
                res.status(401).json({msg:error.message})
            }
    }




}