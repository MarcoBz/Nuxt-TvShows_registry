<template>
  <div class="container-fluid">
    <div class= "row" v-if="result">
      <div class="col col-10 text-left" >
        <p><p><u>"{{result.title}}"</u> ({{result.airDate}} - {{result.country}})</p></b>
        <p>{{result.overview}}</p>
      </div>
      <div v-if="user" class="col col-2 text-left">
        <button class="btn btn-success" v-bind:disabled= "result.isAdded" v-on:click="showUserAction = true">{{result.message}}</button>
      </div>
    </div>
    <div class= "row" v-if="showUserAction && $store.state.searchResults.find( c => c.tmdbID === parseInt(result.tmdbID)).message != 'Added'">
      <div class="col" >
        <user-action v-bind:tmdbID="result.tmdbID" />
      </div>
    </div>
  </div>
</template>

<script>
import UserAction from "~/components/UserAction.vue"

export default {
  name: "SearchedTvShow",
  props: ['index'],

    data () {
    return {
      showUserAction: false
    }
  },

  components: {
    UserAction
  },

  computed: {
    
    result() {
      return this.$store.state.searchResults[this.index]
    },

    user(){
      return this.$store.state.user
    }

  },

  watch: {
    '$store.state.searchResults': () => {
      console.log('test', this.index)
      this.result = this.$store.state.searchResults[this.index]
    }
  },

  methods: {

  }

}
</script>

<style>

</style>
