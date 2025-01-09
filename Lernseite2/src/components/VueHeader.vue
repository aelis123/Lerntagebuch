<template>
  <header>
    <div class="header-container">

      <button class="menu-toggle" @click="toggleMenu" :class="{ open: menuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <nav :class="{ open: menuOpen }">
      <router-link to="/" exact-active-class="active-link">Dashboard</router-link>
      <router-link to="/entry" exact-active-class="active-link">Neuer Eintrag</router-link>
      <router-link to="/entries" exact-active-class="active-link">Einträge</router-link>
      <router-link to="/todos" exact-active-class="active-link">To-Do-Liste</router-link>
      <router-link to="/cards" exact-active-class="active-link">Karteikarten</router-link>
      <router-link to="/ringbook" exact-active-class="active-link">Hefteinträge</router-link>
      <router-link to="/documentation" exact-active-class="active-link">Technische Dokumentation</router-link>
      <router-link to="/dictionary" exact-active-class="active-link">IT-Wörterbuch</router-link>
      <router-link to="/news" exact-active-class="active-link">Patchlogs</router-link>



    </nav>
  </header>
</template>

<script>
export default {
  name: "VueHeader",
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style scoped>
header {
  background-color: #ededed;
  padding: 1rem;
  border-bottom: 2px solid #c3b1e1;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
  color: #c3b1e1;
  font-size: 1.5rem;
}

.menu-toggle {
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  padding: 0;
  position: relative;

}

.menu-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #333333;
  border-radius: 1px;
  transition: all 0.3s ease;
}

.menu-toggle.open span:nth-child(1) {
  transform: rotate(45deg) translateY(20px);
}

.menu-toggle.open span:nth-child(2) {
  transform: rotate(90deg) translateY(6px);
  opacity: 0;
}

.menu-toggle.open span:nth-child(3) {
  transform: rotate(-45deg) translateY(-20px);
  opacity: 50;
}

nav {
  display: none; /* Standardmäßig verstecken */
  flex-direction: column;
  margin-top: 0.5rem;
}

nav.open {
  display: flex; /* Sichtbar machen, wenn das Menü geöffnet ist */
}

nav a {
  margin: 5px 0;
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

@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }

  nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  nav a {
    margin: 0 10px;
  }
}
</style>
