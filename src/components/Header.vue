<template>
  <!-- Section 1 -->
  <section
    class="box-border relative block w-full py-6 leading-10 text-center text-indigo-900 bg-black border-gray-200 md:py-8"
  >
    <div class="w-full px-6 mx-auto leading-10 text-center md:px-8 max-w-7xl">
      <div
        class="box-border flex flex-wrap items-center justify-between -mx-4 text-indigo-900"
      >
        <div
          class="relative z-20 flex items-center w-auto px-4 leading-10 lg:flex-grow-0 lg:flex-shrink-0 lg:text-left"
        >
          <router-link
            to="/"
            class="box-border inline-block font-sans text-2xl font-bold text-left text-white no-underline bg-transparent cursor-pointer focus:no-underline"
          >
            Chez Adri & Wily
          </router-link>
        </div>
        <div
          class="left-0 z-0 flex justify-start w-full px-4 mt-2 font-medium leading-10 md:mt-0 md:justify-center md:absolute md:flex-grow-0 md:text-left lg:text-center"
        >
          <router-link
            to="/"
            :class="{ underline: nameRoute === 'Home' }"
            class="decoration-gray-300 hover:decoration-gray-200 decoration-3 decoration-solid box-border inline-block mr-4 text-center text-gray-300 bg-transparent cursor-pointer hover:text-gray-200"
          >
            Accueil
          </router-link>
          <router-link
            v-if="checkIsConnected"
            to="/recettes"
            :class="{ underline: nameRoute === 'List' }"
            class="decoration-gray-300 hover:decoration-gray-200 decoration-3 decoration-solid box-border inline-block mr-4 text-center text-gray-300 bg-transparent cursor-pointer hover:text-gray-200"
          >
            Nos Recettes
          </router-link>
        </div>
        <div
          v-if="!checkIsConnected"
          class="relative flex items-center px-4 mt-2 font-medium leading-10 md:flex-grow-0 md:flex-shrink-0 md:mt-0 md:text-right lg:flex-grow-0 lg:flex-shrink-0"
        >
          <router-link
            to="/login"
            class="box-border inline-block h-10 px-4 mr-3 text-right text-gray-200 no-underline bg-gray-800 rounded-lg cursor-pointer md:mr-0 md:bg-transparent hover:text-white focus:no-underline"
          >
            Se Connecter
          </router-link>
          <router-link
            to="/register"
            class="box-border inline-flex items-center h-10 px-4 text-base text-center text-gray-100 no-underline align-middle bg-gray-800 rounded-lg cursor-pointer select-none hover:bg-gray-50 hover:text-gray-900 focus:shadow-xs focus:no-underline"
          >
            S'inscrire
          </router-link>
        </div>
        <button
          @click="logout"
          v-if="checkIsConnected"
          class="inline-flex z-10 items-center justify-center h-12 px-6 mr-3 mt-3 font-medium tracking-wide text-white transition duration-200 focus:shadow-outline focus:outline-none"
        >
          Déconnexion
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Header",
  computed: {
    checkIsConnected() {
      return Object.keys(this.$store.state.user).length !== 0;
    },
    nameRoute() {
      return this.$route.name;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("e");
      localStorage.removeItem("lastUrl");
      this.$store.state.user = {};
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
