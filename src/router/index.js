import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";
import Login from "@/components/Login";
import Register from "@/components/Register";
import RecettesList from "@/components/recettes/List";
import Show from "@/components/recettes/Show";
import Create from "@/components/recettes/Create";
import Update from "@/components/recettes/Update";

Vue.use(VueRouter);

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home
  },
  {
    name: "Login",
    path: "/login",
    component: Login
  },
  {
    name: "Register",
    path: "/register",
    component: Register
  },
  {
    name: "List",
    path: "/recettes",
    component: RecettesList
  },
  {
    name: "CreateRecipe",
    path: "/recette/create",
    component: Create
  },
  {
    name: "UpdateRecipe",
    path: "/recette/update/:recetteId",
    component: Update
  },
  {
    name: "ShowRecette",
    path: "/recette/:recetteId",
    component: Show
  }
];

export default new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
