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

router.get("/allevents", getAllEvents);
router.post("/createEvent", uploadUserImg, createEvent);

router.get("/:userId", getUserEvent);
router.patch("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent);

module.exports = router;
