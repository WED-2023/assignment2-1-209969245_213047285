
import { getUserRecipeIds } from "../services/user";

class RecipeManager {
  static personalRecipesIds = new Set(); 
  static isInitialized = false;

  // Method to load recipe IDs from the database
  static async loadRecipeIds() {
    console.log("managerIds",this.personalRecipesIds);

    if(this.isInitialized){
      return;
    }
    let user_ids = await getUserRecipeIds();
    RecipeManager.personalRecipesIds = new Set(user_ids);
    console.log("managerIds",this.personalRecipesIds);
    RecipeManager.isInitialized = true;
  }

  // Method to get all personal recipe IDs
  static async getPersonalRecipeIds() {
    await RecipeManager.loadRecipeIds();
    return [...RecipeManager.personalRecipesIds];  
  }

  

  // Method to check if a recipe is a personal recipe
  static async isPersonalRecipe(recipe_id) {
    await RecipeManager.loadRecipeIds();
    return RecipeManager.personalRecipesIds.has(recipe_id);
  }

  static notifyChange(){
    RecipeManager.isInitialized = false;
  }


}

export { RecipeManager };