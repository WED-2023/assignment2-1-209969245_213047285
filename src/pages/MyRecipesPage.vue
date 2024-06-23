<template>
  <div>
    
    <RecipePreviewList title="My Recipes" :amount="amountMyRecipes" previewType="myRecipes" class="My Recipes Center" />
    <CreateRecipeModal />
  </div>
</template>

<script>
import CreateRecipeModal from "../components/CreateRecipeModal.vue";
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetMyRecipesAmount } from "../services/recipes.js";
export default {
    name: "myRecipesPage",

    components: {
    RecipePreviewList,
    CreateRecipeModal,
  },
    data() {
      return {
        amountMyRecipes: mockGetMyRecipesAmount(),
      };
    },
    methods: {
  
      },
     
    };
</script>

<style lang="scss" scoped>

</style>