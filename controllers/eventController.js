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
		const newEvent = await Event.create(req.body);
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
			message: "Pls fill in the correct requirements",
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
			status: "fail",
			message: error,
		});
	}
};
exports.updateEvent = async (req, res) => {
	const event = Event.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	try {
		res.status(200).json({
			status: "success",
			data: {
				message: "event updated successfully",
			},
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error,
		});
	}
};
exports.deleteEvent = async (req, res) => {
	try {
		await Event.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: "success",
			data: null,
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error,
		});
	}
};
