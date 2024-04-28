const express = require("express");
const {
	getAllEvents,
	createEvent,
	getUserEvent,
	updateEvent,
	deleteEvent,
	uploadEventImg,
	getSingleEvent,
} = require("../controllers/eventController");

const router = express.Router();
const authenticateJWT = require("../middleware/authenticateJwt");

router.get("/all-events", getAllEvents);

router.post("/create-event", uploadEventImg, authenticateJWT, createEvent);

router.get("/my-events",authenticateJWT, getUserEvent);

router.get("/event/:eventId", getSingleEvent);


router.patch("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent);

module.exports = router;
