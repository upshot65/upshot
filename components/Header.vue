<!-- components/Header.vue -->
<template>
  <header class="shadow-md z-10" style="background-color: #f1eded">
    <nav class="container mx-auto flex items-center justify-between relative">
      <div class="flex justify-between items-center w-full">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="text-xl font-bold">
            <NuxtImg src="/logo.png" class="w-[169px]" alt="Logo" />
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex relative left-[45px] items-center space-x-6">
          <NuxtLink
            to="/"
            class="nav-link"
            :class="{ active: $route.path === '/' }"
            >Home</NuxtLink
          >

          <NuxtLink
            to="/category"
            class="nav-link"
            :class="{ active: $route.path === '/category' }"
            >Categories</NuxtLink
          >

          <NuxtLink
            to="/about"
            class="nav-link"
            :class="{ active: $route.path === '/about' }"
            >About Us</NuxtLink
          >

          <NuxtLink
            to="/contact"
            class="nav-link"
            :class="{ active: $route.path === '/contact' }"
            >Contact</NuxtLink
          >

          <NuxtLink
            to="/portfolio"
            class="nav-link text-blue-600 font-semibold"
            :class="{ active: $route.path === '/portfolio' }"
            >Portfolio</NuxtLink
          >
        </div>
      </div>
      <div class="flex justify-end items-center w-full">
        <!-- Search Bar - Visible on all screen sizes -->
        <div class="flex flex-1 w-full justify-end items-center max-w-sm mx-4">
          <div class="relative w-full">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Topics..."
              class="w-[356px] pl-12 pr-4 py-3 rounded-full border border-[#D7D7D7] focus:outline-none bg-transparent placeholder:!text-[#49454F]"
            />
            <svg
              class="w-4 h-4 absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <!-- User Profile Dropdown - Desktop -->
        <div class="hidden md:block relative">
          <button
            @click="toggleProfileMenu"
            class="p-2 rounded-full hover:bg-gray-200 transition-colors flex items-center"
          >
            <div
              class="w-14 h-14 rounded-full flex items-center justify-center"
              style="background-color: #004aac"
            >
              <img
                src="../public/images/profile.png"
                alt=""
                style="max-width: 16px"
              />
            </div>
          </button>

          <!-- Profile Dropdown Menu -->
          <div
            v-if="isProfileMenuOpen"
            class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            <!-- Profile Header -->
            <div class="px-4 py-3 border-b border-gray-200">
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="font-medium">Ajay Gupta</div>
                  <div class="text-sm text-gray-500">ajay@xyz.com</div>
                </div>
              </div>
            </div>

            <!-- Menu Items -->
            <div class="py-1">
              <button
                class="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center"
              >
                <svg
                  class="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                View profile
              </button>
              <button
                class="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center"
              >
                <svg
                  class="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </button>
              <button
                class="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center"
              >
                <svg
                  class="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Help
              </button>
              <div class="border-t border-gray-200 my-1"></div>
              <button
                class="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center text-red-600"
                @click="logout"
              >
                <svg
                  class="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Mobile Menu Button -->
      <button
        class="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors ml-2"
        @click="toggleMobileMenu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="!isMobileMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Mobile Menu -->
      <div
        v-if="isMobileMenuOpen"
        class="absolute top-16 right-4 w-48 bg-white rounded-lg shadow-lg py-2 md:hidden"
      >
        <NuxtLink
          to="/"
          class="block px-4 py-2 hover:bg-gray-100 transition-colors"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/categories"
          class="block px-4 py-2 hover:bg-gray-100 transition-colors"
          >Categories</NuxtLink
        >
        <NuxtLink
          to="/about"
          class="block px-4 py-2 hover:bg-gray-100 transition-colors"
          >About Us</NuxtLink
        >
        <NuxtLink
          to="/contact"
          class="block px-4 py-2 hover:bg-gray-100 transition-colors"
          >Contact</NuxtLink
        >
      </div>
    </nav>
  </header>
</template>

<script setup>
const isMobileMenuOpen = ref(false);
const isProfileMenuOpen = ref(false);
const supabase = useSupabaseClient();
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    isProfileMenuOpen.value = false;
  }
};

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
  if (isProfileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

const logout = async () => {
  supabase.auth.signOut();
  router.push("/login"); // Redirect after logout
};

// Close menus when clicking outside
onMounted(() => {
  document.addEventListener("click", (event) => {
    const nav = document.querySelector("nav");
    if (nav && !nav.contains(event.target)) {
      isMobileMenuOpen.value = false;
      isProfileMenuOpen.value = false;
    }
  });
});

import { debounce } from "lodash-es";

const router = useRouter();
const route = useRoute();
const searchQuery = ref("");

// Debounced function to handle search navigation
const performSearch = debounce(() => {
  if (searchQuery.value) {
    console.log("--searchQuery---", searchQuery.value);
    router.push({
      path: "/search",
      query: { q: searchQuery.value },
    });
  }
}, 500); // Adjust debounce time (in milliseconds) as needed

// Watch the search query and trigger debounced search
watch(searchQuery, () => {
  performSearch();
});

// Watch for route changes to clear the search input when navigating away from the search page
watch(
  () => route.path,
  (newPath) => {
    if (newPath !== "/search") {
      searchQuery.value = ""; // Clear the search query if navigating away from the search page
    }
  }
);
</script>
<style scoped>
.nav-link {
  @apply text-gray-700 font-medium transition-all duration-300 hover:text-[#006CE7];
  position: relative;
  padding-bottom: 2px;
}

.nav-link.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 50%;
  height: 3px;
  background-color: #2c5eff; /* Blue underline */
  transition: width 0.3s ease-in-out;
}
</style>
