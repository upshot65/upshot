<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Article Header -->
    <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ article.title }}</h1>
    <p class="text-gray-500 mb-4">{{ article.subtitle }}</p>

    <!-- Article Image -->
    <NuxtImg
      :src="article.header_image"
      alt="Article Image"
      class="w-full h-96 object-cover mb-8 rounded-xl"
    />

    <!-- Article Author, Date, and Stats -->
    <div class="flex items-center justify-between mb-8">
      <!-- Author Info -->
      <div class="flex items-center">
        <NuxtImg
          :src="article.authorImage"
          alt="Author Image"
          class="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p class="text-gray-800">{{ article.author }}</p>
          <p class="text-gray-500">{{ formatDate(article.created_at) }}</p>
        </div>
      </div>

      <!-- Article Stats -->
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-1">
          <span class="text-gray-700 font-medium">{{ article.likes }}</span>
          <svg
            class="w-5 h-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 9l-2-2m0 0L10 7m4-2a2 2 0 112.828 2.828L12 12m0 0L7.172 7.172a4 4 0 015.656-5.656M4 16v-2a4 4 0 014-4h7.58a2 2 0 001.637-.986l.137-.34a3 3 0 015.159 2.472v2M8 19l2-2m0 0l2 2m-2-2V13"
            />
          </svg>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-gray-700 font-medium">{{ article.comments }}</span>
          <svg
            class="w-5 h-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h10M3 6h6m7 10h1a2 2 0 002-2v-5a2 2 0 00-2-2h-4a2 2 0 00-2 2v1a2 2 0 002 2h3a2 2 0 012 2v1a2 2 0 01-2 2h-3m0 0H7"
            />
          </svg>
        </div>
        <button
          @click="saveArticle"
          class="text-gray-700 hover:text-blue-600 font-medium"
        >
          Save
        </button>
      </div>
    </div>

    <!-- Social Media Sharing -->
    <div class="flex items-center gap-4 mb-8">
      <span class="text-gray-700 font-medium">Share:</span>
      <a
        :href="`https://twitter.com/share?url=${articleUrl}&text=${article.title}`"
        target="_blank"
        class="text-gray-500 hover:text-blue-500"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M22.46 6.03c-.77.35-1.6.59-2.47.7a4.3 4.3 0 001.88-2.37 8.57 8.57 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9 12.14 12.14 0 01-8.81-4.47 4.27 4.27 0 001.33 5.7 4.27 4.27 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.28 4.28 0 01-1.94.07 4.29 4.29 0 004 2.97 8.61 8.61 0 01-5.3 1.83c-.34 0-.68-.02-1.02-.06A12.17 12.17 0 006.5 19.36 12.14 12.14 0 0018.55 7.3c0-.18-.01-.35-.02-.53a8.67 8.67 0 002.13-2.2"
          />
        </svg>
      </a>
      <a
        :href="`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`"
        target="_blank"
        class="text-gray-500 hover:text-blue-600"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M22 12.07c0-5.48-4.53-9.93-10-9.93S2 6.59 2 12.07c0 4.88 3.5 8.93 8 9.72v-6.9h-2.4v-2.82H10v-1.98c0-2.36 1.42-3.66 3.58-3.66 1 0 2.04.18 2.04.18v2.24H14.6c-1.28 0-1.68.8-1.68 1.63v1.59h2.8l-.45 2.82H13v6.9c4.5-.79 8-4.84 8-9.72"
          />
        </svg>
      </a>
      <a
        :href="`https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`"
        target="_blank"
        class="text-gray-500 hover:text-blue-700"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M19 3A2 2 0 0021 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14M8.33 17v-5.67H5.67V17h2.66m0-8H5.67v2.67h2.66V9m5 5.67v-1.34c0-.74.45-1.34 1.13-1.34s1.13.6 1.13 1.34v1.34h2.67v-5.67h-2.66v.78A2.33 2.33 0 0012.5 10c-1.3 0-2.33 1.2-2.33 2.67V17h2.66z"
          />
        </svg>
      </a>
    </div>

    <!-- Article Content -->
    <div class="text-gray-700 leading-relaxed" v-html="article.content"></div>

    <!-- Article Tags -->
    <div class="mt-6">
      <h3 class="text-xl font-semibold">Tags:</h3>
      <div class="flex gap-2 mt-2">
        <span
          v-for="tag in article.tags"
          :key="tag"
          class="px-3 py-1 bg-gray-200 rounded-lg text-sm text-gray-700"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Related Posts Section -->
    <div class="mt-8">
      <h3 class="text-2xl font-semibold">Related Posts:</h3>
      <div v-if="relatedLoading" class="skeleton-loader">Loading...</div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"
      >
        <ArticleCard
          v-for="related in relatedArticles"
          :key="related.id"
          :article="related"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
// const articleId = route.params.id;
const slug = route.params.slug;

console.log("---slug---", slug);
// Extract the article ID from the slug (before the first dash)
const articleId = ref(slug.split("-")[0]);
console.log("---articleId---", articleId.value);
const categoryId = route.params.category_id; // Category ID passed via route
// console.log("---categoryId---", categoryId.value);
// Fetch article data on the server side for SEO benefits
const { data: response, error } = await useFetch(
  `/api/articles/${articleId.value}`,
  {
    server: true,
  }
);

const article = ref({});

if (error.value) {
  console.error("Failed to fetch article:", error.value);
} else {
  // Access the article data
  article.value = response.value.article;

  console.log("Article data:", article.value);
  console.log("Article image:", article.value.header_image);
}
// Fetch related articles based on category ID (we already have categoryId from route)
const relatedArticles = ref(null);
const relatedLoading = ref(false);

// Compute article URL based on the current route
const articleUrl = computed(() => {
  const baseUrl = window?.location?.origin || "https:upshotmedia.com";
  return `${baseUrl}/articles/${articleId.value}`;
});

// onMounted(async () => {
//   try {
//     relatedLoading.value = true;
//     const { data } = await useFetch(
//       `/api/articles/related?category=${categoryId}`
//     );
//     relatedArticles.value = data.value;
//   } catch (error) {
//     console.error("Failed to fetch related articles:", error);
//   } finally {
//     relatedLoading.value = false;
//   }
// });

// Set SEO meta tags using `useHead`
useHead({
  title: article.value ? article.value.title : "Article",
  meta: [
    {
      name: "description",
      content: article.value
        ? article.value.subtitle
        : "Read the latest article.",
    },
    {
      property: "og:title",
      content: article.value ? article.value.title : "Article",
    },
    {
      property: "og:description",
      content: article.value
        ? article.value.subtitle
        : "Read the latest article.",
    },
    { property: "og:image", content: article.value ? article.value.image : "" },
    // { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: article.value ? article.value.title : "Article",
    },
    {
      name: "twitter:description",
      content: article.value
        ? article.value.subtitle
        : "Read the latest article.",
    },
    {
      name: "twitter:image",
      content: article.value ? article.value.image : "",
    },
  ],
});

// Helper function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
