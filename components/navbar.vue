<template>
  <div class="container-fluid">
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="navbar-brand"><u>TvShow Registry</u></div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarCollapse">
          <nav class="navbar-nav mr-auto">
            <nuxt-link class="nuxt-link-class" to="/"> Search </nuxt-link>
            <nuxt-link class="nuxt-link-class" to="/watching">Watching</nuxt-link>
            <nuxt-link class="nuxt-link-class" to="/watchlist">Watchlist</nuxt-link>
            <nuxt-link class="nuxt-link-class" to="/login">Login</nuxt-link>
          </nav>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>

export default {
  components: {

  }
}
</script>

<style>

    .nuxt-link-class {
      box-sizing: border-box;
      margin: 0 5px;
      color: lightgray;
      text-decoration: none;
    }

</style>
