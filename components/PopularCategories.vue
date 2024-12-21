<template>
  <div class="max-w-7xl mx-auto py-8 px-4">
    <h2 class="text-2xl font-semibold text-blue-800 mb-6">
      Popular Categories
    </h2>

    <!-- Categories List -->
    <div class="flex flex-wrap justify-center md:justify-start gap-6 mb-8">
      <div
        v-for="(category, index) in visibleCategories"
        :key="index"
        @click="selectCategory(category)"
        class="cursor-pointer flex flex-col items-center space-y-2"
      >
        <!-- Category Image (Circle) -->
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
        <!-- Category Name -->
        <p class="text-center text-blue-800 font-medium">
          {{ category?.category?.name }}
        </p>
      </div>

      <!-- Explore All Box -->
      <div
        v-if="showExploreAll"
        @click="toggleShowAll"
        class="cursor-pointer flex flex-col items-center space-y-2"
      >
        <div
          class="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gray-200 flex items-center justify-center text-blue-800 font-bold border-4 border-transparent"
        >
          Explore All
        </div>
        <p class="text-center text-blue-800 font-medium">Explore All</p>
      </div>
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

    <!-- Selected Category Article Preview -->
    <div v-if="selectedArticle" class="relative mt-8">
      <NuxtLink
        :to="`/articles/${selectedArticle?.latest_article?.id}-${generateSlug(
          selectedArticle?.latest_article?.title
        )}`"
      >
        <NuxtImg
          :src="selectedArticle?.latest_article?.header_image"
          :alt="selectedArticle?.category?.image_url"
          class="w-full rounded-lg object-cover"
        />
        <div
          class="absolute bottom-4 left-4 text-white bg-black bg-opacity-60 p-2 rounded-lg"
        >
          <h3 class="text-lg font-semibold">
            {{ selectedArticle?.latest_article?.title }}
          </h3>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { generateSlug } = useSlug();
const articleStore = useArticleStore();
const { categoriesWithLatest } = storeToRefs(articleStore);

// Show a maximum of 5 categories in the first row
const MAX_CATEGORIES_FIRST_ROW = 8;

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
}
</script>

<style scoped>
@media (max-width: 768px) {
  .category-image {
    width: 60px;
    height: 60px;
  }
}
</style>
