<template>
  <!-- Section 1 -->
  <section
    class="min-h-screen items-center flex flex-col w-full overflow-hidden bg-white"
  >
    <Loader v-if="!getRecette" :classes="'text-black w-44 h-44 my-auto'" />
    <div
      v-if="getRecette"
      class="flex flex-col w-full overflow-hidden bg-white lg:flex-row sm:mx-auto"
    >
      <div
        class="flex justify-end p-8 bg-white lg:py-32 lg:px-16 lg:pl-10 lg:w-1/2"
      >
        <div
          class="flex flex-col items-start justify-center w-full lg:max-w-lg"
        >
          <Alerts
            v-if="typeAlert != ''"
            :type="typeAlert"
            :message="messageAlert"
          />
          <p
            class="inline-block px-2 py-1 mb-5 font-medium tracking-wider text-gray-900 uppercase bg-gray-200 rounded-full text-xxs"
          >
            Recette
          </p>
          <h5
            class="mb-3 text-3xl font-extrabold leading-none sm:text-4xl lg:text-7xl"
          >
            {{ getRecette.title }}
          </h5>
          <p class="py-5 mb-5 text-gray-600 lg:text-xl">
            <span class="font-bold">Description: </span>
            {{ getRecette.description }}
          </p>
          <div class="flex items-center" style="flex-wrap: wrap">
            <p
              class="inline-flex items-center justify-center h-12 px-6 mr-3 mt-3 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-900 focus:shadow-outline focus:outline-none"
            >
              Temps: {{ getRecette.minutes }}min
            </p>
            <p
              class="inline-flex items-center justify-center h-12 px-6 mr-3 mt-3 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-900 focus:shadow-outline focus:outline-none"
            >
              Personnes: {{ getRecette.personnes ? getRecette.personnes : 0 }}
            </p>
            <div class="flex" v-if="isMyRecette">
              <router-link
                :to="{
                  name: 'UpdateRecipe',
                  params: { recetteId: getRecette._id },
                }"
                class="inline-flex items-center justify-center h-12 px-6 mr-3 mt-3 font-medium tracking-wide text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:shadow-outline focus:outline-none"
              >
                Modifier
              </router-link>
              <button
                @click="deleteRecette"
                class="flex justify-center items-center inline-flex items-center justify-center h-12 px-6 mr-3 mt-3 font-medium tracking-wide text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600 focus:shadow-outline focus:outline-none"
              >
                Supprimer
                <Loader v-if="showLoader" :classes="'ml-5 w-10'" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="relative lg:w-1/2">
        <img
          src="https://cdn.pixabay.com/photo/2014/12/11/02/55/cereals-563796_960_720.jpg"
          alt="Hero Image"
          class="object-cover w-full lg:absolute h-80 lg:h-full"
        />
      </div>
    </div>
    <div v-if="getRecette" class="w-full py-12 sm:py-16 bg-white">
      <div class="max-w-7xl px-10 mx-auto sm:text-center">
        <p class="text-blue-500 font-medium uppercase">Ingrédients</p>
        <h2 class="font-bold text-3xl sm:text-4xl lg:text-5xl mt-3">
          {{ getRecette.ingredients.length }} Ingrédients
        </h2>
        <p class="mt-4 text-gray-500 text-base sm:text-xl lg:text-2xl">
          Vous aurez besoin de :
        </p>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 my-12 sm:my-16"
        >
          <Ingredient
            v-for="ingredient in getRecette.ingredients"
            :key="ingredient.name"
            :name="ingredient.name"
            :quantity="ingredient.quantity"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { checkAuth } from "@/helpers/User";
import { destroy } from "@/helpers/Recette";
import Ingredient from "@/components/recettes/Ingredient";
import Loader from "@/components/Loader";
import Alerts from "@/components/Alerts";
export default {
  name: "RecettesShow",
  components: {
    Ingredient,
    Loader,
    Alerts,
  },
  data() {
    return {
      showLoader: false,
      typeAlert: "",
      messageAlert: "",
    };
  },
  computed: {
    getRecette() {
      return this.$store.state.recettes.filter(
        (r) => r._id === this.$route.params.recetteId
      )[0];
    },
    isMyRecette() {
      return this.getRecette.user[0].email === this.$store.state.user.email;
    },
  },
  methods: {
    async deleteRecette() {
      this.showLoader = true;
      const resp = await destroy(
        this.$route.params.recetteId,
        this.$store.state.user.jwt
      );
      this.showLoader = false;
      if (resp.status === 200) {
        this.$store.state.recettes = this.$store.state.recettes.filter(
          (r) => r._id !== this.getRecette._id
        );
        this.$router.push({ name: "List" });
      } else {
        this.typeAlert = "danger";
        this.messageAlert =
          "Une erreur est survenue lors de la supression, merci de réessayer";
      }
    },
    checkRecipe() {
      if (!this.getRecette) {
        this.$router.push({ name: "List" });
      }
    },
  },
  mounted() {
    checkAuth(this.$store.state, this.$router, this.$route);
    this.checkRecipe();
  },
};
</script>