<template>
    <div>
      
      <RecipePreviewList title="Family Recipes" :amount="amountFamily" previewType="family" class="Family Center" />
  
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
          amountFamily: mockGetFamilyRecipesAmount(),
        };
      },
      methods: {
    
        },
       
      };
  </script>
  
  <style lang="scss" scoped>
  
  </style>