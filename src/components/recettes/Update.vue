<template>
  <!-- Section 1 -->
  <section
    class="min-h-screen relative w-full bg-center bg-cover"
    style="
      background-image: url('https://cdn.pixabay.com/photo/2015/09/17/17/19/eggs-944495_960_720.jpg');
    "
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 opacity-90"
    ></div>

    <div class="flex flex-col items-center px-10 pt-20 pb-40">
      <div class="relative z-10 w-full max-w-4xl mt-20 lg:mt-0">
        <Alerts
          v-if="typeAlert != ''"
          :type="typeAlert"
          :message="messageAlert"
        />
        <div
          class="flex flex-col items-start justify-start p-10 bg-black shadow-2xl rounded-xl"
        >
          <h4 class="w-full text-3xl font-bold text-blue-800">
            Créez vos propres Recettes
          </h4>
          <div class="relative w-full mt-6 space-y-8">
            <div class="relative">
              <label class="font-medium text-white">Title</label>
              <input
                type="text"
                class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-stone-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 text-white"
                placeholder="Entrez un titre"
                v-model="title"
              />
            </div>
            <div class="relative">
              <label class="font-medium text-white">Description</label>
              <textarea
                class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-stone-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 text-white"
                placeholder="Entrez une description"
                v-model="description"
              ></textarea>
            </div>
            <div class="relative">
              <label class="font-medium text-white">Durée</label>
              <input
                type="number"
                class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-stone-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 text-white"
                placeholder="Entrez un temps en minutes"
                v-model="minutes"
              />
            </div>
            <div class="relative">
              <label class="font-medium text-white">Personnes</label>
              <input
                type="number"
                class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-stone-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 text-white"
                placeholder="Entrez le nombre de personnes"
                v-model="personnes"
              />
            </div>
            <div class="relative" id="ingredients">
              <h3 class="font-medium text-white">Ingrédients</h3>
              <button
                class="m-1 transition duration-200 hover:bg-blue-800 inline-block w-full p-2 text-sm font-medium text-center text-white bg-blue-700 rounded ease"
                @click="addIngredients"
              >
                Ajouter
              </button>
              <button
                class="m-1 transition duration-200 hover:bg-red-800 inline-block w-full p-2 text-sm font-medium text-center text-white bg-red-700 rounded ease"
                @click="removeIngredients"
              >
                Enlever
              </button>
              <IngredientForm
                @custom-event-input="changeInputIngredient"
                v-for="n in numberIngredient"
                :key="n"
                :id="n"
                :name="ingredients[n - 1] ? ingredients[n - 1].name : ''"
                :quantity="ingredients[n - 1] ? ingredients[n - 1].quantity : 0"
              />
            </div>
            <div class="relative">
              <button
                @click="updateRecipe"
                class="flex justify-center items-center transition duration-200 hover:bg-blue-800 ease inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-700 rounded-lg hover:bg-blue-700 ease"
              >
                Modifier ma recette
                <Loader v-if="showLoader" :classes="'ml-5 w-10'" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { checkAuth } from "@/helpers/User";
import { update, checkRecipe } from "@/helpers/Recette";
import IngredientForm from "@/components/ingredients/Form";
import Loader from "@/components/Loader";
import Alerts from "@/components/Alerts";
export default {
  name: "Update",
  components: {
    IngredientForm,
    Loader,
    Alerts,
  },
  data() {
    return {
      id: "",
      title: "",
      description: "",
      ingredients: [],
      minutes: "",
      personnes: "",
      numberIngredient: 0,
      errors: [],
      showLoader: false,
      typeAlert: "",
      messageAlert: "",
    };
  },
  methods: {
    async updateRecipe() {
      this.showLoader = true;
      const resp = await update(
        this.id,
        this.title,
        this.description,
        this.ingredients,
        this.personnes,
        this.minutes,
        this.$store.state.user.jwt
      );
      this.showLoader = false;
      if (resp.status === 200) {
        const recipe = resp.data.recette;
        this.$store.state.recettes = this.$store.state.recettes.filter(
          (r) => r._id !== this.id
        );
        this.$store.state.recettes.push(recipe);
        this.$router.push({
          name: "ShowRecette",
          params: { recetteId: recipe._id },
        });
      } else {
        this.typeAlert = "danger";
        this.messageAlert =
          "Impossible de modifier la recette, merci de vérifiér les champs saisis.";
      }
    },
    addIngredients() {
      this.numberIngredient =
        this.numberIngredient + 1 > 20 ? 20 : this.numberIngredient + 1;
    },
    removeIngredients() {
      if (this.numberIngredient - 1 !== 0) {
        this.ingredients.splice(this.numberIngredient - 1, 1);
        this.numberIngredient--;
      }
    },
    changeInputIngredient(data) {
      if (data.name !== "" && data.quantity > 0) {
        this.ingredients[data.id - 1] = {
          name: data.name,
          quantity: data.quantity,
        };
      }
    },
  },
  mounted() {
    checkAuth(this.$store.state, this.$router, this.$route);

    const id = this.$route.params.recetteId;
    const recette = this.$store.state.recettes.filter((r) => r._id === id)[0];
    if (!recette || !checkRecipe(recette.user[0], this.$store.state.user)) {
      this.$router.push({ name: "List" });
    }
    this.title = recette.title;
    this.description = recette.description;
    this.minutes = recette.minutes;
    this.personnes = recette.personnes;
    this.ingredients = recette.ingredients;
    this.numberIngredient = recette.ingredients.length;
    this.id = recette._id;
  },
};
</script>