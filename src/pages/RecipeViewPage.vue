<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div v-if="!isPersonal">Likes: {{ recipe.aggregateLikes }} likes</div>
            </div>

            <!-- Ingredients Section -->
            <b>Ingredients:</b>

            <!-- For non-personal recipes -->
            <ul v-if="!isPersonal">
              <li v-for="(r, index) in recipe.extendedIngredients" :key="index">
                {{ r.amount }} {{ r.unit }} {{ r.name }}
              </li>
            </ul>

            <!-- For personal recipes -->
            <ul v-else>
              <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
              </li>
            </ul>

          </div>

          <!-- Instructions Section -->
          <div v-if="!isPersonal" class="wrapped">
            <b>Instructions:</b>
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>

          <div v-if="isPersonal" class="wrapped">
            <b>Instructions:</b>
            <ol>
              <li
                v-for="(instruction, index) in recipe.instructions.split('.').filter(Boolean)"
                :key="index"
              >
                {{ instruction }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { getRecipeById, mockGetRecipeFullDetails } from "../services/recipes.js";
import { isLiked, likeRecipe, unlikeRecipe, getUserRecipe } from '../services/user.js';
import {markRecipeAsWatched} from '../services/recipes.js'
import { getRecipeType } from '@/services/recipes.js';




export default {
  data() {
    return {
      recipe: null,
      isPersonal: false
    };
  },
  async created() {
    try {
      const recipeId = this.$route.params.recipeId;
      const parentRouteName = this.$route.params.parentRouteName;
      const recipeType = await getRecipeType(recipeId);
      
      let response;

      if(recipeType == "personal" || recipeType == "family" )
      {
        response = await getUserRecipe(recipeId);
        this.isPersonal = true;
      }
      else
      {
        response = await getRecipeById(recipeId);
      }

      await markRecipeAsWatched(recipeId);

      if (!response) {
        console.error("No recipe data returned from API");
        this.$router.replace("/NotFound");
        return;
      }

      const {
        analyzedInstructions = [],  // Default to an empty array if undefined
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        ingredients
      } = response;


      let _instructions;
      // Add a check to see if analyzedInstructions is indeed an array
      if(parentRouteName != 'myRecipes')
      {
    

        _instructions = Array.isArray(analyzedInstructions)
        ? analyzedInstructions
            .map(fstep => {
              // Ensure fstep.steps is an array and has at least one element
              if (Array.isArray(fstep.steps) && fstep.steps.length > 0) {
                fstep.steps[0].step = fstep.name + fstep.steps[0].step;
              }
              return fstep.steps || [];  // Return an empty array if fstep.steps is not defined
            })
            .reduce((a, b) => [...a, ...b], [])
        : [];
      }

        // Set the recipe data
      this.recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        ingredients
      };

     
      console.log(this.recipe.ingredients);


  

      if(await isLiked(recipeId)){
        this.recipe.aggregateLikes+=1;
      }

      if (typeof this.recipe.ingredients === 'string') {
        // Parse the ingredients if it's a string
        this.recipe.ingredients = JSON.parse(this.recipe.ingredients);
      }
    }

    
  
    
    catch (error) {
      console.error("Error fetching recipe data:", error);
      this.$router.replace("/NotFound");  // Redirect if there's an error
    }
  }
};
</script>


<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

</style>