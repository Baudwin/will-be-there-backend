import { v2 as cloudinary } from "cloudinary";
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require("dotenv").config();

//cloudinary configuration
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});




module.exports = cloudinary;
