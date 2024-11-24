<template>
  <div class="max-w-7xl mx-auto py-8 px-4">
    <h2 class="text-2xl font-semibold text-blue-800 mb-6">
      Popular Categories
    </h2>

    <!-- Categories List -->
    <div class="flex flex-wrap justify-center md:justify-start gap-6 mb-8">
      <div
        v-for="(category, index) in categoriesWithLatest"
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
    </div>

    <!-- Selected Category Article Preview -->
    <div v-if="selectedArticle" class="relative">
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
// Access the store
const articleStore = useArticleStore();

// Use `storeToRefs` to extract reactive properties
const { categoriesWithLatest } = storeToRefs(articleStore);

const selectedCategory = useState("selectedCategory", () => null);

function selectCategory(category) {
  selectedCategory.value =
    categoriesWithLatest?.value.find(
      (article) => article?.category?.name === category?.category?.name
    ) || null;
}
// Watch for changes in interests to set default category
</script>

<style scoped>
@media (max-width: 768px) {
  /* Mobile-specific styles */
  .category-image {
    width: 60px;
    height: 60px;
  }
}
</style>
