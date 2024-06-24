// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import family_preview from "../assets/mocks/family_recipes_preview.json";



export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  for(let i = 0; i < amount; i++){
    recipes.push(recipe_preview);
  }

  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
    return { data: { recipe: recipe_full_view } } ;
  }

  export function mockGetRecipeLikesCount(recipeId) {
    return { data: { likes: recipe_full_view.aggregateLikes+1 } } ;
  }

  export function mockGetFavoriteRecipesPreview(amount = 1) {
    let recipes = [];
    for(let i = 0; i < amount; i++){
      recipes.push(recipe_preview);
    }
  
    return { data: { recipes: recipes } };
  }

  export function mockGetMyRecipesPreview(amount = 1) {
    let recipes = [];
    for(let i = 0; i < amount; i++){
      recipes.push(recipe_preview);
    }
  
    return { data: { recipes: recipes } };
  }

  export function mockGetFamilyRecipesPreview(amount = 1) {
    let recipes = [];
    for(let i = 0; i < amount; i++){
      recipes.push(family_preview.recipes[i]);
    }
  
    return { data: { recipes: recipes } };
  }

  
  export function mockGetFavoriteRecipesAmount() {
    return 9;
  }

  export function mockGetFamilyRecipesAmount() {
    return 3;
  }

  export function mockGetMyRecipesAmount() {
    return 10;
  }

  //Returns the filtered recipes by specific criteria (will be implemented differently with the server)
  export function mockGetFilteredRecipes(amount=5){
    let recipes = [];
    for(let i = 0; i < amount; i++){
      recipes.push(recipe_preview);
    }
  
    return { data: { recipes: recipes } };
  }


    export function mockGetRandomRecipes(amount=3){
    let recipes = [];
    for(let i = 0; i < amount; i++){
      recipes.push(recipe_preview);
    }
  
    return { data: { recipes: recipes } };
  }