<!-- components/FeaturedArticles.vue -->
<template>
  <section class="featured-section-main">
    <div class="w-full max-w-7xl mx-auto relative">
      <h2 class="text-2xl font-bold text-blue-900 mb-6 px-4">
        Featured Articles
      </h2>

      <div class="relative">
        <!-- Outer container with hidden overflow -->
        <div class="overflow-hidden px-4">
          <!-- Inner scrollable container -->
          <div
            ref="sliderContainer"
            class="flex -mx-2 transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${scrollPosition}px)` }"
          >
            <div
              v-for="article in featuredArticles"
              :key="article.id"
              class="w-full md:max-w-[380px] px-2 flex-shrink-0"
            >
              <NuxtLink
                :to="`/articles/${article.id}-${generateSlug(article.title)}`"
              >
                <div class="bg-white rounded-lg overflow-hidden h-full">
                  <NuxtImg
                    :src="article.header_image"
                    :alt="article.title"
                    class="w-full h-48 object-cover rounded-xl featured-image"
                  />
                  <div class="p-4">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">
                      {{ article.title }}
                    </h3>
                    <p class="text-gray-600 text-sm line-clamp-2">
                      {{ article.description }}
                    </p>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Navigation Dots -->
        <div class="flex justify-center mt-6 gap-2">
          <button
            v-for="index in totalDots"
            :key="index"
            @click="goToSlide(index - 1)"
            class="w-3 h-3 rounded-full transition-colors duration-200"
            :class="currentDot === index - 1 ? 'bg-green-500' : 'bg-gray-300'"
            :aria-label="`Go to slide ${index}`"
          />
        </div>

        <!-- Navigation Arrows -->
        <!-- <button
        v-show="canScrollPrev"
        @click="prevSlide"
        class="absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white rounded-full p-2 shadow-lg z-10"
        aria-label="Previous slide"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button> -->

        <!-- <button
        v-show="canScrollNext"
        @click="nextSlide"
        class="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white rounded-full p-2 shadow-lg z-10"
        aria-label="Next slide"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button> -->
      </div>
    </div>
    <NuxtImg
      src="/images/blue-bg-right.png"
      alt="Hero Background"
      class="featured-section-main-image"
    />
  </section>
</template>
<script setup>
// Access the store
const articleStore = useArticleStore();
const { featuredArticles } = storeToRefs(articleStore);

console.log(featuredArticles.value);

const sliderContainer = ref(null);
const scrollPosition = ref(0);
const currentDot = ref(0);
const containerWidth = ref(0);
const slideWidth = ref(0);
const { generateSlug } = useSlug();
// Computed properties for navigation
const canScrollPrev = computed(() => scrollPosition.value > 0);
const canScrollNext = computed(() => {
  return scrollPosition.value < maxScroll.value;
});

const maxScroll = computed(() => {
  if (!containerWidth.value) return 0;
  const totalWidth = featuredArticles.value.length * slideWidth.value;
  return Math.max(0, totalWidth - containerWidth.value);
});

// Calculate total number of dots needed
const totalDots = computed(() => {
  if (!containerWidth.value) return 1;
  const slidesPerView = Math.floor(containerWidth.value / slideWidth.value);
  return Math.ceil((featuredArticles.value.length - slidesPerView) / 1) + 1;
});

// Initialize and handle resize
onMounted(() => {
  const updateDimensions = () => {
    const container = sliderContainer.value;
    if (!container) return;

    containerWidth.value = container.parentElement.offsetWidth;
    // Get the first slide's width including padding
    const firstSlide = container.firstElementChild;
    if (firstSlide) {
      slideWidth.value = firstSlide.offsetWidth;
    }

    // Ensure we don't scroll beyond bounds after resize
    if (scrollPosition.value > maxScroll.value) {
      scrollPosition.value = maxScroll.value;
      updateCurrentDot(scrollPosition.value);
    }
  };

  updateDimensions();
  window.addEventListener("resize", updateDimensions);

  onUnmounted(() => {
    window.removeEventListener("resize", updateDimensions);
  });
});

const nextSlide = () => {
  const newPosition = Math.min(
    scrollPosition.value + slideWidth.value,
    maxScroll.value
  );
  scrollPosition.value = newPosition;
  updateCurrentDot(newPosition);
};

const prevSlide = () => {
  const newPosition = Math.max(scrollPosition.value - slideWidth.value, 0);
  scrollPosition.value = newPosition;
  updateCurrentDot(newPosition);
};

const goToSlide = (index) => {
  const newPosition = Math.min(index * slideWidth.value, maxScroll.value);
  scrollPosition.value = newPosition;
  currentDot.value = index;
};

const updateCurrentDot = (position) => {
  currentDot.value = Math.round(position / slideWidth.value);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.featured-section-main {
  position: relative;
  padding-top: 100px;
  margin: 30px 0;
}
.featured-section-main-image {
  position: absolute;
  top: 0;
  right: 60px;
  z-index: -1;
  width: 270px;
  object-fit: cover;
}
@media screen and (max-width: 768px) {
  .featured-section-main {
    padding: 0 !important;
  }
  .featured-section-main-image {
    display: none !important;
  }
}

  .featured-image {
  display: inline-block;
  /* Smooth transition for both hover in and out */
}

.featured-image:hover {
/* Shrink the image */
}
</style>
