import { v2 as cloudinary } from "cloudinary";

//cloudinary configurration
cloudinary.config({
	cloud_name: "dtsrvbkrb",
	api_key: "746269396443457",
	api_secret: "KSGinkABtM40FuK1Hl6Ldq7GvMA",
});

module.exports = cloudinary;
