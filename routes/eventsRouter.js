const express = require("express");
const router = express.Router();
require('../strategies/JwtStrategy')
const {getAllEvents,createEvent,getUserEvent,updateEvent,deleteEvent,uploadEventImg,getSingleEvent} = require("../controllers/eventController");


// const authenticateJWT = require("../middleware/authenticateJwt");

router.get("/all-events", getAllEvents);

router.post("/create-event", uploadEventImg,  createEvent);

router.get("/my-events", getUserEvent);

router.get("/event/:eventId", getSingleEvent);


router.patch("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent);

module.exports = router;
