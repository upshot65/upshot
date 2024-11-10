<template>
  <div class="relative w-full max-w-7xl mx-auto px-4 py-8">
    <!-- Background Shape -->
    <div class="absolute inset-0 flex justify-center items-center">
      <NuxtImg src="/hero/background-shape.png" />
      alt="Background Shape" class="w-3/4 md:w-1/2 lg:w-1/3 opacity-20 z-0" />
    </div>

    <!-- Text Overlay -->
    <div
      class="absolute inset-0 flex flex-col justify-center items-center text-center z-10"
    >
      <h1
        class="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
      >
        Your daily dose of <br class="hidden md:block" />
        insights, & stories
      </h1>
    </div>

    <!-- Images Grid -->
    <div class="relative grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="overflow-hidden rounded-lg"
      >
        <NuxtImg
          :src="image.src"
          :alt="`Image ${index + 1}`"
          class="w-full h-full object-cover"
          quality="100"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const images = ref([
  { src: "/hero/1.png" },
  { src: "/images/hero-2.jpg" },
  { src: "/images/hero-3.jpg" },
  { src: "/images/hero-4.jpg" },
  { src: "/images/hero-5.jpg" },
  { src: "/images/hero-6.jpg" },
  { src: "/images/hero-7.jpg" },
  { src: "/images/hero-8.jpg" },
  { src: "/images/hero-9.jpg" },
  { src: "/images/hero-10.jpg" },
  { src: "/images/hero-11.jpg" },
  { src: "/images/hero-12.jpg" },
]);

// Define responsive sizes for different screen widths
const sizes = computed(
  () => "(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 33vw"
);
</script>

<style scoped>
/* Custom styling for the text background on mobile and desktop */
@media (min-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
</style>
