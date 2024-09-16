<template> 
  <div class="card" style="width: 18rem; height:36rem; margin-bottom:1rem; position: relative;">
    <img class="card-img-top" v-bind:src="recipe.image">
    <div class="card-body">
      <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id , parentRouteName: this.$route.name} }">
        <h7 class="recipe-title">{{ recipe.title }}</h7>
      </router-link>
      
      <!-- Conditionally render SEEN text -->
      <p v-if="isWatched" class="seen-text">SEEN</p>

      <p class="card-text" style="height:10rem;">
        {{ this.truncateText(recipe.summary,150) }}
        <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id, parentRouteName: this.$route.name} }">Learn more</router-link>
      </p>

      <button class="star-icon" @click="toggleStar">
        <img v-if="!isStarred" src="@/assets/star.svg" width="30px" height="30px"/>
        <img v-else-if="isStarred" src="@/assets/star-fill.svg" width="30px" height="30px"/>
      </button>

      <button class="heart-icon" @click="toggleHeart">
        <p v-if="this.recipeType!='family' && this.recipeType!='personal'"> {{ likes }} likes </p>
        <img v-if="this.$route.name == 'myRecipes' || this.$route.name == 'familyRecipes' || this.recipeType=='family' || this.recipeType=='personal' " src="@/assets/heart.svg" width="30px" height="30px"  style="display: none;"/>
        <img v-else-if="!isHearted" src="@/assets/heart.svg" width="30px" height="30px"/>
        <img v-else-if="isHearted" src="@/assets/heart-fill.svg" width="30px" height="30px"/>
      </button>

      <div class="bottom-icons-container">
        <img v-if="recipe.vegan" src="@/assets/vegan-icon.png" title="Vegan Friendly"/>
        <img v-if="recipe.vegetarian" src="@/assets/vegetarian-icon.png" title="Vegetarian"/>
        <img v-if="recipe.glutenFree" src="@/assets/gluten-free-icon.png" title="Gluten Free"/>
      </div>

      <!-- Clock Icon Container positioned absolutely -->
      <div class="clock-icon-container">
        <img src="@/assets/clock-fill.svg"/>
        {{ recipe.readyInMinutes }} minutes
      </div>
    </div>
  </div>
</template>

<script>

  import {addFavorite, isFavorite, removeFavorite} from '../services/user.js';
  import { isLiked, likeRecipe, unlikeRecipe } from '../services/user.js';
  import { getRecipeType } from '@/services/recipes.js';
  import {isRecipeWatched} from '../services/recipes.js'

  export default {
    data() {
      return {
        isStarred: false,
        isHearted: false,
        recipeType: null,
        likes: this.recipe ? this.recipe.aggregateLikes : 0,
        isWatched: false, //to track if the recipe is watched    
      };
    },
    props: {
      recipe: {
        type: Object,
        required: true
      }
    },
    async created() {
      this.recipeType = await getRecipeType(this.recipe.id);
  

      if (await isFavorite(this.recipe.id)) {
        this.isStarred = true;
      } else {
        this.isStarred = false;
      }

      if (await isLiked(this.recipe.id)) {
        this.isHearted = true;
        this.likes += 1;
      } else {
        this.isHearted = false;
      }

      // Check if the recipe has been watched
      if (await isRecipeWatched(this.recipe.id)) {
        this.isWatched = true; // Set the isWatched flag to true if the recipe has been watched
      }
    },
    methods: {
      truncateText(text, limit) {
        if (typeof text !== 'string') {
          return ''; // Return an empty string if the input is not a string
        }
        const strippedText = text.replace(/<[^>]*>/g, ''); // Remove HTML tags
        const truncated = strippedText.length > limit ? strippedText.slice(0, limit) + '...' : strippedText;
        return truncated;
      },
      toggleStar() {
        this.isStarred = !this.isStarred;
        if(this.isStarred){          
          addFavorite(this.recipe.id, this.recipeType);
        } else {
          removeFavorite(this.recipe.id);
          if (this.$route.name === 'favoriteRecipes') {
            this.$router.go(0);
          }
        }
      },
      toggleHeart() {
        this.isHearted = !this.isHearted;
        if (this.isHearted) {
          this.likes += 1;
          likeRecipe(this.recipe.id);
        } else {
          this.likes -= 1;
          unlikeRecipe(this.recipe.id);
        }
        this.recipe.aggregateLikes = this.likes;
      }
    }
  };
</script>

<style scoped>
.bottom-icons-container {
  display: flex;
  align-items: center;
  left:10px;
}

.bottom-icons-container img {
  width: 35px;
  height: 35px;
}

.star-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
}

.heart-icon {
  border: none;
  background: none;
  cursor: pointer;
}

.card {
  position: relative;
}

.clock-icon-container {
  position: absolute; 
  bottom: 10px; 
  right: 10px; 
  display: flex;
  align-items: center; 
}

.clock-icon-container img {
  width: 30px;
  height: 30px;
  margin-right: 5px; /* Adds a little space between the icon and the text */
}

.seen-text {
  font-weight: bold;
  color: red;
  margin-bottom: 10px; /* Adjust positioning as needed */
}
</style>
