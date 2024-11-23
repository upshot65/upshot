<template>
  <div class="flex justify-center items-center py-10 px-2 md:px-4 lg:px-8">
    <!-- Main container with background color and rounded corners -->
    <div
      class="bg-blue-800 text-white max-w-6xl w-full p-6 md:p-8 lg:p-10 rounded-2xl relative flex flex-col space-y-6 items-center"
    >
      <!-- White Decorative Strips -->
      <div class="absolute top-0 left-0 w-8 h-8 rounded-br-full bg-white"></div>
      <div
        class="absolute bottom-0 right-0 w-8 h-8 rounded-tl-full bg-white"
      ></div>

      <!-- Header Text -->
      <h2 class="text-2xl md:text-3xl font-semibold text-center w-full">
        Subscribe to our newsletter
      </h2>

      <!-- Subscription Form -->
      <form
        @submit.prevent="handleSubscribe"
        class="flex flex-col md:flex-row md:flex-wrap items-center space-y-4 md:space-y-0 w-full"
      >
        <!-- Name Input -->
        <input
          type="text"
          v-model="name"
          placeholder="First name"
          class="w-full md:w-auto flex-grow px-4 py-2 border border-white bg-blue-800 text-white rounded-lg placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
        <!-- Email Input -->
        <input
          type="email"
          v-model="email"
          placeholder="Email address"
          class="w-full md:w-auto flex-grow px-4 py-2 border border-white bg-blue-800 text-white rounded-lg placeholder-white focus:outline-none focus:ring-2 focus:ring-white mt-4 md:mt-0 md:ml-4"
          required
        />
        <!-- Subscribe Button -->
        <button
          type="submit"
          class="w-full md:w-auto px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors mt-4 md:mt-4 lg:mt-0 lg:ml-4"
        >
          Subscribe Now
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");

function handleSubscribe() {
  // Add your subscription logic here
  alert(`Subscribed with name: ${name.value} and email: ${email.value}`);
  name.value = "";
  email.value = "";
}
</script>

<style scoped></style>
