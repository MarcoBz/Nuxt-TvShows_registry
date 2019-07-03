const mongoose = require("./mongoConnection")
const schemas = require("./schemas")

userSchema = schemas.userSchema
tvShowSchema = schemas.tvShowSchema
const User = mongoose.model("User", userSchema)

async function query_user(userName){
    let userCollection = await User
        .findOne({
            userName : userName
        })
    return userCollection 
}

async function create_user(userName){

    userCollection = new User({
        userName : userName,
    })

    userCollection.save()
    return userCollection
}

async function add_tvShow(userID, tmdbID, title, lastEpisode, lastSeason){

    const TvShow = mongoose.model(userID + "_tvserie", tvShowSchema)

    let tvShowCollection = new TvShow({
        tmdbID: tmdbID,
        title: title,
        lastSeason: lastSeason,
        lastEpisode: lastEpisode,
        isStarted: isStarted
    })
    tvShowCollection.save()
    return tvShowCollection
}

async function query_tvShow(userID, tmdbID){

    const TvShow = mongoose.model(userID + "_tvserie", tvShowSchema)

    let tvShowCollection = await TvShow
    .findOne({
        tmdbID: tmdbID
    })
    return tvShowCollection 
}

async function query_allTvShows(userID){
    const TvShow = mongoose.model(userID + "_tvserie", tvShowSchema)
    let tvShowsCollection = await TvShow
    .find()
    .select({
        tmdbID: 1,
        title : 1,
        lastUpdate : 1,
        _id : 0
    })
    return tvShowsCollection
}

async function update_tvShow(userID, tmdbID, lastEpisode, lastSeason, isStarted){
    const TvShow = mongoose.model(userID + "_tvserie", tvShowSchema)

    let tvShowCollection = await TvShow
    .findOne({
        tmdbID: tmdbID
    })

    tvShowCollection.lastSeason = lastSeason
    tvShowCollection.lastEpisode = lastEpisode

    if (isStarted) tvShowCollection.lastEpisode = isStarted

    tvShowCollection.save()
    return tvShowCollection
}

module.exports.create_user = create_user
module.exports.query_user = query_user
module.exports.add_tvShow = add_tvShow
module.exports.query_tvShow = query_tvShow
module.exports.query_allTvShows = query_allTvShows
module.exports.update_tvShow = update_tvShow
