<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing title="Create Recipe" style="position:fixed;bottom: 20px;font-size:xx-large;padding-left:25px;padding-right:20px;margin-left:-5px">
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

        <b-form-group
          label="Description"
          label-for="description-input"
          :state="descriptionState"
        >
          <b-form-textarea
            id="description-input"
            v-model="recipe.description"
            :state="descriptionState"
            required
          ></b-form-textarea>
        </b-form-group>

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
            required
          ></b-form-input>
        </b-form-group>

        <b-form-checkbox v-model="recipe.vegetarian" true-value="true" false-value="false">Vegetarian</b-form-checkbox>
        <b-form-checkbox v-model="recipe.vegan" true-value="true" false-value="false">Vegan</b-form-checkbox>
        <b-form-checkbox v-model="recipe.glutenFree" true-value="true" false-value="false" style="margin-bottom:10px;">Gluten Free</b-form-checkbox>

        

        <!-- Ingredients Section -->
        <b-form-group v-for="(ingredient, index) in recipe.ingredients" :key="index">
          <b-form-input v-model="ingredient.name" placeholder="Ingredient Name"></b-form-input>
          <b-form-input v-model="ingredient.amount" placeholder="Amount" type="text"></b-form-input>
          <b-form-input v-model="ingredient.unit" placeholder="Unit" type="text"></b-form-input>
          <b-button @click="removeIngredient(index)" variant="danger">Remove</b-button>
        </b-form-group>
        <b-button @click="addIngredient">Add Ingredient</b-button>

        <b-button type="submit" variant="primary">Create Recipe</b-button>
      </form>
    </b-modal>

    <!-- Display newly created recipe preview -->
    <RecipePreview v-if="createdRecipe" :recipe="createdRecipe" />
  </div>
</template>

<script>
import RecipePreview from './RecipePreview.vue'; // Adjust path as necessary

export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      recipe: {
        id: 0, // Generate a unique ID for the new recipe
        image: '', // Ensure to add image and other necessary properties
        title: '',
        summary: '',
        description: '',
        readyInMinutes: null,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        ingredients: [] // Array to hold ingredients dynamically
      },
      titleState: null,
      summaryState: null,
      descriptionState: null,
      readyState: null,
      createdRecipe: null
    };
  },
  methods: {
    checkFormValidity() {
      //this.titleState = this.$refs.form.titleInput.validity.valid ? true : false;
      //this.summaryState = this.$refs.form.summaryInput.validity.valid ? true : false;
      //this.descriptionState = this.$refs.form.descriptionInput.validity.valid ? true : false;
      //this.readyState = this.$refs.form.readyInput.validity.valid ? true : false;
      //return this.titleState && this.summaryState && this.descriptionState && this.readyState;
     // this.imageState = this.$refs.form.imageInput.validity.valid ? true : false;
      return true;
    },
    resetModal() {
      this.recipe = {
        id: 0,
        image: '',
        title: '',
        summary: '',
        description: '',
        readyInMinutes: null,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        ingredients: []
      };
      this.titleState = null;
      this.summaryState = null;
      this.descriptionState = null;
      this.readyState = null;
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      if (!this.recipe.image) {
      this.recipe.image = 'https://img.spoonacular.com/recipes/716429-556x370.jpg';
    }
      const newRecipe = {
        ...this.recipe,
        id: Date.now(),
        aggregateLikes: 0 // Initial likes, can be set dynamically later
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
