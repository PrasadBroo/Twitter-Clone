const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'prasadbro', 
    api_key: '243555688199254', 
    api_secret: 'aOQnV-sLoh3A0DRHpgv21P2Ebg0' 
  });

  module.exports.cloudinary = cloudinary