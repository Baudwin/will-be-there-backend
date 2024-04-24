const Event = require("./../models/eventModel");
const multer = require("multer");

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads/events");
	},
	filename: (req, file, cb) => {
		//
	},
});
const upload = multer({ dest: "public/uploads/events" });

exports.uploadUserImg = upload.single("img");
exports.getAllEvents = async (req, res) => {
	try {
		const events = await Event.find();
		res.status(200).json({
			data: {
				events,
			},
		});
	} catch (error) {
		res.status(404).json(error.message);
	}
};


exports.createEvent = async (req, res) => {
	console.log(req.file);
	console.log(req.body);
	try {
		const { userId } = req.user;
		const { eventName, location, description, eventImgUrl, date, time } =
			req.body;
		const newEvent = await Event.create({
			eventName,
			location,
			description,
			eventImgUrl,
			date,
			time,
			user: userId,
		});
		res.status(201).json({
			data: newEvent,
		});
	} catch (error) {
		// console.log(error);
		res.status(400).json(error.message);
	}
};


exports.getUserEvent = async (req, res) => {
	try {
		const { userId } = req.user;
		// Find events for the logged-in user
		const events = await Event.find({ user: userId });
		res.status(200).json({
			data: events,
		});
	} catch (error) {
		res.status(404).json(error.message);
	}
};


exports.updateEvent = async (req, res) => {
	try {
		const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!event) {
			return res.status(404).json({
				message: "Event not found",
			});
		}

		res.status(200).json({
			data: {
				message: "Event updated successfully",
				event: event,
			},
		});
	} catch (error) {
		res.status(400).json({
			message: "Failed to update event: " + error.message,
		});
	}
};


exports.deleteEvent = async (req, res) => {
	try {
		await Event.findByIdAndDelete(req.params.id);
		res.status(204).json({
			data: null,
		});
	} catch (error) {
		res.status(400).json({
			message: "Failed to delete event: " + error.message,
		});
	}
};
