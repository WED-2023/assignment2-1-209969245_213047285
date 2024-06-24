<template>
  <div>
    
    <RecipePreviewList title="Favorite Recipes" :amount="amountFavorites" previewType="favorites" class="Favorites Center" :recipes="favoriteRecipesPreviewList" />

  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetFavoriteRecipesAmount } from "../services/recipes.js";
import { eventBus } from '../eventBuss.js';

export default {
    name: "myFavoritesPage",

    components: {
    RecipePreviewList,
  },
    data() {
      return {
        amountFavorites: 1,
        favoriteRecipesPreviewList: [],
      };
    },created() {
      this.loadFavoriteRecipes();  // Load favorite recipes from localStorage when the component is created
      //this.clearLocalStorage();
      eventBus.$on('toggle-favorite', this.addRecipe);
  }
  ,  beforeDestroy() {
    //eventBus.$off('toggle-favorite', this.updateFavoriteRecipes);
  }
  ,
    methods: {
      addRecipe(favoriteRecipe, isFavorited) {
        this.favoriteRecipesPreviewList.push(favoriteRecipe);
        this.amountFavorites++;
        localStorage.setItem('favoriteRecipes', JSON.stringify(this.favoriteRecipesPreviewList));  // Save the updated list to localStorage
    },
    loadFavoriteRecipes() {
      const storedRecipes = localStorage.getItem('favoriteRecipes');  // Retrieve the favorite recipes from localStorage
      if (storedRecipes) {
        this.favoriteRecipesPreviewList = JSON.parse(storedRecipes);  // Parse and assign the favorite recipes to the component's data
        //this.amountFavorites = length(this.favoriteRecipesPreviewList)
      }
    },
    clearLocalStorage(){
      localStorage.clear();
    }

      },
     
    };
</script>

<style lang="scss" scoped>

</style>