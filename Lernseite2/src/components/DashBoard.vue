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
  name: "DashBoardView",
  data() {
    return {
      currentDate: new Date().toLocaleDateString("de-DE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  },
};
</script>

<style scoped>
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
</style>
