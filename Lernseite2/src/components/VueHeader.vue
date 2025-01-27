<template>
  <header>
    <div class="header-container">
      <!-- Button zum Öffnen/Schließen des Burger-Menüs -->
      <button class="menu-toggle" @click="toggleMenu" :class="{ open: menuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Button für Light-/Darkmode -->
      <button @click="$emit('toggleDarkMode')" class="theme-toggle">
        {{ isDarkMode ? '🌞' : '🌙' }}
      </button>
    </div>

    <nav :class="{ open: menuOpen }">
      <router-link to="/" exact-active-class="active-link">Dashboard</router-link>
      <router-link to="/entry" exact-active-class="active-link">Neuer Eintrag</router-link>
      <router-link to="/entries" exact-active-class="active-link">Einträge</router-link>
      <router-link to="/todos" exact-active-class="active-link">To-Do-Liste</router-link>
      <router-link to="/cards" exact-active-class="active-link">Karteikarten</router-link>
      <router-link to="/ringbook" exact-active-class="active-link">Hefteinträge</router-link>
      <router-link to="/documentation" exact-active-class="active-link"
        >Technische Dokumentation</router-link
      >
      <router-link to="/dictionary" exact-active-class="active-link">IT-Wörterbuch</router-link>
      <router-link to="/news" exact-active-class="active-link">Patchlogs</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'VueHeader',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
  },
}
</script>

<style scoped>
/*
   Alle festen Farben wurden durch var(--...) ersetzt,
   die du in App.vue oder einer globalen CSS-Datei definierst.
*/
header {
  background-color: var(--header-bg);
  padding: 1rem;
  border-bottom: 2px solid var(--header-border);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

/* Hier nutzen wir var(--text-color) für die Burger-Striche */
.menu-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--text-color);
  border-radius: 1px;
  transition: all 0.3s ease;
}

/* Burger-Animation unverändert */
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
  display: none;
  flex-direction: column;
  margin-top: 0.5rem;
}
nav.open {
  display: flex;
}

nav a {
  margin: 5px 0;
  text-decoration: none;
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
nav a:hover {
  color: var(--accent-color);
}
nav a.active-link {
  background-color: var(--accent-color);
  color: #fff; /* Falls du hier auch var(--text-color) nutzen willst, ist das okay */
}

/* Button zum Umschalten des Themas */
.theme-toggle {
  background-color: transparent;
  color: var(--text-color);
  border: 2px solid var(--accent-color);
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-left: 1rem;
  font-size: 1.5rem;
}
.theme-toggle:hover {
  background-color: var(--accent-color);
  color: #fff;
}

/* Responsive */
@media (min-width: 1200px) {
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
