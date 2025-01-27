<template>
  <footer>
    <p>
      &copy; 09.12.2024 - 21.02.2025 A.E.
      <br />
      <a href="https://myworld-c9ad.onrender.com/" target="_blank">
        Über die Erstellerin dieser Website
      </a>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'VueFooter',
}
</script>

<style scoped>
footer {
  text-align: center;
  padding: 1rem;
  /* Nutze nun var(--footer-bg) */
  background-color: var(--footer-bg);
  /* Optional: border-top: 2px solid var(--some-border-color); */
  margin-top: 2rem;
  color: var(--text-color);
}

a {
  color: var(--button-bg); /* oder var(--text-color) oder was du magst */
  text-decoration: none;
}
</style>
