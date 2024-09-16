<template>
  <div>
    <RecipePreviewList 
      title="My Recipes" 
      :amount="amountMyRecipes" 
      previewType="myRecipes" 
      class="My Recipes Center" 
      :recipes="myRecipesPreviewList" 
    />
    <CreateRecipeModal @recipe-created="addRecipe" />

    <!-- Additional code to dynamically list recipes -->
  </div>
</template>

<script>
import CreateRecipeModal from "../components/CreateRecipeModal.vue";
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { getUserRecipes, createRecipe} from "../services/user.js"; 

export default {
  name: "myRecipesPage",
  components: {
    RecipePreviewList,
    CreateRecipeModal,
  },
  data() {
    return {
      amountMyRecipes: 0,
      myRecipesPreviewList: [],
    };
  },
  async created() {
    try {
      // Fetch user recipes from the backend when the component is created
      const recipes = await getUserRecipes();
      
      // Filter the recipes to include only those with custom_id = "family"
      this.myRecipesPreviewList = recipes.filter(recipe => recipe.custom_id === "personal");

    console.log(this.myRecipesPreviewList);
      
      this.amountMyRecipes = recipes.length;
    } catch (error) {
      console.error('Failed to load user recipes:', error);
    }
  },
  methods: {
    async addRecipe(newRecipe) {
      //updating "is-personal" to be TRUE 
      this.myRecipesPreviewList.push(newRecipe); // Add the new recipe to the list
      this.amountMyRecipes++; // Increment the amount of recipes
      createRecipe(newRecipe);
      this.$router.go(0)
    },
  },
};
</script>

<style lang="scss" scoped>
/* Add your scoped styles here */
</style>
