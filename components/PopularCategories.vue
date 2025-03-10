<template>
  <div class="max-w-7xl mx-auto py-8 px-4">
    <h2 class="text-2xl font-semibold text-blue-800 mb-6">
      Popular Categories
    </h2>

    <!-- Categories List -->
    <div class="flex flex-wrap justify-center md:justify-start w-full gap-6 mb-12">
      <div
        v-for="(category, index) in visibleCategories"
        :key="index"
        @click="selectCategory(category)"
        class="cursor-pointer flex flex-col items-center space-y-2"
      >
        <!-- Category Image (Circle) -->
        <div
          class="w-[220px] h-[220px]  rounded-full overflow-hidden border-4"
          :class="{
            'border-green-500':
              selectedCategory?.category?.name === category?.category?.name,
            'border-transparent':
              selectedCategory?.category?.name !== category?.category?.name,
          }"
        >
          <NuxtImg
            :src="category?.category.image_url"
            :alt="category?.category.name"
            class="w-full h-full object-cover"
          />
        </div>
        <!-- Category Name -->
        <p class="text-center text-blue-800 font-medium">
          {{ category?.category?.name }}
        </p>
      </div>

      <!-- Explore All Box -->
      <NuxtLink

        to="/category"
        class="cursor-pointer flex flex-col items-center space-y-2"
      >
        <div
          class="w-[220px] h-[220px] rounded-full bg-gray-200 flex items-center justify-center text-blue-800 font-bold border-4 border-transparent"
        >
          Explore All
        </div>
        <p class="text-center text-blue-800 font-medium">Explore All</p>
      </NuxtLink>
    </div>

    <!-- Remaining Categories -->
    <div
      v-if="showAll && remainingCategories.length > 0"
      class="flex flex-wrap justify-center md:justify-start gap-6"
    >
      <div
        v-for="(category, index) in remainingCategories"
        :key="'remaining-' + index"
        @click="selectCategory(category)"
        class="cursor-pointer flex flex-col items-center space-y-2"
      >
        <div
          class="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4"
          :class="{
            'border-green-500':
              selectedCategory?.category?.name === category?.category?.name,
            'border-transparent':
              selectedCategory?.category?.name !== category?.category?.name,
          }"
        >
          <NuxtImg
            :src="category?.category.image_url"
            :alt="category?.category.name"
            class="w-full h-full object-cover"
          />
        </div>
        <p class="text-center text-blue-800 font-medium">
          {{ category?.category?.name }}
        </p>
      </div>
    </div>
    <div class="relative overflow-hidden min-h-[300px] btl-bg cursor-pointer group w-fit">
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black opacity-50"></div>
      
      <div class="absolute bottom-0 left-[20px] text-white p-3 text-lg">
        BTL Highlights
      </div>
      
      <!-- Centered Events Button -->
      <div class="absolute inset-0 flex items-center justify-center">
        <NuxtLink to="./btl-highlights" class="bg-[#004AAC] text-white min-w-40 py-2 px-4 rounded-full shadow-lg hover:text-black hover:bg-gray-200 transition duration-300 custom-pulse">
          Upcoming Events
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script setup>
const articleStore = useArticleStore();
const { categoriesWithLatest } = storeToRefs(articleStore);
const router = useRouter();
// Show a maximum of 5 categories in the first row
const MAX_CATEGORIES_FIRST_ROW = 4;

const showAll = ref(false);
const selectedCategory = useState("selectedCategory", () => null);

// Split categories into visible and remaining categories
const visibleCategories = computed(() =>
  categoriesWithLatest.value.slice(0, MAX_CATEGORIES_FIRST_ROW)
);
const remainingCategories = computed(() =>
  categoriesWithLatest.value.slice(MAX_CATEGORIES_FIRST_ROW)
);

// Whether to show the Explore All box
const showExploreAll = computed(
  () => remainingCategories.value.length > 0 && !showAll.value
);

// Toggle visibility of remaining categories
function toggleShowAll() {
  showAll.value = !showAll.value;
}

function selectCategory(category) {
  selectedCategory.value =
    categoriesWithLatest.value.find(
      (article) => article?.category?.name === category?.category?.name
    ) || null;
  router.push({
    path: "/category",
    query: { q: category?.category?.id },
  });
}
</script>

<style scoped>

@keyframes custom-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.custom-pulse {
  animation: custom-pulse 1s infinite;
}
.btl-bg {
  background-image: url('/images/popular-main.png');
  background-size: cover;
  background-position: center;
  min-height: 500px;
  height: 100%;
  width: 100%;
}

@media (max-width: 768px) {
  .category-image {
    width: 60px;
    height: 60px;
  }
  .btl-bg {
    min-height: 300px;
  }
}
</style>
