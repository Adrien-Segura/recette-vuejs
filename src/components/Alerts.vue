<template>
  <div>
    <!-- This is an example component -->
    <div class="max-w-lg mx-auto">
      <div
        v-if="type === 'info'"
        class="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
        role="alert"
      >
        <svg
          class="w-5 h-5 inline mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div><span class="font-medium">Info alert!</span> {{ message }}</div>
      </div>
      <div
        v-if="type === 'danger'"
        class="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700"
        role="alert"
      >
        <svg
          class="w-5 h-5 inline mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div><span class="font-medium">Danger alert!</span> {{ message }}</div>
      </div>
      <div
        v-if="type === 'success'"
        class="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700"
        role="alert"
      >
        <svg
          class="w-5 h-5 inline mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div><span class="font-medium">Success alert!</span> {{ message }}</div>
      </div>
      <div
        v-if="type === 'warning'"
        class="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700"
        role="alert"
      >
        <svg
          class="w-5 h-5 inline mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div><span class="font-medium">Warning alert!</span> {{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alerts",
  props: ["type", "message"],
};
</script>