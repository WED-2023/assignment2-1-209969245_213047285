<template>
  <div>
    <RecipePreviewList title="My Recipes" :amount="amountMyRecipes" previewType="myRecipes" class="My Recipes Center" :recipes="myRecipesPreviewList" />
    <CreateRecipeModal @recipe-created="addRecipe" />
    <!-- <b-row>
      <b-col v-for="r in myRecipesPreviewList" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row> -->
    
  </div>
</template>

<script>
import CreateRecipeModal from "../components/CreateRecipeModal.vue";
import RecipePreview from '../components/RecipePreview.vue';
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
      myRecipesPreviewList: [],
    };
  },
  methods: {
    addRecipe(newRecipe) {
      this.myRecipesPreviewList.push(newRecipe);
      this.amountMyRecipes++;
    },
  },
};
</script>

<style lang="scss" scoped>
/* Add your scoped styles here */
</style>
