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
            class="flex-shrink-0 px-2 h-[500px]"
            :style="{ flex: `0 0 ${100 / itemsPerSlide}%` }"
          >
            <div class="bg-white rounded-lg shadow-md overflow-hidden h-full">
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
          v-for="(_, index) in Math.ceil(articles.length / itemsPerSlide)"
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
import { ref, computed, onMounted } from "vue";
import { useWindowSize } from "@vueuse/core";

const articles = ref([]);
const relatedLoading = ref(false);
const currentSlide = ref(0);

// Dynamically calculate the number of items per slide based on screen size
const { width: windowWidth } = useWindowSize();
const itemsPerSlide = computed(() => (windowWidth.value < 768 ? 1 : 3));

// Fetch related articles
onMounted(async () => {
  try {
    relatedLoading.value = true;
    const data = await $fetch("/api/articles", {
      params: { categoryId: 1, limit: 5, articleId: 10 },
    });

    articles.value = data?.articles;
  } catch (error) {
    console.error("Failed to fetch related articles:", error);
  } finally {
    relatedLoading.value = false;
  }
});

// Function to navigate to a specific slide
const goToSlide = (index) => {
  currentSlide.value = index;
};
</script>

<style scoped>
.related-articles {
  max-width: 100%;
}

@media (max-width: 768px) {
  .related-articles {
    padding: 16px;
  }
}
</style>
