<template>
  <section class="dashboard">
    <h2>Willkommen!</h2>
    <p>Heute ist: {{ currentDate }}</p>
    <router-link to="/entry">
      <button>Neuen Eintrag hinzufügen</button>
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'DashBoardView',
  data() {
    return {
      currentDate: new Date().toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    }
  },
}
</script>

<style>
/*
   Da hier kein `scoped` steht, sind alle Stile global wirksam
   und können direkt per .dark-mode .dashboard greifen.
*/

/* --- Lightmode (Standard) --- */
.dashboard {
  padding: 1.5rem;
  text-align: center;
}

button {
  background-color: #c3b1e1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #a896c8;
}

/* --- Darkmode-Styles ---
   Greifen, sobald dein <div id="app"> in `App.vue`
   die Klasse `.dark-mode` bekommt.
*/
.dark-mode .dashboard {
  background-color: #333;
  color: #f5f5f5;
}

.dark-mode .dashboard button {
  background-color: #666;
  color: #fff;
}

.dark-mode .dashboard button:hover {
  background-color: #555;
}
</style>
