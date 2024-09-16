<template>
  <div>
    
    <RecipePreviewList title="Favorite Recipes" :amount="amountFavorites" previewType="favorites" class="Favorites Center" :recipes="favoriteRecipesPreviewList" />

  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import {addFavorite, getFavorites, removeFavorite} from "../services/user.js";

export default {
    name: "myFavoritesPage",

    components: {
    RecipePreviewList,
  },
    data() {
      return {
        amountFavorites: 5,
        favoriteRecipesPreviewList: [],
      };
    },created() {

      this.loadFavoriteRecipes();
      
  }
  ,  beforeDestroy() {
  }
  ,
    methods: {
      async loadFavoriteRecipes() {
      try {
        const response = await getFavorites();
        this.favoriteRecipesPreviewList = response;
      } catch (err) {
        console.error("Failed to load favorite recipes:", err);
      }
    },
    async removeFromFavorites(recipe) {
      try {
        await removeFavorite(recipe.id);
        this.favoriteRecipesPreviewList = this.favoriteRecipesPreviewList.filter(r => r.id !== recipe.id);
      } catch (err) {
        console.error("Failed to remove favorite recipe:", err);
      }
    }
  }

    };
</script>

<style lang="scss" scoped>

</style>