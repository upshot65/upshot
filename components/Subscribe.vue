<template>
  <div class="flex justify-center items-center py-10 px-2 md:px-4 lg:px-8">
    <!-- Main container with background color and rounded corners -->
    <div
      class="bg-blue-800 text-white max-w-6xl w-full py-10 md:py-14 lg:py-14 rounded-2xl relative flex flex-col space-y-6 items-center"
    >
      <!-- White Decorative Strips -->
      <img
        class="absolute top-0 left-0 h-auto w-full max-w-[100px]"
        src="/images/form-shape-1.png"
        alt=""
      />
      <img
        class="absolute bottom-0 right-0 h-auto w-full max-w-[100px]"
        src="/images/form-shape-2.png"
        alt=""
      />
      <div class="max-w-[739px] flex flex-col gap-4">
        <!-- Header Text -->
        <h2 class="text-2xl mb-4 md:text-3xl font-semibold text-center w-full">
          Subscribe to our newsletter
        </h2>

        <!-- Subscription Form -->
        <form
          @submit.prevent="subscribe"
          class="flex flex-col md:flex-row md:flex-wrap items-center space-y-4 md:space-y-0 w-full"
        >
          <!-- Name Input -->
          <input
            type="text"
            v-model="name"
            placeholder="First name"
            class="w-full md:w-auto flex-grow px-4 py-2 border border-gray-100 bg-blue-800 text-white rounded-md placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <!-- Email Input -->
          <input
            type="email"
            v-model="email"
            placeholder="Email address"
            class="w-full md:w-auto flex-grow px-4 py-2 border border-white bg-blue-800 text-white rounded-md placeholder-white focus:outline-none focus:ring-2 focus:ring-white mt-4 md:mt-0 md:ml-4"
            required
          />
          <!-- Subscribe Button -->
          <button
            type="submit"
            class="w-full md:w-auto px-10 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors mt-4 md:mt-4 lg:mt-0 lg:ml-4"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");

const subscribe = async () => {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, name: name.value }),
  });
  const data = await res.json();
  console.log("--", data);
  message.value =
    data.status === "subscribed"
      ? "Subscribed successfully!"
      : "Error subscribing.";
  alert(`Subscribed with name: ${name.value} and email: ${email.value}`);
  name.value = "";
  email.value = "";
};
</script>

<style scoped></style>
