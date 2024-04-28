const nodemailer = require('nodemailer')
require('dotenv').config()


const rsvpMessage = async(userEmail,guestName,eventName, eventImgUrl,location, date, time, description, plusOne, additionalItem )=>{

const htmlContent = `
<html>
<head>
  <title>RSVP Confirmation for ${eventName}</title>
  <style>
  body {
    font-family: Arial, sans-serif;
    color: #333;
  }

  span {
    color: green;
  }
  </style>
</head>
<body>
  <h2>RSVP Confirmation for ${eventName}</h2>
  <p>Dear ${guestName}, </p>
  <p>Thank you for RSVPing to <span>${eventName} </span> ! Your attendance is confirmed, and we're excited to see you there.</p>

  <h3>Event Details :</h3>
  <ul>
    <li><strong>Date:</strong> ${date}</li>
    <li><strong>Time:</strong> ${time}</li>
    <li><strong>Location:</strong> ${location}</li>
    <li><strong>Description:</strong> ${description}</li>
  </ul>

  <h3>Your RSVP Details:</h3>
  <ul>
    <li><strong>Number of Plus Ones:</strong> ${plusOne.length}</li>
    <li><strong>Plus One(s):</strong> ${plusOne.join(', ')}</li>
  </ul>

  <p>We look forward to having you at the event!</p>

  <p>Best regards.</p>
</body>
</html>
`;


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
            to: userEmail,
            subject: `RSVP confirmation for ${eventName}`,
            text: '',
            html:htmlContent
          };
         
        const info = await transporter.sendMail(mailOptions)
        return info

    } catch (error) {
         throw Error(error)
    }
  
 
}

module.exports = rsvpMessage