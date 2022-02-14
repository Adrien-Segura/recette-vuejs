<template>
  <!-- Section 1 -->
  <section class="py-10 bg-black">
    <div class="px-10 mx-auto max-w-7xl">
      <div class="flex flex-col justify-between text-center md:flex-row">
        <ul class="flex flex-row justify-center pb-3 -ml-4 -mr-4 text-sm">
          <li>
            <router-link to="/" class="px-4 text-gray-500 hover:text-white"
              >Accueil</router-link
            >
          </li>
          <li>
            <router-link
              to="/recettes"
              class="px-4 text-gray-500 hover:text-white"
              >Nos Recettes</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Footer",
};
</script>