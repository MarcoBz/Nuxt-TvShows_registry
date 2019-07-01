const mongoose = require("../mongoConnection")

tvShowSchema = new mongoose.Schema({
    tmdbID: String,
    lastSeason: Number,
    lastEpisode: Number,
    watchList: Boolean,
    currentWatch: Boolean,
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
module.exports.resultSchema = resultSchema