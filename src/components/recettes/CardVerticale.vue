<template>
  <router-link
    :to="{ name: 'ShowRecette', params: { recetteId: recette._id } }"
    class="relative flex flex-col items-start justify-end col-span-12 px-5 pb-5 overflow-hidden bg-gray-800 cursor-pointer h-96 md:col-span-6 lg:col-span-3 group"
  >
    <img
      class="absolute inset-0 object-cover object-center w-full h-full transition duration-300 ease-out transform scale-100 group-hover:scale-105"
      src="https://cdn.pixabay.com/photo/2017/09/28/18/13/bread-2796393_960_720.jpg"
    />

    <span
      class="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-gray-900 opacity-90"
    ></span>
    <span
      class="bg-purple-500 text-white px-2 py-0.5 inline relative text-xs mb-3 uppercase"
      >{{ recette.title }}</span
    >
    <span class="relative mb-3 text-sm leading-tight text-white">{{
      recette.description
    }}</span>
    <span class="relative flex text-xs text-white opacity-90">
      <span class="mr-1 font-semibold">{{ getDate }}</span>
    </span>
  </router-link>
</template>


<script>
export default {
  name: "CardVerticale",
  props: ["recette"],
  computed: {
    getDate() {
      return new Date(this.recette.updated_at).toLocaleDateString("fr-FR");
    },
  },
};
</script>