const express = require("express");
const {
	getAllEvents,
	createEvent,
	getUserEvent,
	updateEvent,
	deleteEvent,
	uploadUserImg,
} = require("../controllers/eventController");
const router = express.Router();
const authenticateJWT = require("../middleware/authenticateJwt");

router.get("/all-events", getAllEvents);
router.post("/create-event",authenticateJWT, uploadUserImg, createEvent);

router.get("/:userId", getUserEvent);
router.patch("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent);

module.exports = router;
