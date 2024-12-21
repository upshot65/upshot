<template>
  <section class="category-section">
    <div class="max-w-7xl mx-auto p-6">
      <!-- Category Header with Image and Category List -->
      <!-- Category Header with Image and Category List Overlayed -->

      <!-- Articles List -->
      <section v-if="!isLoading" class="space-y-6">
        <ArticleCard
          v-for="article in getArticlesByCategory(selectedCategory?.id)"
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

    <NuxtImg
      src="/images/green-star-right.png"
      alt="Hero Background"
      class="green-star-right-image"
    />
    <NuxtImg
      src="/images/dark-green-star-left.png"
      alt="Hero Background"
      class="dark-green-star-left-image"
    />
  </section>
</template>

<script setup>
const isLoading = ref(false); // Track loading state

const articleStore = useArticleStore();
const { categoriesWithLatest } = storeToRefs(articleStore);

const categoryStore = useCategoryStore();

const { getArticlesByCategory, hasMoreArticles } = storeToRefs(categoryStore);
const currentPage = ref(1);
// Fetch articles for the selected category

// Default to "Technology" category or first available category
const defaultCategory =
  categoriesWithLatest.value?.find(
    (cat) => cat?.category.name === "Technology"
  ) ||
  (categoriesWithLatest.value && categoriesWithLatest.value[0]?.category);

const selectedCategory = useState(
  `selectedCategory`,
  () => defaultCategory?.category
);

selectedCategory.value = defaultCategory?.category;
// const selectedCategory = ref(defaultCategory?.category);

console.log("----selectedCategory---", selectedCategory.value);

const articlesPerPage = 10;

// Fetch categories on mount
onMounted(async () => {
  if (selectedCategory.value) {
    await categoryStore.fetchArticles(
      selectedCategory.value.id,
      currentPage.value,
      articlesPerPage
    );
  }
});

// Watch for category selection
watch(
  selectedCategory,
  async (newCategory) => {
    if (!newCategory) return;
    currentPage.value = 1;
    isLoading.value = true;
    await categoryStore.fetchArticles(newCategory.id, currentPage.value, 10);
    isLoading.value = false;
  },
  { immediate: true }
);

// Load more articles
const loadMoreArticles = async () => {
  if (
    !selectedCategory.value ||
    !hasMoreArticles.value(selectedCategory.value.id)
  )
    return;

  currentPage.value += 1;
  isLoading.value = true;
  await store.fetchArticles(selectedCategory.value.id, currentPage.value, 10);
  isLoading.value = false;
};

// Handle category selection
const selectCategory = (category) => {
  console.log("----selecting category---", category);
  if (selectedCategory.value.id !== category.id) {
    selectedCategory.value = category;
    currentPage.value = 1;
    hasMoreArticles.value = true;
    articles.value = [];
  }
};
</script>

<style scoped>
.category-section {
  position: relative;
}
.green-star-right-image {
  position: absolute;
  top: 30%;
  right: 0;
  z-index: -1;
  width: 242px;
  object-fit: cover;
}
.dark-green-star-left-image {
  position: absolute;
  top: 70%;
  left: 0;
  z-index: -1;
  width: 200px;
  object-fit: cover;
}
</style>
