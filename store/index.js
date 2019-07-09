const config = require('../config')

export const state = () => ({
    user : "SuperGuest",
    searchResults: [],
    userTvShows: []
  })
  
export const mutations = {
    setUser(state, user) {
        state.user= user
    },

    removeUser(state) {
        state.user= null
    },

    setSearchResults(state, results) {
        if (results == null) state.searchResults = []
        else {
            for (let i = 0; i < results.length; i++) state.searchResults.push(results[i])
        }
    },

    setUserTvShows(state, userTvShows){
        for (let i = 0; i < userTvShows.length; i++) state.userTvShows.push(userTvShows[i])
    },

    patchUserTvShow(state, patchedUserTvShow) {
        let userTvShow = state.userTvShows.find( c => c.tmdbID === patchedUserTvShow.tmdbID)
        userTvShow.lastEpisode = patchedUserTvShow.lastEpisode
        userTvShow.lastSeason = patchedUserTvShow.lastSeason
        userTvShow.status = patchedUserTvShow.status
    },

    addUserTvShow(state, addedUserTvShow) {
        state.userTvShows.push({
            tmdbID : addedUserTvShow.tmdbID,
            lastEpisode : addedUserTvShow.lastEpisode,
            lastSeason : addedUserTvShow.lastSeason,
            status : addedUserTvShow.status,
            title : addedUserTvShow.title 
        })
        state.searchResults.find( c => c.tmdbID === parseInt(addedUserTvShow.tmdbID)).message = "Added"
        state.searchResults.find( c => c.tmdbID === parseInt(addedUserTvShow.tmdbID)).isAdded = true
    },

}

export const getters = {
    numberOfResults: state => {
        return state.searchResults.length
    },

    numberOfUserTvShows: state => {
        return state.userTvShows.length
    }
}

export const actions = {
    // nuxtServerInit({ commit }, { req }) {
    //     if (req.session && req.session.authUser) {
    //       commit('SET_USER', req.session.authUser)
    //     }
    // },

    async login({ commit }, { userName }){

        let response
        try {
            response = await this.$axios.$get(config.baseURL + '/' + userName)
        }
        catch (err){
            response = err.response
        }
        finally {
            if (response.data.content) {
                commit('setUser', response.data.content.userName)
            }
        }
    },

    async setSearchResults({ commit }, results){
        commit('setSearchResults', null)
        commit('setSearchResults', results)
    },

    async emptySearchResults({commit}){
        commit('setSearchResults', null)
    },

    async setUserTvShows({commit}, userTvShows){
        commit('setUserTvShows', userTvShows)
    },

    async patchUserTvShow({commit}, patchedUserTvShow){
        commit('patchUserTvShow', patchedUserTvShow)
    },

    async addUserTvShow({commit}, addedUserTvShow){
        commit('addUserTvShow', addedUserTvShow)
    },

}