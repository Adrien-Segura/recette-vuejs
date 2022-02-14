<template>
  <!-- Section 1 -->
  <section class="min-h-screen w-full px-8 py-16 bg-black xl:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="flex flex-col items-center md:flex-row">
        <div class="w-full space-y-5 md:w-3/5 md:pr-16">
          <Alerts
            v-if="typeAlert != ''"
            :type="typeAlert"
            :message="messageAlert"
          />
          <p class="font-medium text-blue-500 uppercase">Page de Connexion</p>
          <h2
            class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl"
          >
            Connectez-vous
          </h2>
          <p class="text-xl text-gray-400 md:pr-16">
            Retrouvez toutes vos recettes. Créez et partagez vos recettes à
            l'infiniiiii !!!!!! (enfin pas trop non plus...)
          </p>
        </div>

        <div class="w-full mt-16 md:mt-0 md:w-2/5">
          <div
            class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-stone-900 border-gray-300 rounded-lg shadow-2xl px-7"
          >
            <h3 class="mb-6 text-2xl font-medium text-center text-blue-700">
              Formulaire de Connexion
            </h3>
            <p id="email-error" class="text-red-500"></p>

            <input
              id="email"
              type="email"
              name="email"
              class="bg-stone-700 placeholder-gray-400 text-white block w-full px-4 py-3 mb-4 border border-2 border-transparent rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Entrez votre Adresse Mail"
              v-model="email"
            />

            <input
              type="password"
              name="password"
              class="bg-stone-700 placeholder-gray-400 text-white block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Entrez votre Mot de Passe"
              v-model="password"
            />
            <div class="block">
              <button
                @click="loginForm"
                class="flex justify-center items-center transition duration-200 hover:bg-blue-800 ease w-full px-3 py-4 font-medium text-white bg-blue-700 rounded-lg"
              >
                Me Connecter
                <Loader v-if="showLoader" :classes="'ml-5 w-10'" />
              </button>
            </div>
            <p class="w-full mt-4 text-sm text-center text-gray-500">
              Toujours pas de compte ?
              <router-link to="/register" class="text-blue-500 underline"
                >Inscrivez vous ici</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { login } from "@/helpers/User";
import Loader from "@/components/Loader";
import Alerts from "@/components/Alerts";
export default {
  name: "Login",
  components: {
    Loader,
    Alerts,
  },
  data() {
    return {
      email: "",
      password: "",
      showLoader: false,
      typeAlert: "",
      messageAlert: "",
    };
  },
  methods: {
    async loginForm() {
      this.showLoader = true;
      const resp = await login(this.email, this.password);
      this.showLoader = false;
      if (resp.status === 200) {
        this.$store.state.user = {
          jwt: resp.data.jwt,
          email: this.email,
        };
        localStorage.token = this.$store.state.user.jwt;
        localStorage.e = this.$store.state.user.email;
        let url = localStorage.lastUrl;
        if (!url) url = "/recettes";
        this.$router.push(url);
      } else if (resp.status === 400) {
        const el = document.getElementById("email");
        el.classList.add("bg-red-300", "placeholder-red-500");
        const elErr = document.getElementById("email-error");
        elErr.textContent = "Utilisateur non trouvé";
        this.typeAlert = "danger";
        this.messageAlert = "Impossible de se connecter.";
        this.password = "";
      }
    },
  },
  mounted() {
    if (localStorage.token && localStorage.e) {
      this.$store.state.user = {
        email: localStorage.e,
        jwt: localStorage.token,
      };
      this.$router.push(localStorage.lastUrl);
    }
    if (this.$store.state.messageBag.type === "success") {
      this.typeAlert = "success";
      this.messageAlert = this.$store.state.messageBag.message;
      this.$store.state.messageBag = {};
    }
  },
};
</script>