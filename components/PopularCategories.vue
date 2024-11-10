<template>
  <div class="max-w-7xl mx-auto py-8 px-4">
    <h2 class="text-2xl font-semibold text-blue-800 mb-6">
      Popular Categories
    </h2>

    <!-- Categories List -->
    <div class="flex flex-wrap justify-center md:justify-start gap-6 mb-8">
      <div
        v-for="(category, index) in interests"
        :key="index"
        @click="selectCategory(category)"
        class="cursor-pointer flex flex-col items-center space-y-2"
      >
        <!-- Category Image (Circle) -->
        <div
          class="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4"
          :class="{
            'border-green-500': selectedCategory?.name === category.name,
            'border-transparent': selectedCategory?.name !== category.name,
          }"
        >
          <NuxtImg
            :src="category.image_url"
            :alt="category.name"
            class="w-full h-full object-cover"
          />
        </div>
        <!-- Category Name -->
        <p class="text-center text-blue-800 font-medium">{{ category.name }}</p>
      </div>
    </div>

    <!-- Selected Category Article Preview -->
    <div v-if="selectedArticle" class="relative">
      <NuxtImg
        :src="selectedArticle.image_url"
        :alt="selectedArticle.title"
        class="w-full rounded-lg object-cover"
      />
      <div
        class="absolute bottom-4 left-4 text-white bg-black bg-opacity-60 p-2 rounded-lg"
      >
        <h3 class="text-lg font-semibold">{{ selectedArticle.title }}</h3>
      </div>
    </div>
  </div>
</template>
<script setup>
const interests = useState("interests"); // Populated by your plugin on app mount
console.log("interests----in page- ", interests.value);

const articles = ref([
  {
    category: "Technology",
    title: "Tech Article",
    image_url: "path/to/tech-article.jpg",
  },
  {
    category: "Fashion",
    title: "Fashion Article",
    image_url: "path/to/fashion-article.jpg",
  },
  {
    category: "Business",
    title: "Business Article",
    image_url: "path/to/business-article.jpg",
  },
  {
    category: "Finance",
    title: "Finance Article",
    image_url: "path/to/finance-article.jpg",
  },
]);

const selectedCategory = useState("selectedCategory", () => null);
const selectedArticle = ref(null);

function selectCategory(category) {
  selectedCategory.value = category;
  selectedArticle.value =
    articles.value.find((article) => article.category === category.name) ||
    null;
}
// Watch for changes in interests to set default category
watchEffect(() => {
  if (
    interests.value &&
    interests.value.length > 0 &&
    !selectedCategory.value
  ) {
    selectCategory(interests.value[0]); // Default to the first category
  }
});

// onMounted(() => {
//   selectCategory(selectedCategory.value);
// });
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
