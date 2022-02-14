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

    <div class="flex flex-col items-center px-10 pt-20 pb-40 lg:flex-row">
      <div class="relative w-full max-w-2xl bg-cover lg:w-7/12">
        <div
          class="relative flex flex-col items-center justify-center w-full h-full lg:pr-10"
        >
          <div class="flex flex-col items-start space-y-8">
            <div class="relative">
              <h1
                class="text-2xl font-extrabold leading-tight text-gray-100 sm:text-3xl md:text-4xl"
              >
                Bienvenue chez Adri & Wily
              </h1>
            </div>
            <p class="text-2xl text-white">
              Des recettes savoureuses à partager en famille ou entre amis!
            </p>
            <router-link
              to="/recettes"
              class="inline-block px-8 py-5 text-2xl font-medium tracking-wide text-center text-white transition duration-200 hover:bg-blue-800 ease bg-blue-700 rounded-lg"
              >Voir nos Recettes</router-link
            >
          </div>
        </div>
      </div>

      <div
        v-if="!isConnected"
        class="relative z-10 w-full max-w-2xl mt-20 lg:mt-0 lg:w-5/12"
      >
        <Alerts
          v-if="typeAlert != ''"
          :type="typeAlert"
          :message="messageAlert"
        />

        <div
          class="flex flex-col items-start justify-start p-10 bg-black shadow-2xl rounded-xl"
        >
          <h4 class="w-full text-3xl font-bold text-blue-800">S'inscrire</h4>
          <div class="relative w-full mt-6 space-y-8">
            <div class="relative">
              <label class="font-medium text-white">Adresse Mail</label>
              <p id="email-error" class="text-red-500"></p>

              <input
                id="email"
                type="email"
                name="email"
                class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-stone-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 text-white"
                placeholder="Entrez votre Adresse Mail"
                v-model="email"
              />
            </div>
            <div class="relative">
              <label class="font-medium text-white">Mot de Passe</label>
              <p id="password-error" class="text-red-500"></p>

              <input
                id="password"
                type="password"
                class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-stone-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 text-white"
                placeholder="Choisissez votre Mot de Passe"
                v-model="password"
              />
            </div>
            <div class="relative">
              <button
                @click="registerForm"
                class="flex justify-center items-center transition duration-200 hover:bg-blue-800 ease inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-700 rounded-lg hover:bg-blue-700 ease"
              >
                Créer mon Compte
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
import { register } from "@/helpers/User";
import Alerts from "@/components/Alerts";
import Loader from "@/components/Loader";

export default {
  name: "Home",
  components: {
    Alerts,
    Loader,
  },
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      typeAlert: "",
      messageAlert: "",
      showLoader: false,
    };
  },
  computed: {
    isConnected() {
      return Object.keys(this.$store.state.user).length !== 0;
    },
  },
  methods: {
    async registerForm() {
      this.showLoader = true;
      const resp = await register(this.email, this.password);
      this.showLoader = false;
      if (resp.status === 200) {
        this.$store.state.messageBag = {
          type: "success",
          message:
            "Compte créer avec succès, vous pouvez vous connecter dès à présent.",
        };
        this.$router.push({ name: "Login" });
      } else {
        resp.data.list.forEach((err) => {
          if (err.message[1] === "REQUIRED") {
            const el = document.getElementById(err.field);
            el.classList.add("bg-red-300", "placeholder-red-500");
            const elErr = document.getElementById(err.field + "-error");
            elErr.textContent = "Le champs est requis.";
          } else if (err.message[1] === "UNIQUE") {
            const el = document.getElementById(err.field);
            el.classList.add("bg-red-300", "text-red-500");
            const elErr = document.getElementById(err.field + "-error");
            elErr.textContent = "Le champs " + err.field + " est déjà utilisé.";
          }
        });
        this.typeAlert = "danger";
        this.messageAlert = "Impossible de créer un compte.";
      }
    },
  },
};
</script>