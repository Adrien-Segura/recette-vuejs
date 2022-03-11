<template>
  <!-- Section 1 -->
  <section
    class="min-h-screen flex flex-col items-center relative w-full py-10 bg-black bg-opacity-95 sm:py-16"
  >
    <div class="absolute inset-0 w-full h-full bg-blue-900 opacity-10"></div>
    <Loader
      v-if="getRecettes.length === 0"
      :classes="'text-white w-44 h-44 my-auto'"
    />
    <div v-if="getRecettes.length > 0" class="max-w-6xl px-1 md:px-10 mx-auto">
      <div class="flex flex-col md:flex-row justify-between w-full pb-5">
        <div class="flex flex-col items-start sm:flex-row sm:items-center">
          <div
            class="px-3 py-2 text-sm font-medium text-white uppercase bg-gray-800"
          >
            Vos Recettes
          </div>
          <p
            class="mt-3 text-white transition duration-300 ease-out opacity-40 sm:ml-4 sm:mt-0 hover:opacity-80"
          >
            Retrouvez toutes vos recettes et bien plus dans cet espace dédié
          </p>
        </div>
        <div class="flex items-center">
          <router-link
            to="/recette/create"
            class="text-white m-5 text-center flex items-center bg-blue-600 rounded px-4 py-2 transition duration-300 ease-out opacity-80 hover:bg-blue-700 hover:opacity-100"
          >
            Créer une recette
          </router-link>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-1">
        <CardVerticale v-for="r in getMyRecette" :key="r._id" :recette="r" />
      </div>

      <div class="grid grid-cols-12 gap-10 mt-10">
        <div class="col-span-12 md:col-span-8">
          <div class="relative overflow-hidden border-b-2 border-purple-500">
            <h4
              class="px-3 py-1.5 bg-purple-500 text-white uppercase text-sm inline-block font-medium"
            >
              Toutes les Recettes
            </h4>
          </div>
          <CardHorizontale
            v-for="recette in getRecettes"
            :key="recette._id"
            :title="recette.title"
            :description="recette.description"
            :id="recette._id"
            :user="recette.user"
            :date="new Date(recette.updated_at)"
          />
        </div>

        <div class="col-span-12 md:col-span-4">
          <div class="relative overflow-hidden border-b-2 border-pink-500">
            <h4
              class="px-3 py-1.5 bg-pink-500 text-white uppercase text-sm inline-block font-medium"
            >
              Dernière Recette
            </h4>
          </div>
          <div class="w-2/3 mt-3">
            <CardVerticale :recette="getRecettes[0]" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { checkAuth } from "@/helpers/User";
import CardHorizontale from "@/components/recettes/CardHorizontale";
import CardVerticale from "@/components/recettes/CardVerticale";
import Loader from "@/components/Loader";

export default {
  name: "RecettesList",
  components: {
    CardHorizontale,
    CardVerticale,
    Loader,
  },
  computed: {
    getRecettes() {
      return this.$store.state.recettes;
    },
    getMyRecette() {
      return this.$store.state.recettes.filter((r) => {
        return r.user.email === this.$store.state.user.email;
      });
    },
  },
  mounted() {
    checkAuth(this.$store.state, this.$router, this.$route);
    this.$store.state.recettes.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  },
};
</script>
