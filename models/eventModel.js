const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
	eventName: {
		type: String,
		required: true,
	},
	eventDate: {
		type: String,
		required: true,
	},
	eventTime: {
		type: String,
		required: true,
	},

	description: {
		type: String,
		required: false,
	},
	eventImgUrl: {
		type: String,
		required: true,
	},
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
