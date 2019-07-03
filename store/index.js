const config = require('../config')

export const state = () => ({
    user : null
  })
  
export const mutations = {
    setUser(state, user) {
        state.user= user
    },

    removeUser(state) {
        state.user= null
    },

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
            console.log(response)
        }
        finally {
            if (response.data.content) {
                commit('setUset', response.data.content.userName)
                console.log(response.data.content.userName)
            }
        }
    }

}