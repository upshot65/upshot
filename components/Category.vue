<template>
  <section class="category-section">
    <div class="max-w-7xl mx-auto p-0 md:p-6">
      <!-- Category Header with Image and Category List -->
      <!-- Category Header with Image and Category List Overlayed -->
      <section class="relative mb-8 rounded-lg overflow-hidden">
        <!-- Category Image -->
        <NuxtImg :src="selectedCategory?.image_url" alt="Category Image" class="w-full h-[500px] object-cover" />

        <!-- Category List Overlay -->
        <div
          class="absolute pb-8 inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/60 to-transparent p-4">
          <div class="flex gap-5 overflow-x-auto whitespace-nowrap scrollbar-hide" ref="categoryScroll">
            <button v-for="cat in categoriesWithLatest" :key="cat?.category.id" @click="selectCategory(cat?.category)"
              :class="[
                'px-9 py-3 rounded-full text-sm font-medium',
                selectedCategory?.id === cat.category.id ? 'bg-[#000] text-white' : 'bg-[#B9DB32] text-black',
              ]">
              {{ cat.category.name }}
            </button>
          </div>

          <!-- Arrow Button -->
          <div class="ml-3 flex items-center">
            <button class="w-8 h-8 flex justify-center items-center bg-[#B9DB32] rounded-full" @click="scrollNext">
              <NuxtImg src="/images/category-menu-arrow.svg" alt="Next" class="w-2" />
            </button>
          </div>
        </div>
      </section>


      <!-- Articles List -->
      <section v-if="!isLoading" class="space-y-6 mt-16">
        <ArticleCard v-for="article in getArticlesByCategory(selectedCategory?.id)" :key="article.id"
          :image="article.header_image" :title="article.title" :description="article.description"
          :datePosted="article.created_at" :articleId="article.id" />
      </section>

      <!-- Loading State -->
      <div v-else class="text-center py-4">Loading...</div>

      <!-- Show More Button -->
      <div v-if="hasMoreArticles(selectedCategory?.id)" class="flex justify-center mt-8">
        <button @click="loadMoreArticles" class="px-6 py-2 text-white rounded-3xl hover:bg-blue-600"
          style="background-color: #004aac">
          Show More ^
        </button>
      </div>
    </div>

    <NuxtImg src="/images/green-star-right.png" alt="Hero Background" class="green-star-right-image" />
    <NuxtImg src="/images/dark-green-star-left.png" alt="Hero Background" class="dark-green-star-left-image" />
  </section>
</template>

<script setup>
const isLoading = ref(false); // Track loading state
const route = useRoute();
const articleStore = useArticleStore();
const { categoriesWithLatest } = storeToRefs(articleStore);
const query = computed(() => route.query.q || "");
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

if (query.value) {
  selectedCategory.value = categoriesWithLatest.value?.find((cat) => {
    return cat?.category.id == query.value;
  })?.category;
}
// const selectedCategory = ref(defaultCategory?.category);

console.log("----selectedCategory---", selectedCategory.value);

const articlesPerPage = 10;

// Fetch categories on mount
onMounted(async () => {
  if (selectedCategory.value) {
    await categoryStore.fetchArticles(
      selectedCategory.value.id || 1,
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


import { ref } from 'vue';

const categoryScroll = ref(null);

const scrollNext = () => {
  if (categoryScroll.value) {
    categoryScroll.value.scrollBy({ left: 200, behavior: 'smooth' });
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

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
