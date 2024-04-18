const router = require('express').Router()
const {createRsvp, sendMessage}  = require('../controllers/rsvpController')

router.post("/create-rsvp/:eventID", createRsvp)
router.post("/send-msg", sendMessage)

module.exports = router