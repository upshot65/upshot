<template>
  <footer class="text-gray-700 py-10 px-6" style="background-color: #f1eded">
    <div
      class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between space-y-10 md:space-y-0"
    >
      <!-- Left Section: Description and Social Icons -->
      <div
        class="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left space-y-4"
      >
        <p class="text-gray-600">
          Lorem ipsum dolor sit amet consectetur. Dapibus scelerisque phasellus
          habitant sed.
        </p>

        <!-- Social Icons (Positioned below the description on all devices) -->
        <div class="flex justify-center md:justify-start space-x-4">
          <a
            href="category"
            aria-label="Twitter"
            class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <i class="fab fa-twitter text-gray-600"></i>
          </a>
          <a
            href="#"
            aria-label="Facebook"
            class="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
          >
            <i class="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <i class="fab fa-instagram text-gray-600"></i>
          </a>
        </div>
      </div>

      <!-- Center Section: Links -->
      <div
        class="md:w-2/3 flex flex-col md:flex-row justify-between text-center md:text-left space-y-6 md:space-y-0"
      >
        <!-- Company Links -->
        <div class="space-y-2">
          <div
            @click="toggleSection('company')"
            class="flex justify-between items-center md:justify-start cursor-pointer"
          >
            <h4 class="font-semibold text-blue-800">COMPANY</h4>
            <span
              v-if="!isDesktop"
              :class="isOpen.company ? 'rotate-180' : ''"
              class="transform transition-transform"
            >
              ▼
            </span>
          </div>
          <ul
            v-show="isDesktop || isOpen.company"
            class="space-y-1 md:pl-0 pl-4"
          >
            <li>
              <NuxtLink to="/category" class="hover:text-blue-600">
                Category</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-blue-600">
                About us</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-blue-600">
                Contact</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Help Links -->
        <div class="space-y-2">
          <div
            @click="toggleSection('help')"
            class="flex justify-between items-center md:justify-start cursor-pointer"
          >
            <h4 class="font-semibold text-blue-800">HELP</h4>
            <span
              v-if="!isDesktop"
              :class="isOpen.help ? 'rotate-180' : ''"
              class="transform transition-transform"
            >
              ▼
            </span>
          </div>
          <ul v-show="isDesktop || isOpen.help" class="space-y-1 md:pl-0 pl-4">
            <li>
              <a href="#" class="hover:text-blue-600">Customer Support</a>
            </li>
            <li>
              <a href="#" class="hover:text-blue-600">Terms & Conditions</a>
            </li>
            <li><a href="#" class="hover:text-blue-600">Privacy Policy</a></li>
          </ul>
        </div>

        <!-- Resources Links -->
        <div class="space-y-2">
          <div
            @click="toggleSection('resources')"
            class="flex justify-between items-center md:justify-start cursor-pointer"
          >
            <h4 class="font-semibold text-blue-800">RESOURCES</h4>
            <span
              v-if="!isDesktop"
              :class="isOpen.resources ? 'rotate-180' : ''"
              class="transform transition-transform"
            >
              ▼
            </span>
          </div>
          <ul
            v-show="isDesktop || isOpen.resources"
            class="space-y-1 md:pl-0 pl-4"
          >
            <li>
              <a href="#" class="hover:text-blue-600">Previous newsletters</a>
            </li>
            <li><a href="#" class="hover:text-blue-600">Top Articles</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Section: Copyright -->
    <div
      class="mt-10 mb-20 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm"
    >
      © Copyright 2024, All Rights Reserved
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Track which sections are open
const isOpen = ref({
  company: false,
  help: false,
  resources: false,
});

// Track if we are on desktop to show expanded layout
const isDesktop = ref(false);

function toggleSection(section) {
  // Toggle section visibility only on mobile
  if (!isDesktop.value) {
    isOpen.value[section] = !isOpen.value[section];
  }
}

// Set desktop mode based on screen size
function updateIsDesktop() {
  isDesktop.value = window.innerWidth >= 768; // md breakpoint in Tailwind
}

onMounted(() => {
  updateIsDesktop();
  window.addEventListener("resize", updateIsDesktop);
});
</script>

<style scoped>
/* Additional styling if needed */
</style>
