<template>
  <div class="container-fluid">
      <div class= "row" v-for = "index in $store.getters.numberOfResults">
        <div class="col">
          <searched-tv-show v-bind:index="index-1" />
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from "~/config.js";
import SearchedTvShow from "~/components/SearchedTvShow.vue"


export default {

  components: {
    SearchedTvShow
  },

  async fetch ({ store, params }) {
    
    if (store.getters.numberOfUserTvShows == 0){
      const { data } = await axios.get(`${config.baseURL}/user/${store.state.user}/tvshow`)
      let userTvShows = []
      for (let i = 0; i < data.content.length; i++){
        userTvShows.push(data.content[i])
      }
      await store.dispatch('setUserTvShows', userTvShows);
    }

    await store.dispatch('emptySearchResults');
    const { data } = await axios.get(`${config.baseTmdbURL}search/tv?api_key=${config.apiKey}&query=${params.searchtitle}`)
    let searchResults = []
    for (let i = 0; i < data.results.length; i++){
      let result = {
        tmdbID: data.results[i].id,
        title: data.results[i].original_name,
        airDate: data.results[i].first_air_date.split('-')[0],
        country: data.results[i].origin_country.join(),
        overview: data.results[i].overview,
        message: "Add",
        isAdded: false
      }
      searchResults.push(result)
    }

    for (let i = 0; i <store.state.userTvShows.length; i++){
      if(searchResults.find( c => c.tmdbID === parseInt(store.state.userTvShows[i].tmdbID))){
        searchResults.find( c => c.tmdbID === parseInt(store.state.userTvShows[i].tmdbID)).message = "Added"
        searchResults.find( c => c.tmdbID === parseInt(store.state.userTvShows[i].tmdbID)).isAdded = true
      }
    }
    await store.dispatch('setSearchResults', searchResults);
  },

}
</script>

<style>
</style>
