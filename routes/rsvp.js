const router = require('express').Router()
// const {createRsvp, getUserRsvps}  = require('../controllers/rsvpController')
// const authenticateJWT = require("../middleware/authenticateJwt");


router.post("/rsvp/:eventId", createRsvp)
// router.get("/my-rsvps",authenticateJWT, getUserRsvps)

module.exports = router