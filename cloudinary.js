import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();

//cloudinary configurration
cloudinary.config({
	cloud_name: "dtsrvbkrb",
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
