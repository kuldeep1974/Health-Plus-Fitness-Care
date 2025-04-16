const cloudinary = require("cloudinary").v2
const config = require("config")
cloudinary.config({
    cloud_name: config.get("cloudName"),
    api_key: config.get("apiKey"),
    api_secret: config.get("apiSecret"),
})
module.exports = cloudinary;