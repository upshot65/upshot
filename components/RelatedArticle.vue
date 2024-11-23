<template>
  <section class="related-articles max-w-6xl mx-auto px-4 py-8">
    <div class="relative">
      <!-- Slider Container -->
      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <!-- Slide Group -->
          <div
            v-for="(article, index) in articles"
            :key="index"
            class="w-full flex-shrink-0"
          >
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <NuxtImg
                :src="article?.header_image"
                :alt="article?.title"
                class="w-full h-64 object-cover"
              />
              <div class="p-6">
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">
                  {{ article?.title }}
                </h3>
                <p class="text-gray-600 text-base leading-relaxed mb-4">
                  {{ article?.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div class="flex justify-center mt-4 gap-2">
        <button
          v-for="(_, index) in articles"
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full transition-colors duration-200"
          :class="currentSlide === index ? 'bg-green-500' : 'bg-gray-300'"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useWindowSize } from "@vueuse/core";

// Props to pass related articles data
const props = defineProps({
  articleId: {
    type: [String, Number],
    required: true,
  },
  categoryId: {
    type: [String, Number],
    required: true,
  },
});

const articles = ref([]);
const relatedLoading = ref(false);

// Fetch related articles on the client side after the main article is loaded
// onMounted(async () => {
try {
  relatedLoading.value = true;
  const data = await $fetch("/api/articles", {
    params: { categoryId: 1, limit: 5, articleId: 10 },
  });

  console.log("----data.article---", data.articles);
  articles.value = data?.articles;
} catch (error) {
  console.error("Failed to fetch related articles:", error);
} finally {
  relatedLoading.value = false;
}
// });

const currentSlide = ref(0);
const { width: windowWidth } = useWindowSize();

// Dynamically calculate the number of articles per slide based on screen size
const slidesGroups = computed(() => {
  const itemsPerSlide = windowWidth.value < 768 ? 2 : 5;
  const groups = [];
  for (let i = 0; i < articles.value.length; i += itemsPerSlide) {
    console.log(i);
    groups.push(articles.value.slice(i, i + itemsPerSlide));
  }
  console.log(groups);
  return groups;
});

console.log("---slidesGroups--", slidesGroups.value);

// Function to navigate to a specific slide
const goToSlide = (index) => {
  currentSlide.value = index;
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-articles {
  max-width: 100%;
}

@media (max-width: 768px) {
  .related-articles {
    padding: 16px;
  }
}
</style>
