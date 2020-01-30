<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

  export default {
    name: 'gitonika',
    methods: {
      ...mapActions({
        SetPath: 'SetPath'
      })
    }
  }
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  width: 100vw;
  background-color: #292833;
  overflow: hidden;
}
</style>
