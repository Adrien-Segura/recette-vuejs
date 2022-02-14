import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import Vuex from "vuex";
import { getAll } from "@/helpers/Recette";

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    recettes: [],
    lastUrl: "",
    messageBag: {}
  },
  mutations: {
    getRecettes(state, recettes) {
      state.recettes = recettes;
    }
  },
  actions: {
    async getAllRecettes({ commit }) {
      const resp = await getAll();
      if (resp.status === 200) {
        commit("getRecettes", resp.data.recipes);
      }
    }
  }
});

store.dispatch("getAllRecettes");

new Vue({
  router,
  render: (h) => h(App),
  store
}).$mount("#app");
