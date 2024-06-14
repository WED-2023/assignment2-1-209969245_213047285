<template> 
<div class="card" style="width: 18rem;">
  <img class="card-img-top" v-bind:src="recipe.image">
  <div class="card-body">
    <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }">
      <h7  class="recipe-title">  {{ recipe.title }}</h7>
      <ul>
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
      </ul>
  </router-link>
  
  <p class="card-text"> {{ this.truncateText(recipe.summary,150) }}
    <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }">Learn more</router-link>
  </p>

  <button class="star-icon" @click="toggleStar">
        <img v-if="!isStarred" src="@/assets/star.svg" width="28px" height="28px"/>
        <img v-else src="@/assets/star-fill.svg" width="30px" height="30px"/>
      </button>


      <button class="heart-icon" @click="toggleHeart">
        <img v-if="!isHearted" src="@/assets/heart.svg" width="28px" height="28px"/>
        <img v-else src="@/assets/heart-fill.svg" width="30px" height="30px"/>
      </button>



  </div>

  <div class="recipe-icon">
      <b-tooltip v-b-tooltip.hover title="Vegan Friendly">
      <img src="@/assets/vegan-icon.png"/>
      </b-tooltip>

      <b-tooltip v-b-tooltip.hover title="Vegetarian">
      <img src="@/assets/vegetarian-icon.png"/>
      </b-tooltip>

      <b-tooltip v-b-tooltip.hover title="Gluten Free">
      <img src="@/assets/gluten-free-icon.png"/>
      </b-tooltip>
    </div>
</div>

</template>

<script>
export default {
  // mounted() {
  //   this.axios.get(this.recipe.image).then((i) => {
  //     this.image_load = true;
  //   });
  // },
  data() {
    return {
      //image_load: false
      isStarred: false,
      isHearted: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  }
,
  methods: {
    truncateText(text, limit) {
      return text.length > limit ? text.slice(0, limit) + '...' : text;
    },
    toggleStar() {
      this.isStarred = !this.isStarred;
    }
,
    toggleHeart() {
      this.isHearted = !this.isHearted;

    }
  }
};
</script>

<style scoped>

.recipe-icon img {
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





/* .recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
} */
</style>
