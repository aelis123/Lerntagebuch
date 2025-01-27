<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <VueHeader :isDarkMode="isDarkMode" @toggleDarkMode="toggleDarkMode" />
    <router-view />
    <VueFooter />
  </div>
</template>

<script>
import VueHeader from './components/VueHeader.vue'
import VueFooter from './components/VueFooter.vue'

export default {
  name: 'App',
  components: {
    VueHeader,
    VueFooter,
  },
  data() {
    return {
      isDarkMode: false,
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      console.log('Dark mode ist nun:', this.isDarkMode)
    },
  },
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #000; /* oder deine gewünschte Dark-Hintergrundfarbe */
}
/*
  1) Standardwerte im :root
     (gilt, wenn KEIN .dark-mode aktiv ist)
*/
:root {
  --bg-color: #f5f5f5;
  --text-color: #333333;

  /* Wenn du bestimmte Bereiche unterschiedlich färben willst: */
  --header-bg: #ededed;
  --footer-bg: #ededed;
  --dashboard-bg: #fefcfb;
  --button-bg: #c3b1e1;
  --button-color: #ffffff;
}

/*
  2) Darkmode: Sobald .dark-mode aktiv ist,
     überschreiben wir obige Variablen
*/
.dark-mode {
  --bg-color: #333333;
  --text-color: #f5f5f5;

  --header-bg: #444444;
  --footer-bg: #444444;
  --dashboard-bg: #444444;
  --button-bg: #666666;
  --button-color: #ffffff;
}

/*
  3) Das #app selbst nutzt var(--bg-color) und var(--text-color).
     Alle Child-Komponenten können ebenfalls var(...)-Werte nehmen.
*/
#app {
  font-family: 'Roboto', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
</style>
