<template>
  <div class="flex items-center py-5 border-b border-gray-900">
    <router-link
      :to="{ name: 'ShowRecette', params: { recetteId: id } }"
      class="w-full h-40 overflow-hidden"
    >
      <div class="w-full pl-5 flex flex-row">
        <img
          class="w-1/3 h-40 object-cover rounded mx-3 transition duration-300 ease-out transform scale-100 bg-cover hover:scale-105"
          src="https://cdn.pixabay.com/photo/2019/11/03/20/33/raspberry-4599580__340.jpg"
        />
        <div>
          <h2 class="relative mb-3 text-xl font-bold leading-tight text-white">
            {{ title }}
          </h2>
          <p class="text-sm text-white opacity-50">
            {{ description }}
          </p>
          <span class="relative flex mt-3 text-xs text-white opacity-90">
            <span class="mr-1 font-semibold">{{ user.email }}</span
            >·<span class="ml-1">{{ getDate }}</span>
          </span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CardHorizontale",
  props: [
    "id",
    "title",
    "description",
    "ingredients",
    "user",
    "minutes",
    "date",
  ],
  computed: {
    getDate() {
      return this.date.toLocaleDateString("fr-FR");
    },
  },
};
</script>