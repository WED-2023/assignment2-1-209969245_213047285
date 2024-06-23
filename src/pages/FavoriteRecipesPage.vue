<template>
  <div>
    
    <RecipePreviewList title="Favorite Recipes" :amount="amountFavorites" previewType="favorites" class="Favorites Center" />

  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetFavoriteRecipesAmount } from "../services/recipes.js";
export default {
    name: "myFavoritesPage",

    components: {
    RecipePreviewList,
  },
    data() {
      return {
        amountFavorites: mockGetFavoriteRecipesAmount(),
      };
    },

    methods: {
  
      },
     
    };
</script>

<style lang="scss" scoped>

</style>