const nodemailer = require('nodemailer')
require('dotenv').config()


const rsvpMessage = async(userEmail,guestName,eventName, eventImgUrl,location, date, time, description, plusOne, additionalItem )=>{

  const htmlContent2 = ` <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RSVP Confirmation for ${eventName}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
      h1, h2 {
        text-align: center;
      }
      p {
        line-height: 1.6;
      }
      .btn {
        display: inline-block;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        margin: 20px auto;
      }
      .btn:hover {
        background-color: #0056b3;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        color: #777777;
      }
      span {
        color: blue;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>RSVP Confirmation</h1>
      <p>Dear ${guestName},</p>
      <p>Thank you for RSVPing to <span>${eventName} </span>! We're excited to have you join us.</p>
      <h2>Event Details:</h2>
      <p><strong>Event Name:</strong> ${eventName}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p>If you have any questions or need further information, feel free to contact us.</p>
      <p>We look forward to seeing you there!</p>
      <div class="footer">
        <p>Best regards</p>
      </div>
    </div>
  </body>
  </html>`

// const htmlContent = `
// <html>
// <head>
//   <title>RSVP Confirmation for ${eventName}</title>
//   <style>
//   body {
//     font-family: Arial, sans-serif;
//     color: #333;
//   }

//   span {
//     color: green;
//   }
//   </style>
// </head>
// <body>
//   <h2>RSVP Confirmation for ${eventName}</h2>
//   <p>Dear ${guestName}, </p>
//   <p>Thank you for RSVPing to <span>${eventName} </span> ! Your attendance is confirmed, and we're excited to see you there.</p>

//   <h3>Event Details :</h3>
//   <ul>
//     <li><strong>Date:</strong> ${date}</li>
//     <li><strong>Time:</strong> ${time}</li>
//     <li><strong>Location:</strong> ${location}</li>
//     <li><strong>Description:</strong> ${description}</li>
//   </ul>

//   <h3>Your RSVP Details:</h3>
//   <ul>
//     <li><strong>Number of Plus Ones:</strong> ${plusOne.length}</li>
//     <li><strong>Plus One(s):</strong> ${plusOne.join(', ')}</li>
//   </ul>

//   <p>We look forward to having you at the event!</p>

//   <p>Best regards.</p>
// </body>
// </html>
// `;


    try {
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
            }
          });
          
          let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: userEmail,
            subject: `RSVP confirmation for ${eventName}`,
            text: '',
            html:htmlContent2
          };
         
        const info = await transporter.sendMail(mailOptions)
        return info

    } catch (error) {
         throw Error(error)
    }
  
 
}

module.exports = rsvpMessage