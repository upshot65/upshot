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
          <div class="hidden sm:block">
            <div
              class="w-10 h-10 rounded-full bg-lime-500 flex justify-center ml-3 cursor-pointer"
            >
              <NuxtImg
                src="/images/category-menu-arrow.svg"
                alt="Hero Background"
                class="w-2"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Articles List -->
      <section v-if="!isLoading" class="space-y-6">
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

      <!-- Loading State -->
      <div v-else class="text-center py-4">Loading...</div>

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
const isLoading = ref(false); // Track loading state
// Default to "Technology" category or first available category
const defaultCategory =
  interests.value?.find((cat) => cat.name === "Technology") ||
  (interests.value && interests.value[0]);

const selectedCategory = ref(defaultCategory);

console.log("----selectedCategory---", selectedCategory.value);

const articles = ref([]);
const articlesPerPage = 10;
const currentPage = ref(1);
const hasMoreArticles = ref(true);

// Fetch articles for the selected category
const fetchArticles = async () => {
  try {
    isLoading.value = true;
    console.log("---making api call again---", selectedCategory.value.id);
    const data = await $fetch("/api/articles", {
      params: {
        categoryId: selectedCategory.value.id,
        page: currentPage.value,
        limit: articlesPerPage,
      },
    });

    console.log("-----data----", data);

    if (data.articles.length < articlesPerPage) {
      hasMoreArticles.value = false;
    }
    articles.value.push(...data.articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
  } finally {
    isLoading.value = false;
  }
};

watchEffect(() => {
  if (selectedCategory.value) {
    fetchArticles();
  }
});

const loadMoreArticles = async () => {
  if (!hasMoreArticles.value) return;

  try {
    // isLoading.value = true;
    currentPage.value += 1;

    const response = await $fetch("/api/articles", {
      params: {
        categoryId: selectedCategory.value.id,
        page: currentPage.value,
        limit: articlesPerPage,
      },
    });

    if (response.articles.length < articlesPerPage) {
      hasMoreArticles.value = false;
    }

    articles.value.push(...response.articles);
  } catch (error) {
    console.error("Error loading more articles:", error);
  } finally {
    // isLoading.value = false;
  }
};

// Handle category selection
const selectCategory = (category) => {
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
