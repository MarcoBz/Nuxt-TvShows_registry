<template>
  <div class="container-fluid">
    <div class = "row">
      <div class = "col text-center ">
        Search your Tv Show
      </div>
    </div>
    <div class = "row">
      <div class = "col text-center ">
        <input type="text" placeholder="Search Title.."  v-model="title">
      </div>
    </div>
    <div class = "row">
      <div class = "col text-center ">
        <nuxt-link :to="{ name: 'search-searchtitle', params: { searchtitle: joinedTitle } }">
          Search
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import config from "~/config.js";
export default {
  data () {
    return {
      title: null,
      joinedTitle: null
    }
  },

  async fetch ({ store }) {
    

    if (store.getters.numberOfUserTvShows == 0){
      const { data } = await axios.get(`${config.baseURL}/user/${store.state.user}/tvshow`)
      let userTvShows = []
      for (let i = 0; i < data.content.length; i++){
        userTvShows.push(data.content[i])
      }
      await store.dispatch('setUserTvShows', userTvShows);
    }

  },

  watch: {
    title: function(val){
      this.joinedTitle = val.split(' ').join('+')
    }
  }

}
</script>

<style>
</style>
