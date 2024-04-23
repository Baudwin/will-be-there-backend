const Event = require("./../models/eventModel");

exports.getAllEvents = async (req, res) => {
	try {
		const events = await Event.find();
		res.status(200).json({
			status: "success",
			results: events.length,
			data: {
				events,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error,
		});
	}
};
exports.createEvent = async (req, res) => {
	try {
		const { eventName, location, description, eventImgUrl, date, time } =
			req.body;
		const newEvent = await Event.create({
			eventName,
			location,
			description,
			eventImgUrl,
			date,
			time,
		});
		res.status(201).json({
			status: "success",
			data: {
				event: newEvent,
			},
		});
	} catch (error) {
		// console.log(error);
		res.status(400).json({
			status: "fail",
			message: "Pls fill in the correct requirements" + error,
		});
	}
};
exports.getUserEvent = async (req, res) => {
	try {
		const events = await Event.findById(req.params.id);
		res.status(200).json({
			status: "success",
			results: events.length,
			data: {
				events,
			},
		});
	} catch (error) {
		res.status(404).json({
			message: error,
		});
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
				status: "fail",
				message: "Event not found",
			});
		}

		res.status(200).json({
			status: "success",
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
		res.status(404).json({
			message: error,
		});
	}
};
