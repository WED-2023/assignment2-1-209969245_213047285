<template>
  <b-container>
    <h3>
      <b>{{ title }}:</b>
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id" lg="4">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import RecipePreview from "./RecipePreview.vue";


export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    amount:{
      type:Number,
      required:true
    },
    previewType:{
      type:Text,
      required: true
    },
    recipes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
