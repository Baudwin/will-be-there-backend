const Rsvp = require('../models/rsvpModel')
const nodemailer = require('nodemailer')

module.exports = {

    sendMessage : (req,res)=> {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: '',
              pass: ''
            }
          });
          
          var mailOptions = {
            from: 'baudwin12@gmail.com',
            to: 'blizzybaudwin@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

    }, 

    createRsvp : async(req,res)=>{
        const eventID = req.params.eventID
        
        const {guestName, email, attendanceStatus, plusOne, congratulatoryMessage } = req.body
        try {
            const newRsvp = Rsvp.create({
                eventID,guestName, email, attendanceStatus, plusOne, congratulatoryMessage
            })

            if(attendanceStatus === "no"){
            return  res.status(200).json({msg:"Rsvp Seccessful"}) 
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