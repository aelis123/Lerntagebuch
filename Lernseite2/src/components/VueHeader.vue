<template>
  <header>
    <h1>Lerntagebuch</h1>
    <nav>
  <router-link to="/">Dashboard</router-link>
  <router-link to="/entry">Neuer Eintrag</router-link>
  <router-link to="/entries">Einträge</router-link>
  <router-link to="/todos">To-Do-Liste</router-link>

</nav>

  </header>
</template>

<script>
export default {
  name: "VueHeader",
};
</script>

<style scoped>
header {
  background-color: #ededed;
  padding: 1rem;
  text-align: center;
  border-bottom: 2px solid #c3b1e1;
}

h1 {
  margin: 0;
  color: #c3b1e1;
}

nav {
  margin-top: 0.5rem;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333333;
}

nav a:hover {
  color: #c3b1e1;
}
</style>
