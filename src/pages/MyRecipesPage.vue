<template>
    <div class="my-recipes-page">
      <b-container>
        <b-row>
          <b-col>
            <h1>My Recipes</h1>
            <b-list-group>
              <b-list-group-item v-for="recipe in myRecipes" :key="recipe.id">
                <b-row>
                  <b-col cols="4">
                    <b-img :src="recipe.image" fluid alt="Recipe image"></b-img>
                  </b-col>
                  <b-col cols="8">
                    <h5>{{ recipe.title }}</h5>
                    <p>{{ recipe.summary }}</p>
                    <b-button variant="primary" @click="viewRecipe(recipe.id)">View Recipe</b-button>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script>
  import { mockGetMyRecipes } from '@/services/user.js'; // Assuming mock function
  
  export default {
    name: "MyRecipesPage",
    data() {
      return {
        myRecipes: []
      };
    },
    created() {
      this.loadMyRecipes();
    },
    methods: {
      loadMyRecipes() {
        mockGetMyRecipes().then(recipes => {
          this.myRecipes = recipes;
        });
      },
      viewRecipe(recipeId) {
        this.$router.push(`/recipe/${recipeId}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .my-recipes-page {
    margin-top: 20px;
  }
  </style>
  