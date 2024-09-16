<template>
  <div>
    <RecipePreviewList 
      title="Family Recipes" 
      :amount="amountFamilyRecipes" 
      previewType="myRecipes" 
      class="Family Recipes Center" 
      :recipes="familyRecipesPreviewList" 
    />
    <CreateRecipeModal @recipe-created="addRecipe" />

    <!-- Additional code to dynamically list recipes -->
  </div>
</template>

<script>
import CreateRecipeModal from "../components/CreateRecipeModal.vue";
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { getUserRecipes, createFamilyRecipe} from "../services/user.js"; 

export default {
  name: "FamilyRecipesPage",
  components: {
    RecipePreviewList,
    CreateRecipeModal,
  },
  data() {
    return {
      amountFamilyRecipes: 0,
      familyRecipesPreviewList: [],
    };
  },
  async created() {
    try {
      // Fetch user recipes from the backend when the component is created
      const recipes = await getUserRecipes();
      
      // Filter the recipes to include only those with custom_id = "family"
      this.familyRecipesPreviewList = recipes.filter(recipe => recipe.custom_id === "family");

    console.log(this.familyRecipesPreviewList);
      
      this.amountFamilyRecipes = recipes.length;
    } catch (error) {
      console.error('Failed to load user recipes:', error);
    }
  },
  methods: {
    async addRecipe(newRecipe) {
      //updating "is-personal" to be TRUE 
      this.familyRecipesPreviewList.push(newRecipe); // Add the new recipe to the list
      this.amountFamilyRecipes++; // Increment the amount of recipes
      createFamilyRecipe(newRecipe);
      this.$router.go(0)
    },
  },
};
</script>

<style lang="scss" scoped>
/* Add your scoped styles here */
</style>
