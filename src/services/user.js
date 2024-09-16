// src/services/user.js
import axios from 'axios'; 

const API_URL = 'https://tal-noam.cs.bgu.ac.il';


import { RecipeManager } from '../services/recipeManager';

export async function addFavorite(recipeId) {
  try {
    const response = await axios.post(`${API_URL}/users/favorites`, 
      { recipeId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
}
export async function removeFavorite(recipeId) {
  try {
    const response = await axios.delete(`${API_URL}/users/favorites`, 
      { 
        data: { recipeId },
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function getFavorites() {
  try {
    // Get the recipe IDs from the RecipeManager
    console.log("favoriteIds1","personalRecipeIds");

    const personalRecipeIds = await RecipeManager.getPersonalRecipeIds();
    console.log("favoriteIds2",personalRecipeIds);

    // Send the IDs in the POST request body
    const response = await axios.post(`${API_URL}/users/getFavorites`, {
      personalRecipeIds
    }, { withCredentials: true });

    return response.data;  // Return the server response
  } catch (error) {
    throw error.response;
  }
}

export async function isFavorite(recipeId) {
  try {
    const response = await axios.post(`${API_URL}/users/isFavorite`, 
      { recipeId },
      { withCredentials: true }
    );
    return response.data.favorite;
  } catch (error) {
    throw error.response;
  }
}

export async function likeRecipe(recipeId) {
  try {
    const response = await axios.post(`${API_URL}/users/like`, { recipeId }, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function unlikeRecipe(recipeId) {
  try {
    const response = await axios.post(`${API_URL}/users/unlike`, { recipeId }, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function isLiked(recipeId) {
  try {
    const response = await axios.post(`${API_URL}/users/isLiked`, { recipeId }, { withCredentials: true });
    return response.data.liked;
  } catch (error) {
    throw error.response;
  }
}

export async function createRecipe(recipe) {
  try {
    const response = await axios.post(`${API_URL}/users/createARecipe`, recipe, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function createFamilyRecipe(recipe) {
  try {
    const response = await axios.post(`${API_URL}/users/createFamilyRecipe`, recipe, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function getUserRecipes() {
  try {
    const response = await axios.get(`${API_URL}/users/userRecipes`, {
      withCredentials: true, // Ensure cookies (for sessions) are included in the request
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    throw error; 
  }
}

export async function getUserRecipeIds() {
  try {
    const response = await axios.get(`${API_URL}/users/userRecipeIds`, {
      withCredentials: true, // Ensure cookies (for sessions) are included in the request
    });
    return response.data;  // Return the array of recipe IDs
  } catch (error) {
    console.error('Error fetching user recipe IDs:', error);
    throw error; 
  }
}

export async function getUserRecipe(recipe_id) {
  try {
    const response = await axios.get(`${API_URL}/users/userRecipe`, {
      params: { recipe_id },
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user recipe:', error);
    throw error.response;
  }
}


  
  

