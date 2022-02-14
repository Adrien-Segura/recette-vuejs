<template>
  <div
    :id="'ingredient' + id"
    class="border border-sm border-gray-100 border-solid p-3 m-3 rounded-md"
  >
    <label class="font-medium text-white">Nom</label>
    <input
      type="text"
      class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-stone-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 text-white"
      placeholder="Nommez l'ingrédient"
      v-model="nameLocal"
      @change="changeInputEvent"
    />
    <label class="font-medium text-white">Quantité</label>
    <input
      type="number"
      class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-stone-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 text-white"
      placeholder="Saisissez la quantité nécessaire"
      v-model="quantityLocal"
      @change="changeInputEvent"
    />
  </div>
</template>
<script>
export default {
  name: "IngredientForm",
  props: ["id", "name", "quantity"],
  data() {
    return {
      nameLocal: this.name,
      quantityLocal: this.quantity,
    };
  },
  methods: {
    changeInputEvent() {
      const ingre = {
        id: this.id,
        name: this.nameLocal,
        quantity: Number(this.quantityLocal),
      };
      this.$emit("custom-event-input", ingre);
    },
  },
};
</script>