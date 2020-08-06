<template>
  <div id="app">
    <Amphi_places msg="Placements:" />
  </div>
</template>

<script>
//import Amphi from "./components/Amphi.vue";
import Amphi_places from "./components/Amphi_places.vue";

export default {
  name: "App",
  components: {
    Amphi_places
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
  margin-top: 20px;
}
</style>
