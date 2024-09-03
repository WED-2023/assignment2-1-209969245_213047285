<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id" lg="4">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import RecipePreview from "./RecipePreview.vue";
import { getRandomRecipes, mockGetRecipesPreview } from "../services/recipes.js";
import { mockGetMyRecipesPreview } from "../services/recipes.js";
import { mockGetFavoriteRecipesPreview } from "../services/recipes.js";
import { mockGetFamilyRecipesPreview } from "../services/recipes.js";



export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    amount:{
      type:Number,
      required:true
    },
    previewType:{
      type:Text,
      required: true
    },
    recipes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );
      
        const response = await getRandomRecipes();
        
        const newRecipes = response.data.recipes;
        console.log(newRecipes);

        if (Array.isArray(newRecipes)) {
          // Emit event to parent with new recipes
          this.$emit('update-recipes', newRecipes);
        } else {
          console.error("API did not return an array", newRecipes);
        }
        // const amountToFetch = this.amount; // Set this to how many recipes you want to fetch
        // let response;
        // switch(this.previewType){
        //   case "favorites":
        //     response = mockGetFavoriteRecipesPreview(amountToFetch);
        //     break;
        //   case "myRecipes":
        //     response = mockGetMyRecipesPreview(amountToFetch);
        //     break;
        //   case "family":
        //   response = mockGetFamilyRecipesPreview(amountToFetch);
        //   break;
        //   default:
        //     response = mockGetRecipesPreview(amountToFetch);
        // }

      
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
