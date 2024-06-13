<template>
    <div class="about">
      <h1>About Us</h1>
      <p>
        Welcome to our application! This project is a Vue.js based application that demonstrates various features and functionalities as per the project specifications.
      </p>
      <p>
        Our application allows users to view, add, and manage recipes, favorite recipes, and view detailed recipe information.
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
  </style>
  