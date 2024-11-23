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
              v-for="article in articles"
              :key="article.id"
              class="w-full md:max-w-[380px] px-2 flex-shrink-0"
            >
              <div class="bg-white rounded-lg overflow-hidden h-full">
                <NuxtImg
                  :src="article.image"
                  :alt="article.title"
                  class="w-full h-48 object-cover rounded-xl"
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
const articles = ref([
  {
    id: 1,
    title: "LinkedIn removes its top voice batches from collab. articles",
    description:
      'LinkedIn has announced that it\'s retiring its "Top Voice" badges for contributing to Collaborative Articles, which, seemingly, has been one of...',
    image: "/featured/1.png",
  },
  {
    id: 2,
    title: "Rosemary: Health benefits, precautions & drug interactions",
    description:
      "Rosemary has long been popular for its flavor and scent, but it is also rich in iron, calcium, and vitamin B6, as well as antioxidants and...",
    image: "/featured/2.png",
  },
  {
    id: 3,
    title: "Mystery of the Milky Way's most bizarre supernova",
    description:
      'In the year 1181, a "guest star" was recorded in the constellation of Cassiopeia. Its modern supernova remnant is weirder...',
    image: "/featured/3.png",
  },
  {
    id: 4,
    title: "New Discoveries in Deep Space",
    description:
      "Recent telescopic observations have revealed unprecedented details about distant galaxies...",
    image: "/featured/1.png",
  },
  {
    id: 5,
    title: "Advances in Quantum Computing",
    description:
      "Scientists have made a breakthrough in quantum computing that could revolutionize...",
    image: "/featured/2.png",
  },
  {
    id: 6,
    title: "The Future of AI Technology",
    description:
      "Exploring the latest developments in artificial intelligence and their potential impact...",
    image: "/featured/3.png",
  },
  {
    id: 4,
    title: "New Discoveries in Deep Space",
    description:
      "Recent telescopic observations have revealed unprecedented details about distant galaxies...",
    image: "/featured/2.png",
  },
  {
    id: 5,
    title: "Advances in Quantum Computing",
    description:
      "Scientists have made a breakthrough in quantum computing that could revolutionize...",
    image: "/featured/2.png",
  },
  {
    id: 6,
    title: "The Future of AI Technology",
    description:
      "Exploring the latest developments in artificial intelligence and their potential impact...",
    image: "/featured/2.png",
  },
]);
const sliderContainer = ref(null);
const scrollPosition = ref(0);
const currentDot = ref(0);
const containerWidth = ref(0);
const slideWidth = ref(0);

// Computed properties for navigation
const canScrollPrev = computed(() => scrollPosition.value > 0);
const canScrollNext = computed(() => {
  return scrollPosition.value < maxScroll.value;
});

const maxScroll = computed(() => {
  if (!containerWidth.value) return 0;
  const totalWidth = articles.value.length * slideWidth.value;
  return Math.max(0, totalWidth - containerWidth.value);
});

// Calculate total number of dots needed
const totalDots = computed(() => {
  if (!containerWidth.value) return 1;
  const slidesPerView = Math.floor(containerWidth.value / slideWidth.value);
  return Math.ceil((articles.value.length - slidesPerView) / 1) + 1;
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
@media screen and (max-width : 768px) {
  .featured-section-main {
    padding: 0 !important;
  }
  .featured-section-main-image{
    display: none !important;
  }
}
</style>
