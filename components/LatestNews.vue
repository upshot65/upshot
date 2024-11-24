<template>
  <section class="latest-news-section">
    <div class="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold text-blue-900 mb-6">Latest News</h2>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(article, index) in latestArticles"
          :key="index"
          :class="index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''"
          class="bg-white overflow-hidden"
        >
          <NuxtLink
            :to="`/articles/${article.id}-${generateSlug(article.title)}`"
          >
            <div class="relative">
              <NuxtImg
                :src="article.image"
                :alt="article.title"
                sizes="100vw sm:50vw md:400px"
                class="w-full h-80 object-cover rounded-xl"
                densities="x1 x2"
                quality="100"
              />

              <!-- Category Badge -->
              <span
                class="absolute top-4 right-4 text-xs px-3 py-1 rounded-full"
                style="background-color: #b9db32"
              >
                {{ article.name }}
              </span>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-900 mb-2">
                {{ article.title }}
              </h3>
              <p class="text-gray-600 text-sm line-clamp-2">
                {{ article.description }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <NuxtImg
      src="/images/green-bg-left.png"
      alt="Hero Background"
      class="latest-news-sectionn-image"
    />
  </section>
</template>

<script setup>
const { generateSlug } = useSlug();
// Access the store
const articleStore = useArticleStore();

// Use `storeToRefs` to extract reactive properties
const { latestArticles } = storeToRefs(articleStore);
// Map state from the store
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.latest-news-section {
  position: relative;
  padding-top: 100px;
  /* margin: 30px 0; */
}
.latest-news-sectionn-image {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 555px;
  object-fit: cover;
}
</style>
