// // src/services/recipes.js

import axios from 'axios'; 
import { RecipeManager } from './recipeManager';

const API_URL = 'https://tal-noam.cs.bgu.ac.il';


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

export async function markRecipeAsWatched(recipeId) {
  try {
  

    const response = await axios.post(`${API_URL}/users/watched`, 
      { recipeId },
      { withCredentials: true }
    );
    console.log(response);
    return response.data;
  
  } catch (error) {
    console.error('Error marking recipe as watched:', error);
    throw error;
  }
}

export async function getLastViewedRecipes(number) {
  try {
    let objIds = JSON.stringify(await RecipeManager.getPersonalRecipeIds());
    const response = await axios.get(`${API_URL}/users/lastWatchedRecipes`, {
      params: { limit: number, personalRecipeIds: objIds },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching last viewed recipes:', error);
    throw error;
  }
}

export async function isRecipeWatched(recipeId) {
  try {
    const response = await axios.post(`${API_URL}/users/isWatched`, 
      { recipeId },
      { withCredentials: true }
    );
    return response.data.watched;
  } catch (error) {
    console.error('Error checking if recipe is watched:', error);
    throw error;
  }
}

export async function getRecipeType(recipeId) {
  try {

    const response = await axios.get(`${API_URL}/users/getRecipeType`,  {params: { recipe_id: recipeId }, withCredentials: true });

    return response.data.recipeType ? response.data.recipeType : 'spoonacular';
  } catch (error) {
    console.error("Error fetching recipe type:", error);
    return '';
  }
}
