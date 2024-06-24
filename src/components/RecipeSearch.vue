<template>
  <div class="search-container">
    <div v-if="isLoggedIn">
      <h2>Your Most Recent Search</h2>
      <div v-if="recentSearch">
        <p>{{ recentSearch }}</p>
      </div>
      <div v-else>
        <p>You have no recent searches.</p>
      </div>
    </div>

    <div class="recipe-search-container">
      <div class="search-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search recipes"
          v-model="searchQuery"
          @input="onSearch"
        />
        <button class="btn btn-outline-secondary" type="button" @click="onSearch">Search</button>
      </div>
      
  
      <label class="input-label">Search Amount:</label>
      <div class="input-group mb-3">
        <select class="form-select" v-model="resultAmount">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
  
      <label class="input-label">Select Cuisine:</label>
      <div class="input-group mb-3">
        <select class="form-select" v-model="selectedCuisine">
          <option value="">All</option>
          <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
        </select>
      </div>
  
      <label class="input-label">Select Diet:</label>
      <div class="input-group mb-3">
        <select class="form-select" v-model="selectedDiet">
          <option value="">All</option>
          <option v-for="diet in diets" :key="diet" :value="diet">{{ diet }}</option>
        </select>
      </div>
  
      <label class="input-label">Select Intolerance:</label>
      <div class="input-group mb-3">
        <select class="form-select" v-model="selectedIntolerance">
          <option value="">All</option>
          <option v-for="intolerance in intolerances" :key="intolerance" :value="intolerance">{{ intolerance }}</option>
        </select>
      </div>
  
      <label class="input-label">Sort by:</label>
      <div class="input-group mb-3">
        <select class="form-select" v-model="sortBy">
          <option value="time">Preparation Time</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
  
      <RecipePreviewList
        title="Results"
        :amount="resultAmount"
        previewType=""
        class="My Recipes Center"
        :recipes="recipeResultsList"
      />
    </div>
  </div>
  </template>
  
  <script>
  import RecipePreviewList from './RecipePreviewList.vue';
  import { mockGetFilteredRecipes } from "../services/recipes.js";
  
  export default {
    components: { RecipePreviewList },
    data() {
      return {
        recentSearch: null,
        searchQuery: '',
        resultAmount: 5,
        selectedCuisine: '',
        selectedDiet: '',
        selectedIntolerance: '',
        sortBy: 'time',
        recipeResultsList: [],
        isLoggedIn: false, // Set to true when user is logged in
        lastSearchQuery: '', // Initialize last search query from local storage
        cuisines: [
          'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European',
          'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish',
          'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern',
          'Spanish', 'Thai', 'Vietnamese'
        ],
        diets: [
          'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan',
          'Pescatarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'
        ],
        intolerances: [
          'Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy',
          'Sulfite', 'Tree Nut', 'Wheat'
        ],
      };
    },

    created() {
    // Check if user is logged in
    this.isLoggedIn = this.$root.loggedIn;

    // Load last search query from local storage
    this.recentSearch = this.loadLastSearch();
  },

    methods: {
      onSearch() {
        const filters = {
          query: this.searchQuery,
          amount: this.resultAmount,
          cuisine: this.selectedCuisine,
          diet: this.selectedDiet,
          intolerance: this.selectedIntolerance,
          sortBy: this.sortBy,
        };
  
        const response = mockGetFilteredRecipes(this.resultAmount);
        const recipes = response.data.recipes;
        this.recipeResultsList = recipes;

      // Save search query to local storage
      this.saveLastSearch(this.searchQuery);
      },
      saveLastSearch(query) {
      // Save last search query to local storage
      localStorage.setItem('lastSearchQuery', query);
      this.recentSearch = query;
    },
    loadLastSearch() {
      // Load last search query from local storage
      const query = localStorage.getItem('lastSearchQuery');
      if (query) {
        this.recentSearch = query;
      }
    },

    },
  };
  </script>
  
  <style scoped>
.recipe-search-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-group .form-control {
  flex: 1;
  height: calc(1.5em + .75rem + 2px);
  margin-right: -1px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.search-group .btn {
  height: calc(1.5em + .75rem + 2px);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.input-label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.form-select,
.form-control {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-select {
  margin-top: 10px;
}

.result-list {
  list-style-type: none;
  padding: 0;
}

.result-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.result-details {
  flex: 1;
}

.result-details h3 {
  margin: 0 0 10px;
  color: #007bff;
}

.result-details p {
  margin: 0;
  color: #666;
}

button.btn {
  margin-top: 10px;
  background: #007bff;
  color: #fff;
}

button.btn:hover {
  background: #0056b3;
}
</style>

  