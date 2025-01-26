<template>
  <section class="category-section">
    <div class="max-w-7xl mx-auto p-6">
      <!-- Search Results Heading -->
      <h2 class="text-2xl font-bold mb-4">Search Results: '{{ query }}'</h2>

      <!-- Suggestions Tags -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="(suggestion, index) in suggestions"
          :key="index"
          class="px-3 py-1 bg-gray-200 rounded-full text-sm cursor-pointer hover:bg-gray-300"
          @click="setQuery(suggestion)"
        >
          {{ suggestion }}
        </span>
      </div>

      <div v-if="articles.length" class="space-y-6 mb-6">
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :image="article.header_image"
          :title="article.title"
          :description="article.description"
          :datePosted="article.created_at"
          :articleId="article.id"
        />
      </div>
      <div v-else>
        <p>No results found.</p>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center space-x-2">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-gray-700 rounded hover:bg-gray-200 disabled:text-gray-400"
        >
          &larr; Previous
        </button>

        <span
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-4 py-2 rounded cursor-pointer',
            page === currentPage ? 'bg-gray-300' : 'hover:bg-gray-200',
          ]"
        >
          {{ page }}
        </span>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-gray-700 rounded hover:bg-gray-200 disabled:text-gray-400"
        >
          Next &rarr;
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
import { useDebounceFn } from "@vueuse/core";

// Suggestions (static for now)
const suggestions = ref([
  "User Interface Design",
  "User Experience Design",
  "User Research",
  "Accessibility",
  "Web Design",
]);

const route = useRoute();
const router = useRouter();

const query = computed(() => route.query.q || "");
const currentPage = ref(1);
const articlesPerPage = 5;
const totalArticles = ref(0);

// Total pages for pagination
const totalPages = computed(() =>
  Math.ceil(totalArticles.value / articlesPerPage)
);

const articles = ref([]);

// Debounced fetchArticles function
const fetchArticles = useDebounceFn(async () => {
  if (!query.value) return;
  try {
    const { articles: fetchedArticles, total } = await $fetch("/api/search", {
      params: {
        query: query.value,
        page: currentPage.value,
        limit: articlesPerPage,
      },
    });

    console.log(`--fetchedArticles--${query.value}`, fetchedArticles);
    articles.value = fetchedArticles || [];
    totalArticles.value = total || 0;
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}, 300); // Debounce time: 300ms

// Watch query and page for changes
watch(
  [query, currentPage],
  () => {
    fetchArticles();
  },
  { immediate: true }
);

// Change page and re-fetch data
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Set query from suggestions
const setQuery = (suggestedQuery) => {
  router.push({ query: { q: suggestedQuery } });
};
</script>

<style>
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

@media screen and (max-width: 768px) {
  .green-star-right-image {
    display: none !important;
  }
  .dark-green-star-left-image {
    display: none !important;
  }
}
</style>
