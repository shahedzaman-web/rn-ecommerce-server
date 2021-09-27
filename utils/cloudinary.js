const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");


const { CLOUD_NAME,API_KEY,API_SECRET } = process.env;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true
  });


  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "rn-ecommerce",
    },
  });
  
  exports.upload = multer({ storage: storage });


