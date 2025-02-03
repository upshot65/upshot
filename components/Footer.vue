<template>
  <footer
    class="text-gray-700 py-10 px-6 pb-0 mt-20 footer-section"
    style="background-color: #f1eded"
  >
    <div
      class="max-w-5xl mx-auto flex items-center flex-col md:flex-row justify-between space-y-10 md:space-y-0"
    >
      <!-- Left Section: Description and Social Icons -->
      <div
        class="md:w-1/3 flex flex-col max-w-[275px]  items-center md:items-start text-center md:text-left space-y-4"
      >
        <NuxtLink to="/" class="text-xl font-bold">
          <NuxtImg src="/logo.png" class="w-[169px]" alt="Logo" />
        </NuxtLink>
        <p class="text-gray-600">
          Lorem ipsum dolor sit amet consectetur. Dapibus scelerisque phasellus habitant sed 
        </p>

        <!-- Social Icons (Positioned below the description on all devices) -->
        <div class="flex justify-center md:justify-start space-x-4">
          <a
            href="category"
            aria-label="Twitter"
            target="_blank"
           class="p-2 rounded-full flex items-center justify-center h-10 w-10 bg-gray-300 hover:bg-[#85B356] transition"
          >
            <i class="fab fa-twitter text-white"></i>
          </a>
          <a
            href="https://www.facebook.com/Upshotbrandmediallp?mibextid=ZbWKwL"
            aria-label="Facebook"
            target="_blank"
           class="p-2 rounded-full flex items-center justify-center h-10 w-10 bg-gray-300 text-white hover:bg-[#85B356] transition"
          >
            <i class="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/upshotbrandmedia/profilecard/?igsh=MWE4ZnRpc2ZxemIxMg%3D%3D"
            aria-label="Instagram"
            target="_blank"
            class="p-2 rounded-full flex items-center justify-center h-10 w-10 bg-gray-300 hover:bg-[#85B356] transition"
          >
            <i class="fab fa-instagram text-white"></i>
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
              <NuxtLink to="/customer-support" class="hover:text-blue-600">
                Customer Support</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/tc" class="hover:text-blue-600">
                Terms & Conditions</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/privacy-policy" class="hover:text-blue-600">
                Privacy Policy</NuxtLink
              >
            </li>
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
              <a href="#" class="hover:text-blue-600">Reading list</a>
            </li>
            <NuxtLink to="/top-articles" class="hover:text-blue-600">
              Top Articles</NuxtLink
            >
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Section: Copyright -->
    <div
      class="mt-10  border-t border-gray-200 py-4 text-center text-gray-500 text-sm"
    >
      © Copyright 2024, All Rights Reserved
    </div>
    <NuxtImg
      src="/images/blue-footer-start.png"
      alt="Hero Background"
      class="footer-section-image"
    />
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
.footer-section {
  position: relative;
  padding-top: 130px;
  /* margin: 30px 0; */
}
.footer-section-image {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 270px;
  object-fit: cover;
}

@media screen and (max-width: 768px) {
  .footer-section-image {
    width: 150px;
  }
}
</style>
