<template>
  <div id="app">
    <header>
      <h1 v-text="sitename"></h1>
    </header>
  </div>
</template>

<script>
export default {
  el: '#app',
  name: 'app',
  data () {
    return {
      sitename: 'Vue.js'
    }
  }
}
</script>

<style>
</style>
