<template>
  <div
    class="rounded-lg py-10 flex flex-col items-center justify-center shadow-lg border border-gray-100"
  >
    <p class="font-bold mt-4">{{ name }}</p>
    <p class="mt-2 text-sm text-gray-500">Quantité: {{ quantity }}</p>
  </div>
</template>

<script>
export default {
  name: "Ingredient",
  props: ["name", "quantity"],
};
</script>