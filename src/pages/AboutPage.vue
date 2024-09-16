<template>
  <div class="about">
    <h1>About Us</h1>
    <p>
      Welcome to our application! This project is a Vue.js, Node.js, MySQL-based application that demonstrates various features and functionalities as per the project specifications.
    </p>
    <p>
      Our application allows users to view, add, and manage recipes, favorite recipes, and view detailed recipe information.
    </p>
    <p>
      <b> Link to the Frontend part of the project in GitHub (2.1): </b>
      <a href="https://github.com/WED-2023/assignment2-1-209969245_213047285" target="_blank">Frontend GitHub Repository</a>
    </p>
    <p>
      <b> Link to the Backend part of the project in GitHub (2.3): </b>
      <a href="https://github.com/WED-2023/assignment2-3-209969245_213047285" target="_blank">Backend GitHub Repository</a>
    </p>
    <h2>Features</h2>
    <ul>
      <li>User authentication (registration, login, logout)</li>
      <li>View recipes preview</li>
      <li>View detailed recipe information</li>
      <li>Manage favorite recipes</li>
      <li>Manage personal recipes</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
};
</script>

<style scoped>
.about {
  padding: 20px;
}

h1 {
  color: #42b983;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>


