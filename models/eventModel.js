const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
	eventName: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: false,
	},
	date: {
		type: String,
		required: true,
	},
	time: {
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
	location: {
		type: String,
		required: true,
	},
	eventLink: {
		type: String,
		required: false,
	},
});


// Pre-save hook to generate the event link
eventSchema.pre('save', function(next) {
	const eventId = this._id 
	// Construct the event link with the event ID
	const eventLink = `http://localhost:5178/rsvp/${eventId}`;
  
	// Assign the event link to the eventLink field
	this.eventLink = eventLink;
  
	next();
  });

  module.exports = mongoose.model("Event", eventSchema);
