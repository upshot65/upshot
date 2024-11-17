<template>
  <section class="category-section">
    <div class="max-w-7xl mx-auto p-6">
      <!-- Category Header with Image and Category List -->
      <!-- Category Header with Image and Category List Overlayed -->
      <section class="relative mb-8 rounded-lg overflow-hidden">
        <!-- Category Image -->
        <NuxtImg
          :src="selectedCategory.image_url"
          alt="Category Image"
          class="w-full h-64 object-cover"
        />

        <!-- Category List Overlay -->
        <div
          class="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/40 to-transparent p-4"
        >
          <div class="flex gap-3 overflow-x-auto">
            <button
              v-for="cat in interests"
              :key="cat.id"
              @click="selectCategory(cat)"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium',
                selectedCategory?.id === cat.id
                  ? 'bg-lime-500 text-white'
                  : 'bg-gray-200 text-gray-700',
              ]"
            >
              {{ cat.name }}
            </button>
          </div>
        </div>
      </section>

      <!-- Articles List -->
      <section class="space-y-6">
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :image="article.header_image"
          :title="article.title"
          :description="article.description"
          :datePosted="article.datePosted"
          :articleId="article.id"
        />
      </section>

      <!-- Show More Button -->
      <div v-if="hasMoreArticles" class="flex justify-center mt-8">
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
// Get interests from the useState ("interests")
const interests = useState("interests");

// Default to "Technology" category or first available category
const defaultCategory =
  interests.value?.find((cat) => cat.name === "Technology") ||
  (interests.value && interests.value[0]);

const selectedCategory = ref(defaultCategory);

console.log("----selectedCategory---", selectedCategory.value);
// const categoryImage = computed(
//   () => selectCategory.value && selectCategory.value.image_url
// );
// console.log("----categoryImage---", categoryImage.value);

const articles = ref([]);
const articlesPerPage = 10;
const currentPage = ref(1);
const hasMoreArticles = ref(true);

// Fetch articles for the selected category
const fetchArticles = async () => {
  const { data, error } = await $fetch(`/api/articles`, {
    params: {
      categoryId: selectedCategory.value.id,
      page: currentPage.value,
      limit: articlesPerPage,
    },
  });
  console.log("-----data----", data);
  console.log("-----error----", error);
  if (error) {
    console.error("Error fetching articles:", error);
    return;
  }

  if (data.articles.length < articlesPerPage) {
    hasMoreArticles.value = false;
  }
  articles.value.push(...data.articles);
};

watch(selectedCategory, (newCategory) => {
  if (newCategory) {
    fetchArticles(); // Make the API call on change
  } else {
    results.value = []; // Clear results if query is empty
  }
});
// Server-side data fetching for initial articles
const { data: initialArticles } = useAsyncData(
  `${selectedCategory.value.id}_articles`,
  async () => {
    const result = await $fetch(`/api/articles`, {
      params: {
        categoryId: selectedCategory.value.id,
        page: 1,
        limit: articlesPerPage,
      },
    });
    return result;
  },
  { immediate: true }
);

console.log("-----data--articles--", initialArticles._value.articles);

articles.value = initialArticles._value.articles || [];

// Function to load more articles
const loadMoreArticles = () => {
  currentPage.value += 1;
  fetchArticles();
};

// Function to handle category selection
const selectCategory = (category) => {
  if (selectedCategory.value.id !== category.id) {
    selectedCategory.value = category;
    articles.value = [];
    currentPage.value = 1;
    hasMoreArticles.value = true;
    fetchArticles();
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
