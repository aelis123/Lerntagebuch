<template>
  <footer>
    <p>&copy; 09.12.2024 - 21.02.2025 A.E.
      <br>
      <a href="https://myworld-c9ad.onrender.com/" target="_blank">Über die Erstellerin dieser Website</a> 
    </p>
  </footer>
</template>

<script>
export default {
  name: "VueFooter",
};
</script>

<style scoped>
footer {
  text-align: center;
  padding: 1rem;
  background-color: #ededed;
  border-top: 2px solid #c3b1e1;
  margin-top: 2rem;
}
a {
    color: #b9a9e8;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  a:hover {
    color: #8274b2;
  }
</style>
