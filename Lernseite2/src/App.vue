<template>
  <div id="app">
    <VueHeader />
    <router-view />
    <VueFooter />
  </div>
</template>

<script>
import VueHeader from "./components/VueHeader.vue";
import VueFooter from "./components/VueFooter.vue";

export default {
  components: {
    VueHeader,
    VueFooter,
  },
};
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  background-color: #f5f5f5;
  color: #333333;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
