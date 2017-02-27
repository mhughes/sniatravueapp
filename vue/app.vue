<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="offcanvas">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/"><img src="/images/logo_panorama.png" /></a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <form class="navbar-form navbar-right" role="search" v-if="authenticated">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Buscar..." v-model="query" :disabled="searchDisabled" v-on:keyup.enter="search(query)">
              <input type="text" style="display:none;"><!-- VueJS is funny sometimes -->
              <span class="input-group-btn">
                <button v-bind:class="{ 'hidden': !query }" class="btn btn-default" type="button" v-on:click="clearSearch">X</button>
                <button class="btn btn-default" type="button" v-on:click="search(query)" :disabled="searchDisabled">Buscar</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        showModal:  false,
        authenticated: this.$root.auth.loggedIn(),
        query: null
      }
    },
    created: function() {
      this.search = this.$root.tools.genericSearch;
      this.$root.auth.onChange = authenticated => {
        this.authenticated = authenticated
      }
    },
    methods: {
      clearSearch: function() {
        this.query = null;
        this.$children[1].$children[0].getResults();
      },
    },
    computed: {
      searchDisabled: function() {
        if(this.$route.params.item_id || this.$route.path.indexOf('nuevo') != -1) {
          return true;
        } else {
          return false;
        }
      },
    }
  };
</script>
