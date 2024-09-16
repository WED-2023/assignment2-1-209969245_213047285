<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <img src="../src/assets/icon.png" alt="WhiteHeadChef Icon" style="height: 60px; margin-right: 10px;">
      <b-navbar-brand :to="{ name: 'main' }">Home</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
          <b-nav-text>Hello Guest</b-nav-text>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>  
          <b-nav-item-dropdown>
            <template #button-content>
              Personal
            </template>
            <b-dropdown-item :to="{ name: 'myRecipes' }">My Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'favoriteRecipes' }">Favorite Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'familyRecipes' }">Family Recipes</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <template #button-content>
              User
            </template>
            <b-dropdown-item>
              {{ $root.store.username }}: <button @click="Logout">Logout</button> |
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-text>Hello {{ $root.store.username }}</b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
      <div class="content-container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");   
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;


  
  background-image: url('../src/assets/background.jpg'); 
  background-repeat: repeat; /* Ensure the image repeats */
  background-position: top left;
  background-size: 250px 250px; /* Let the image use its original size for repeating */
  min-height: 100vh; /* Make sure the background covers the entire viewport */
  margin: 0;
  padding: 0;


  /* White box content container */
.content-container {
  background-color: white;
  margin: 0 auto; /* Center the container horizontally */
  width: 80%; /* You can adjust the width here */
  max-width: 1200px; /* Set a maximum width */
  padding: 20px; /* Add padding inside the box */
  flex-grow: 1; /* Ensures the content container grows to fill available space */
}

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
