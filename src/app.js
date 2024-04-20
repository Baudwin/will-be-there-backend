const express = require("express");
const eventRouter = require("../routes/eventsRouter");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/events/", eventRouter);

app.use(
	cors({
		origin: ["Front end address goes here"],
		methods: ["POST", "GET", "PATCH", "DELETE"],
		credentials: true,
	})
);

mongoose
	.connect("mongodb atlas uri here")
	.then(() => {
		// if server is connected to mongo db atlas
		app.listen(port, () => {
			console.log(`db connected & server running on port ${port}`);
		});
	})
	.catch((err) => {
		// if there was an error in connecting to mongo db atlas start server only
		app.listen(port, () => {
			console.log(`${err}server running on port ${port}`);
		});
	});
