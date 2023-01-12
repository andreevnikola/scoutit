
const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: 'dqpgstfsc',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = cloudinary;