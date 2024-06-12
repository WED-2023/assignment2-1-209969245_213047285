<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">

      <b-form-group
          id="input-group-username"
          label-cols-sm="3"
          label="Username:"
          label-for="username"
      >
        <b-form-input
            id="username"
            v-model="$v.form.username.$model"
            type="text"
            @input="checkUsername"
            :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username should contain letters only
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="$v.form.username.$error">
          Username already exists. Please enter a different username.
        </b-form-invalid-feedback>

      </b-form-group>


      <b-form-group
          id="input-group-firstName"
          label-cols-sm="3"
          label="First Name:"
          label-for="firstName"
      >
        <b-form-input
            id="firstName"
            v-model="$v.form.firstName.$model"
            type="text"
            :state="validateState('firstName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
          id="input-group-lastName"
          label-cols-sm="3"
          label="Last Name:"
          label-for="lastName"
      >
        <b-form-input
            id="lastName"
            v-model="$v.form.lastName.$model"
            type="text"
            :state="validateState('lastName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
          id="input-group-country"
          label-cols-sm="3"
          label="Country:"
          label-for="country"
      >
        <b-form-select
            id="country"
            v-model="$v.form.country.$model"
            :options="countries"
            :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
          id="input-group-password"
          label-cols-sm="3"
          label="Password:"
          label-for="password"
      >
        <b-form-input
            id="password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="$v.form.password.$error">
          Your password should be between 5-10 characters long and contain at least one number and one special character.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
          id="input-group-confirmedPassword"
          label-cols-sm="3"
          label="Confirm Password:"
          label-for="confirmedPassword"
      >
        <b-form-input
            id="confirmedPassword"
            type="password"
            v-model="$v.form.confirmedPassword.$model"
            :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.confirmedPassword.sameAsPassword">
          The confirmed password does not match the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
          id="input-group-email"
          label-cols-sm="3"
          label="Email:"
          label-for="email"
      >
        <b-form-input
            id="email"
            type="email"
            v-model="$v.form.email.$model"
            :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.email.email">
          Email must be valid
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
          type="submit"
          variant="primary"
          style="width:250px;"
          class="ml-5 w-75"
      >Register</b-button>
      <div class="mt-2">
        Already have an account?
        <router-link to="login">Log in here</router-link>
      </div>
    </b-form>
    <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import countries from "../assets/countries";
import { required, minLength, maxLength, alpha, sameAs, email, helpers } from "vuelidate/lib/validators";

const passwordValidator = helpers.regex('password', /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/);

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      usernameError: false,
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (value) => minLength(3)(value) && maxLength(8)(value),
        alpha
      },
      firstName: { required },
      lastName: { required },
      country: { required },
      password: {
        required,
        length: (value) => minLength(5)(value) && maxLength(10)(value),
        passwordValidator
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        email
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error
          : null;
    },
    async checkUsernameExists(username) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      return users.some(user => user.username === username);
    },
    saveUserToLocalStorage(userDetails) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(userDetails);
      localStorage.setItem("users", JSON.stringify(users));
    },

    async Register() {
      if (await this.checkUsernameExists(this.form.username)) {
        this.$v.form.username.$error = true; // Set the error state for the username field
        return;
      }
      const userDetails = {
        username: this.form.username,
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        country: this.form.country,
        password: this.form.password,
        email: this.form.email
      };

      this.saveUserToLocalStorage(userDetails);
      this.$router.push("/login");
    },
    async onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        this.$v.form.username.$error = true;
        return;
      }
      if (await this.checkUsernameExists(this.form.username)) {
        this.$v.form.username.$error = true; // Set the error state for the username field
        return;
      }

      this.saveUserToLocalStorage(this.form);
      this.$router.push("/login");
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>

