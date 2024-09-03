// // src/services/recipes.js
// import recipe_full_view from "../assets/mocks/recipe_full_view.json";
// import recipe_preview from "../assets/mocks/recipe_preview.json";
// import family_preview from "../assets/mocks/family_recipes_preview.json";

import axios from 'axios'; 

const API_URL = 'https://tal-noam.cs.bgu.ac.il';


// export function mockGetRecipesPreview(amount = 1) {
//   let recipes = [];
//   for(let i = 0; i < amount; i++){
//     recipes.push(recipe_preview);
//   }

//   return { data: { recipes: recipes } };
// }

// export function mockGetRecipeFullDetails(recipeId) {
//     return { data: { recipe: recipe_full_view } } ;
//   }

//   export function mockGetRecipeLikesCount(recipeId) {
//     return { data: { likes: recipe_full_view.aggregateLikes+1 } } ;
//   }

//   export function mockGetFavoriteRecipesPreview(amount = 1) {
//     let recipes = [];
//     for(let i = 0; i < amount; i++){
//       recipes.push(recipe_preview);
//     }
  
//     return { data: { recipes: recipes } };
//   }

//   export function mockGetMyRecipesPreview(amount = 1) {
//     let recipes = [];
//     for(let i = 0; i < amount; i++){
//       recipes.push(recipe_preview);
//     }
  
//     return { data: { recipes: recipes } };
//   }

//   export function mockGetFamilyRecipesPreview(amount = 1) {
//     let recipes = [];
//     for(let i = 0; i < amount; i++){
//       recipes.push(family_preview.recipes[i]);
//     }
  
//     return { data: { recipes: recipes } };
//   }

  
//   export function mockGetFavoriteRecipesAmount() {
//     return 9;
//   }

//   export function mockGetFamilyRecipesAmount() {
//     return 3;
//   }

  export function mockGetMyRecipesAmount() {
    return 10;
  }

//   //Returns the filtered recipes by specific criteria (will be implemented differently with the server)
//   export function mockGetFilteredRecipes(amount=5){
//     let recipes = [];
//     for(let i = 0; i < amount; i++){
//       recipes.push(recipe_preview);
//     }
  
//     return { data: { recipes: recipes } };
//   }



//     export function mockGetRandomRecipes(amount=3){
//     let recipes = [];
//     for(let i = 0; i < amount; i++){
//       recipes.push(recipe_preview);
//     }
  
//     return { data: { recipes: recipes } };
//   }
export async function getRandomRecipes() {
  try {
    const response = await axios.get(`${API_URL}/recipes/random`, {
      params: { number: 3 },
      withCredentials: true
    });
    console.log(response.data.recipes);
    return { data: { recipes: response.data } };
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return { data: { recipes: [] } };
  }
}

export async function getRecipeById(recipeId) {
  try {
    const response = await axios.get(`${API_URL}/recipes/${recipeId}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    throw error;
  }
}

export async function searchRecipes(query, cuisine, diet, intolerance, number) {
  try {
    const response = await axios.get(`${API_URL}/recipes/search`, {
      params: {
        recipeName: query,
        cuisine: cuisine,
        diet: diet,
        intolerance: intolerance,
        number: number
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for recipes:', error);
    throw error;
  }
  
}