<template>
  <header>
   
    <nav>
      <router-link to="/" exact-active-class="active-link">Dashboard</router-link>
      <router-link to="/entry" exact-active-class="active-link">Neuer Eintrag</router-link>
      <router-link to="/entries" exact-active-class="active-link">Einträge</router-link>
      <router-link to="/todos" exact-active-class="active-link">To-Do-Liste</router-link>
      <router-link to="/documentation" exact-active-class="active-link">Technische Dokumentation</router-link>
      <router-link to="/dictionary" exact-active-class="active-link">IT-Wörterbuch</router-link>
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
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

nav a:hover {
  color: #c3b1e1;
}

nav a.active-link {
  background-color: #c3b1e1; /* Farbe für aktive Links */
  color: white;
}
</style>
