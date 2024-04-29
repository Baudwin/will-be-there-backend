const uploadFunction = require('../supabaseSetup')
const Event = require("./../models/eventModel");
const Rsvp = require('../models/rsvpModel')
const multer = require("multer");
const upload = multer()


module.exports = {

uploadEventImg : upload.single("img"), 

getAllEvents : async (req, res) => {
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
},


getSingleEvent: async (req,res)=>{
	const {eventId} = req.params
try {
	const event = await Event.findOne({_id:eventId})
	res.status(200).json(event);
} catch (error) {
	res.status(404).json({msg:error.message})
}
},

createEvent: async (req, res) => {
	try {
		const { eventName, location, description, date, time } =req.body;
		const { _id } = req.user;
		if (!eventName.trim() || !location.trim() || !date.trim() || !time.trim()) {
            throw Error( "All fields must be provided!")
        }

		// supabase upload setupp 
		const data = await uploadFunction(req.file.originalname, req.file.buffer, req.file.mimetype) 
		const  eventImgUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`
		const newEvent = await Event.create({
			eventName,
			location,
			description,
			eventImgUrl,
			date,
			time,
			user: _id
		});

		res.status(201).json({
			data: newEvent,
		});
	} catch (error) {
		res.status(400).json(error);
	}
},


getUserEvent: async (req, res) => {
	
	try {
		const { _id } = req.user;
		// Find events for the logged-in user
		const events = await Event.find({ user: _id });
		       // Fetch RSVPs for each event
			   const eventsAndRsvps = [];
			   for (const event of events) {
				   const rsvps = await Rsvp.find({eventID: event._id});
				   eventsAndRsvps.push({ event, rsvps });
			   }
		res.status(200).json(eventsAndRsvps);
	} catch (error) {
		res.status(404).json({msg:error.message});
	}
},


updateEvent: async (req, res) => {
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
},


 deleteEvent : async (req, res) => {
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
}

	
}