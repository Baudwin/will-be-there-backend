const nodemailer = require('nodemailer')
require('dotenv').config()
// const mailGen = require('mailgen')

const rsvpMessage = async()=>{

    try {
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_EMAIL,
              pass: process.env.GMAIL_PASSWORD
            }
          });
          
          let mailOptions = {
            from: process.env.GMAIL_EMAIL,
            to: ' baudwin12@gmail.com',
            subject: 'RSVP success',
            text: '',
            html: `
            <img src="" alt="Event Image" style="max-width: 100%;" />
            <p>You have successfully RSVPd to the event xxx! </p>
            
             <h4> Event Details</h4>
             <p>Title: Graduation ceremony </p>
             <p>Date: 29/04/2024</p>
             <p>Location: Limbe mile 4</p>
             <p>Description: Selly's graduation ceremony</p>
    
            <h5> Your plus One(s)</h5>
            <ul>
            <li>John paul</li>
            <li>Angela Mary</li>
            </ul>
    
             <h5>Items you can bring</h5>
            <ul>
            <li>Food</li>
            </ul>
        `
          };
         
        const info = await transporter.sendMail(mailOptions)
        return info

    } catch (error) {
         throw Error(error)
    }
  
 
}

module.exports = rsvpMessage