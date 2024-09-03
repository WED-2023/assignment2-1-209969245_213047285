import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import RecipeViewPage from "./pages/RecipeViewPage";
import MyRecipesPage from "./pages/MyRecipesPage.vue";
import FavoriteRecipesPage from "./pages/FavoriteRecipesPage.vue";
import AboutPage from "./pages/AboutPage.vue";
import FamilyRecipesPage from "./pages/FamilyRecipesPage.vue";


const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/search",
    name: "search",
    component: SearchPage,
  },
  {
    path: '/recipe/:recipeId',
    name: "recipe",
    component: RecipeViewPage,
  },
  
  {
    path: "/myRecipes",
    name: "myRecipes",
    component: MyRecipesPage,
  },
  {
    path: "/favoriteRecipes",
    name: "favoriteRecipes",
    component: FavoriteRecipesPage,
  },
  {
    path: "/familyeRecipes",
    name: "familyRecipes",
    component: FamilyRecipesPage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;



