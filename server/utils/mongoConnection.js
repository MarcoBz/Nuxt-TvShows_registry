const mongoose = require("mongoose")
let mongodb_dev = "mongodb://localhost:27017/TvShows_Registry"

mongoose.connect( mongodb_dev, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDb"))
    .catch(err => console.error("Connection failed", err))

module.exports = mongoose