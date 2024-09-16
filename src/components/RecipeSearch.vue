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
        <!-- Corrected placeholder to display the most recent search query -->
        <input
          type="text"
          class="form-control"
          :placeholder="recentSearch ? recentSearch : 'Search recipes'"
          v-model="searchQuery"
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

      <!-- Display Recipe Results -->
      <RecipePreviewList
        v-if="recipeResultsList.length > 0"
        title="Results"
        :amount="resultAmount"
        previewType=""
        class="My Recipes Center"
        :recipes="recipeResultsList"
      />
      
      <!-- Display message if no results -->
      <p v-else class="no-results-message">There are no relevant results.</p>
    </div>
  </div>
</template>

<script>
import { searchRecipes } from '../services/recipes';
import RecipePreviewList from './RecipePreviewList.vue';

export default {
  components: { RecipePreviewList },
  data() {
    return {
      recentSearch: null,   // Holds the recent search from session storage
      searchQuery: '',      // Current search query
      resultAmount: 5,      // Search results count
      selectedCuisine: '',
      selectedDiet: '',
      selectedIntolerance: '',
      sortBy: 'time',
      recipeResultsList: [], // Search result list
      isLoggedIn: false,    // Assuming it's set when the user is logged in
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
    // Check if the user is logged in
    this.isLoggedIn = this.$root.loggedIn;


    // Load last search query from session storage
    if(localStorage.getItem("username")){
      this.loadLastSearch();
    }
  
  },

  methods: {
    async onSearch() {
      const filters = {
        query: this.searchQuery,
        amount: this.resultAmount,
        cuisine: this.selectedCuisine,
        diet: this.selectedDiet,
        intolerance: this.selectedIntolerance,
        sortBy: this.sortBy,
      };

      const response = await searchRecipes(
        this.searchQuery, 
        this.selectedCuisine, 
        this.selectedDiet, 
        this.selectedIntolerance, 
        this.resultAmount
      );
      this.recipeResultsList = [...response];

    // Sort based on the selected criterion
    if (this.sortBy === 'popularity') {
      this.recipeResultsList.sort((a, b) => b.aggregateLikes - a.aggregateLikes); // Sort by likes in descending order
    } else if (this.sortBy === 'time') {
      this.recipeResultsList.sort((a, b) => a.readyInMinutes - b.readyInMinutes); // Sort by preparation time in ascending order
    }

      // Save the current search query to session storage
      if(localStorage.getItem("username")){
        this.saveLastSearch(this.searchQuery);
      }
    },

    saveLastSearch(query) {
      // Store the recent search query in session storage
      if(localStorage.getItem("username")){
        sessionStorage.setItem('recentSearchQuery', query);
        this.recentSearch = "Last Search: " + query; // Update the displayed recent search
      }
      
    },

    loadLastSearch() {
      // Load the last search query from session storage
      if(localStorage.getItem("username")){
        const query = sessionStorage.getItem('recentSearchQuery');
      if (query) {
        this.recentSearch = "Last Search: " + query; // Display recent search if it exists
      }
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

.no-results-message {
  font-size: 1.5em; 
  font-weight: bold; 
  color: red; 
}

</style>

