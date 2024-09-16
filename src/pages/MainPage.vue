<template>
  <div class="container">

    <div class="header">
      <button @click="fetchRandomRecipes" class="cube-button">
        <div class="cube">
          <div class="face front">
            <div class="dot dot1"></div>
          </div>
          <div class="face back">
            <div class="dot dot1"></div>
            <div class="dot dot2"></div>
            <div class="dot dot3"></div>
            <div class="dot dot4"></div>
            <div class="dot dot5"></div>
            <div class="dot dot6"></div>
          </div>
          <div class="face right">
            <div class="dot dot1"></div>
            <div class="dot dot2"></div>
            <div class="dot dot3"></div>
          </div>
          <div class="face left">
            <div class="dot dot1"></div>
            <div class="dot dot2"></div>
            <div class="dot dot3"></div>
          </div>
          <div class="face top">
            <div class="dot dot1"></div>
            <div class="dot dot2"></div>
            <div class="dot dot3"></div>
            <div class="dot dot4"></div>
            <div class="dot dot5"></div>
          </div>
          <div class="face bottom">
            <div class="dot dot1"></div>
            <div class="dot dot2"></div>
            <div class="dot dot3"></div>
            <div class="dot dot4"></div>
            <div class="dot dot5"></div>
            <div class="dot dot6"></div>
          </div>
        </div>
      </button>
    </div>

    
    <RecipePreviewList
      title="Explore these recipes"
      amount="3"
      previewType="random"
      class="RandomRecipes center"
      :recipes="randomRecipesPreviewList"
      @update-recipes="handleUpdateRecipes"
    />

    
    
    <router-link v-if="!$root.store.username" to="/login" tag="b-button">
      You need to Login to view this
    </router-link>

    <RecipePreviewList
      title="Last Viewed Recipes"
      amount="3"
      :recipes="recentRecipesPreviewList"
      previewType="recent"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { getLastViewedRecipes } from "../services/recipes";  
import { getRandomRecipes } from "../services/recipes.js";

export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      randomRecipesPreviewList: [],
      recentRecipesPreviewList: []
    };
  },
  async created() {
    await this.fetchRandomRecipes();
    await this.fetchLastViewedRecipes();
  },
  methods: {
    async fetchRandomRecipes() {
      // Fetch random recipes previews
      try {
        const response = await getRandomRecipes();
        const newRecipes = response.data.recipes;
        this.randomRecipesPreviewList = [...newRecipes];
      } catch (error) {
        console.error('Error fetching random recipes:', error);
      }
    },
    async fetchLastViewedRecipes() {
      if (this.$root.store.username) {
        try {
          const response = await getLastViewedRecipes(3);
          this.recentRecipesPreviewList = [...response];
        } catch (error) {
          console.error('Error fetching last viewed recipes:', error);
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  padding-top: 20px; 
}

.header {
  display: flex;
  align-items: center;
  margin-bottom:20px;
}

.cube-button {
  width: 60px;
  height: 60px;
  perspective: 800px;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
}

.cube-button .cube {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transform: rotateX(0deg) rotateY(0deg);
  transition: transform 0.6s;
}

.cube-button:hover .cube {
  transform: rotateX(360deg) rotateY(360deg);
}

.cube-button .cube .face {
  position: absolute;
  width: 60px;
  height: 60px;
  background: white;
  border: 1px solid #000;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cube-button .cube .face.front  { transform: rotateY(  0deg) translateZ(30px); }
.cube-button .cube .face.back   { transform: rotateY(180deg) translateZ(30px); }
.cube-button .cube .face.right  { transform: rotateY( 90deg) translateZ(30px); }
.cube-button .cube .face.left   { transform: rotateY(-90deg) translateZ(30px); }
.cube-button .cube .face.top    { transform: rotateX( 90deg) translateZ(30px); }
.cube-button .cube .face.bottom { transform: rotateX(-90deg) translateZ(30px); }

/* Dot styles */
.dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: black;
  border-radius: 50%;
}

.dot1 { top: 50%; left: 50%; transform: translate(-50%, -50%); }

.face.front .dot1 { /* Center dot for face 1 */ }

.face.back .dot1 { top: 10%; left: 10%; }
.face.back .dot2 { top: 10%; left: 50%; }
.face.back .dot3 { top: 10%; left: 90%; }
.face.back .dot4 { top: 50%; left: 10%; }
.face.back .dot5 { top: 50%; left: 50%; }
.face.back .dot6 { top: 50%; left: 90%; }

.face.right .dot1 { top: 10%; left: 50%; }
.face.right .dot2 { top: 50%; left: 50%; }
.face.right .dot3 { top: 90%; left: 50%; }

.face.left .dot1 { top: 10%; left: 50%; }
.face.left .dot2 { top: 50%; left: 50%; }
.face.left .dot3 { top: 90%; left: 50%; }

.face.top .dot1 { top: 10%; left: 10%; }
.face.top .dot2 { top: 10%; left: 50%; }
.face.top .dot3 { top: 10%; left: 90%; }
.face.top .dot4 { top: 50%; left: 10%; }
.face.top .dot5 { top: 50%; left: 50%; }

.face.bottom .dot1 { top: 10%; left: 10%; }
.face.bottom .dot2 { top: 10%; left: 50%; }
.face.bottom .dot3 { top: 10%; left: 90%; }
.face.bottom .dot4 { top: 50%; left: 10%; }
.face.bottom .dot5 { top: 50%; left: 50%; }
.face.bottom .dot6 { top: 50%; left: 90%; }
</style>
