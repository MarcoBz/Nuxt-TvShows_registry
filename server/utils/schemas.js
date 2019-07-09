const mongoose = require("./mongoConnection")

tvShowSchema = new mongoose.Schema({
    tmdbID: String,
    lastSeason: Number,
    lastEpisode: Number,
    status: String,
    title: String,
    lastUpdate: {
        type: Date,
		default: Date.now,
    }
})

userSchema = new mongoose.Schema({
    userName: String,
    signUpDate:{
        type: Date,
		default: Date.now,
    }
})

module.exports.userSchema = userSchema
module.exports.tvShowSchema = tvShowSchema