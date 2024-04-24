import { v2 as cloudinary } from "cloudinary";

//cloudinary configurration
cloudinary.config({
	cloud_name: "dtsrvbkrb",
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
