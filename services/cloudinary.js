require('dotenv').config()
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'prasadbro', 
    api_key: process.env.cloudinary_api_key, 
    api_secret: process.env.cloudinary_api_secret 
  });

  module.exports.cloudinary = cloudinary