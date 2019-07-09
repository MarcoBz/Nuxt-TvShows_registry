<template>
  <div class="container-fluid">
      <div class="row border" v-if="!userTvShow">
        <div class="col-sm-12 text-left">
          <div class="form-check">
            <label>
              <input class="form-check-input" type="checkbox" value="greyCheck" :disabled="startedTvShow" @click="clickWatchlistCheckBox">
              <span>Do you want to add this TV Show in your watchlist?</span>
            </label>
          </div>
        </div>
      </div>
      <div class="row border">
        <div class="col-sm-12 text-left">
          <div class="row" v-if="!userTvShow">
            <div class="col-sm-12 text-left">
              <div class="form-check">
                <label>
                  <input class="form-check-input" type="checkbox" value="whiteCheck" :disabled="watchlistTvShow" @click="clickStartedCheckBox" >
                  <span>Have you started this TV show?</span>
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputSeason" class="col-sm-1 col-form-label">Season:</label>
            <div class="col-sm-1">
              <input class="form-control" id="inputSeason" placeholder="1" :disabled="watchlistTvShow || !startedTvShow" v-model="season" >
            </div>
            <label for="inputEpisode" class="col-sm-1 col-form-label">Episode:</label>
            <div class="col-sm-1">
              <input class="form-control" id="inputEpisode" placeholder="1" :disabled="watchlistTvShow || !startedTvShow" v-model="episode">
            </div>
            <div class="col-sm-8"></div>
          </div>
          <div class="row">
            <div class="col-sm-12 text-left">
              <div class="form-check">
                <label>
                  <input class="form-check-input" type="radio" name="action" value="greenCheck" :disabled="watchlistTvShow || !startedTvShow" v-model="checkedBox">
                  <span>Seen until last episode of this TV show</span>
                </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 text-left">
              <div class="form-check">
                <label>
                  <input class="form-check-input" type="radio" name="action" value="yellowCheck" :disabled="watchlistTvShow || !startedTvShow" v-model="checkedBox">
                  <span>At somepoint in the middle of this TV show</span>
                </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 text-left">
              <div class="form-check">
                <label>
                  <input class="form-check-input" type="radio" name="action" value="redCheck" :disabled="watchlistTvShow || !startedTvShow" v-model="checkedBox">
                  <span>Stopped for the moment this TV show</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row border">
        <div class="col-sm-12 text-center">
          <button class="btn btn-success" @click="submit"> Submit </button>
        </div>
      </div>
  </div>
</template>

<script>

import axios from 'axios'
import config from "~/config.js";

export default {

  name: "UserAction",
  props: ['tmdbID'],

  data() {
    return{
      startedTvShow: false,
      watchlistTvShow: false,
      season: null,
      episode: null,
      checkedBox: null
    }
  },


  components: {
  },

  computed: {

    userTvShow(){
      return this.$store.state.userTvShows.find(c => c.tmdbID === this.tmdbID)
    },

    user(){
      return this.$store.state.user
    }

  },

  methods: {

    clickWatchlistCheckBox(){
      this.watchlistTvShow = !this.watchlistTvShow
    },
    clickStartedCheckBox(){
      this.startedTvShow = !this.startedTvShow
    },
    async submit(){

      if (this.userTvShow){

        let body = {
          op: "replace",
          lastEpisode: this.episode,
          lastSeason:  this.season,
          status: this.checkedBox
        }

        let response

        try{
          response = await axios.patch(`${config.baseURL}/user/${store.state.user}/tvshow?tmdbID=${this.tmdbID}`, body)
        }
        catch (err){
          response = err.response
        }
        finally {
          if (response.status === 200){
            if(response.data.content.lastEpisode == body.lastEpisode && response.data.content.lastSeason == body.lastSeason && response.data.content.status == body.status && response.data.content.tmdbID == this.tmdbID ){
              let patchedUserTvShow = {
                lastEpisode: this.episode,
                lastSeason:  this.season,
                status: this.checkedBox,
                tmdbID: this.tmdbID
              }
              await this.$store.dispatch("patchUserTvShow", patchedUserTvShow)
            }
          }
        }
      }

      else{
        let body
        if(this.watchlistTvShow){
          body = {
            tmdbID: this.tmdbID,
            title: this.$store.state.searchResults.find(c => c.tmdbID === this.tmdbID).title,
            lastEpisode: 0,
            lastSeason:  0,
            status: "greyCheck"
          }          
        }

        else {
          body = {
            tmdbID: this.tmdbID,
            title: this.$store.state.searchResults.find(c => c.tmdbID === this.tmdbID).title,
            lastEpisode: this.episode ? this.episode : 1,
            lastSeason:  this.season ? this.season : 1,
            status: this.checkedBox ? this.checkedBox : "yellowCheck"
          } 
        }  
        console.log(body)
        let response
        try{
          response = await axios.post(`${config.baseURL}/user/${this.$store.state.user}/tvshow?tmdbID=${this.tmdbID}`, body)
          console.log(response)

        }
        catch (err){
          response = err.response
        }
        finally {
          if (response.status === 201){
            if(response.data.content.lastEpisode == body.lastEpisode && response.data.content.lastSeason == body.lastSeason && response.data.content.status == body.status && response.data.content.tmdbID == this.tmdbID ){
              console.log('inside')
              let addedUserTvShow = {
                title: response.data.content.title,
                lastEpisode: response.data.content.lastEpisode,
                lastSeason:  response.data.content.lastSeason,
                status: response.data.content.status,
                tmdbID: this.tmdbID
              }
              await this.$store.dispatch("addUserTvShow", addedUserTvShow)
            }
          }
        }          
      }

    }
  }

}
</script>

<style>

</style>
