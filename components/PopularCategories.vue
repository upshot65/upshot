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

    <!-- Articles List -->
    <section v-if="!isLoading" class="space-y-6">
      <ArticleCard
        v-for="article in getArticlesByCategory(selectedCategory?.category.id)"
        :key="article.id"
        :image="article.header_image"
        :title="article.title"
        :description="article.description"
        :datePosted="article.created_at"
        :articleId="article.id"
      />
    </section>

    <!-- Loading State -->
    <div v-else class="text-center py-4">Loading...</div>

    <!-- Show More Button -->
    <div
      v-if="hasMoreArticles(selectedCategory?.id)"
      class="flex justify-center mt-8"
    >
      <button
        @click="loadMoreArticles"
        class="px-6 py-2 text-white rounded-3xl hover:bg-blue-600"
        style="background-color: #004aac"
      >
        Show More ^
      </button>
    </div>
  </div>
</template>

<script setup>
const { generateSlug } = useSlug();
const isLoading = ref(false); // Track loading state
const articleStore = useArticleStore();
const { categoriesWithLatest } = storeToRefs(articleStore);

// Show a maximum of 5 categories in the first row
const MAX_CATEGORIES_FIRST_ROW = 8;
const currentPage = ref(1);
const categoryStore = useCategoryStore();

const { getArticlesByCategory, hasMoreArticles } = storeToRefs(categoryStore);

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
  console.log("selectedCategory", selectedCategory.value.category);
}

// Watch for category selection
watch(
  selectedCategory,
  async (newCategory) => {
    if (!newCategory) return;
    console.log("newCategory", newCategory.category);
    currentPage.value = 1;
    isLoading.value = true;
    await categoryStore.fetchArticles(
      newCategory.category.id,
      currentPage.value,
      10
    );
    isLoading.value = false;
  },
  { immediate: true }
);
</script>

<style scoped>
@media (max-width: 768px) {
  .category-image {
    width: 60px;
    height: 60px;
  }
}
</style>
