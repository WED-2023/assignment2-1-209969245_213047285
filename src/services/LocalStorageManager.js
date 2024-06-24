const localStorageManager = {
    setItem(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItem(key) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    },
    clearLocalStorage() {
      localStorage.clear();
    },
    clearByKey(key) {
      localStorage.removeItem(key);
    },
    addFavoriteRecipe(recipe) {
      let favorites = localStorageManager.getItem('favoriteRecipes') || [];
      favorites.push(recipe);
      localStorageManager.setItem('favoriteRecipes', favorites);
    }
  };
  
  export default localStorageManager;