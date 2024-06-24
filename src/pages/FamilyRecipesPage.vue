<template>
    <div>
      
      <RecipePreviewList title="Family Recipes" :amount="amountFamily" previewType="family" class="Family Center" :recipes="familyRecipesList"/>
  
    </div>
  </template>
  
  <script>
  import RecipePreviewList from "../components/RecipePreviewList";
  import { mockGetFamilyRecipesAmount } from "../services/recipes.js";
  export default {
      name: "myFamilyPage",
  
      components: {
      RecipePreviewList,
    },
      data() {
        return {
          familyRecipesList:[],
          amountFamily: mockGetFamilyRecipesAmount(),
        };
      },
      methods: {
    
        },
       
      };
  </script>
  
  <style lang="scss" scoped>
  
  </style>