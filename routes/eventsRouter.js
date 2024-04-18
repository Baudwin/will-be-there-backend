const express = require("express");
const {
	getAllEvents,
	createEvent,
	getUserEvent,
	updateEvent,
	deleteEvent,
} = require("../controllers/eventController");
const router = express.Router();

router.route("/").get(getAllEvents).post(createEvent);

router.route("/:id").get(getUserEvent).patch(updateEvent).delete(deleteEvent);

module.exports = router;
