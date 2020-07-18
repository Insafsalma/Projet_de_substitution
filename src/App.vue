<template>
  <div id="app">
    <Amphi msg="Création de l'amphi:" />
  </div>
</template>

<script>
import Amphi from "./components/Amphi.vue";

export default {
  name: "App",
  components: {
    Amphi
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
