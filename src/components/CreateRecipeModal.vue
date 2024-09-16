<template>
  <div>
    <b-button 
      v-b-modal.modal-prevent-closing 
      title="Create Recipe" 
      style="position:fixed;bottom: 20px;font-size:xx-large;padding-left:25px;padding-right:20px;margin-left:-5px">
      +
    </b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Create New Recipe"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- Title Field -->
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
          :state="titleState"
        >
          <b-form-input
            id="title-input"
            v-model="recipe.title"
            :state="titleState"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Summary Field -->
        <b-form-group
          label="Summary"
          label-for="summary-input"
          :state="summaryState"
        >
          <b-form-textarea
            id="summary-input"
            v-model="recipe.summary"
            :state="summaryState"
            required
          ></b-form-textarea>
        </b-form-group>

        <!-- Description Field -->
        <b-form-group
          label="Instructions"
          label-for="instruction-input"
          :state="instructionsState"
        >
          <b-form-textarea
            id="instruction-input"
            v-model="recipe.instructions"
            :state="instructionsState"
            required
          ></b-form-textarea>
        </b-form-group>

        <!-- Ready in Minutes Field -->
        <b-form-group
          label="Ready in Minutes"
          label-for="ready-input"
          :state="readyState"
        >
          <b-form-input
            id="ready-input"
            v-model.number="recipe.readyInMinutes"
            type="number"
            :state="readyState"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Image URL Field -->
        <b-form-group
          label="Image URL"
          label-for="image-input"
          invalid-feedback="Image URL is required"
          :state="imageState"
        >
          <b-form-input
            id="image-input"
            v-model="recipe.image"
            :state="imageState" 
          ></b-form-input>
        </b-form-group>

        <!-- Checkboxes for Recipe Type -->
        <b-form-checkbox v-model="recipe.vegetarian" true-value="true" false-value="false">Vegetarian</b-form-checkbox>
        <b-form-checkbox v-model="recipe.vegan" true-value="true" false-value="false">Vegan</b-form-checkbox>
        <b-form-checkbox v-model="recipe.glutenFree" true-value="true" false-value="false" style="margin-bottom:10px;">Gluten Free</b-form-checkbox>

        <!-- Ingredients Section -->
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
          <b-form-input 
            v-model="ingredient.name" 
            placeholder="Ingredient Name"
            required
          ></b-form-input>
          <b-form-input 
            v-model="ingredient.amount" 
            placeholder="Amount" 
            type="text"
            required
          ></b-form-input>
          <b-form-input 
            v-model="ingredient.unit" 
            placeholder="Unit" 
            type="text"
            required
          ></b-form-input>
          <b-button @click="removeIngredient(index)" variant="danger">Remove</b-button>
        </div>
        <b-button @click="addIngredient" variant="info" style="margin-top: 10px;">Add Ingredient</b-button>

        <!-- Submit Button -->
        <b-button type="submit" variant="primary" class="mt-3">Create Recipe</b-button>
      </form>
    </b-modal>

    <!-- Display newly created recipe preview -->
    <RecipePreview v-if="createdRecipe" :recipe="createdRecipe" />
  </div>
</template>

<script>
import { createRecipe } from '../services/user';
import RecipePreview from './RecipePreview.vue'; 

export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      recipe: {
        id: 0, 
        image: '', 
        title: '',
        summary: '',
        readyInMinutes: null,
        vegetarian:false,
        vegan: false,
        glutenFree: false,
        ingredients: [],
        instructions: '',
        servings: 0
      },
      titleState: null,
      summaryState: null,
      instructionsState: null,
      readyState: null,
      imageState: null,
      createdRecipe: null
    };
  },
  methods: {
    checkFormValidity() {
      this.titleState = this.recipe.title ? true : false;
      this.summaryState = this.recipe.summary ? true : false;
      this.instructionsState = this.recipe.instructions ? true : false;
      this.readyState = this.recipe.readyInMinutes ? true : false;
      this.imageState = this.recipe.image ? true : false;
      return this.titleState && this.summaryState && this.instructionsState && this.readyState // && this.imageState;
    },
    resetModal() {
      this.recipe = {
        image: '',
        title: '',
        summary: '',
        readyInMinutes: null,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        ingredients: [],
        instructions: '',
        servings: 0
      };
      this.titleState = null;
      this.summaryState = null;
      this.instructionsState = null;
      this.readyState = null;
      this.imageState = null;
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.handleSubmit();
    
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      // If no image URL is provided, use a default
      this.recipe.image = this.recipe.image || 'https://img.spoonacular.com/recipes/716429-556x370.jpg';
      const newRecipe = {
        ...this.recipe,
        aggregateLikes: 0,
      };
      this.$emit('recipe-created', newRecipe);
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    addIngredient() {
      this.recipe.ingredients.push({ name: '', amount: '', unit: '' });
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    }
  }
};
</script>

<style scoped>
</style>
