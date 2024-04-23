const express = require("express");
const multer = require("multer");
const {
	getAllEvents,
	createEvent,
	getUserEvent,
	updateEvent,
	deleteEvent,
} = require("../controllers/eventController");
const upload = multer({ dest: "public/uploads/events" });
const router = express.Router();

router.get("/allevents", getAllEvents);
router.post("/createEvent", upload.single("img"), createEvent);

router.get("/:userId", getUserEvent);
router.patch("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent);

module.exports = router;
