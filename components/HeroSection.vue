<template>
  <div class="relative flex flex-col items-center mt-[-84px] z-[0] bg-white">
    <!-- Header Text -->
    <h1 class="lg:text-[60px] text-[40px] top-[105px] font-serif banner-heading leading-[1.1] font-bold text-black text-center z-10 relative after:w-full after:object-cover">
      Your daily dose of <br />
      insights, & stories
    </h1>

    <!-- Masonry Grid Layout -->
    <div class="grid max-h-[648px] overflow-hidden z-[30] relative layout-grid-banner grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 w-full mt-6 mx-auto justify-items-center px-4 md:px-0">
      <div class="grid gap-3 w-full">
        <div v-for="(image, index) in leftColumn" :key="'left-' + index">
          <img :src="image" data-aos="fade-right"
            class="hover:scale-[1.05] transition-transform duration-300 z-10 w-full rounded-lg object-cover cursor-pointer max-w-full h-full" 
            alt="Gallery Image" />
        </div>
      </div>

      <div class="grid w-full gap-3 pt-0 md:pt-[150px]">
        <div v-for="(image, index) in middleLeftColumn" :key="'middle-left-' + index">
          <img :src="image" data-aos="fade-down" class="hover:scale-[1.05] transition-transform duration-300 z-10 w-full rounded-lg object-cover cursor-pointer max-w-full h-full" alt="Gallery Image" />
        </div>
      </div>

      <div class="grid w-full gap-3 sm:pt-[160px] md:pt-[260px]">
        <div class="w-full" v-for="(image, index) in middleRightColumn" :key="'middle-right-' + index">
          <img :src="image" data-aos="fade-down" class="hover:scale-[1.05] transition-transform duration-300 z-10 w-full rounded-lg object-cover cursor-pointer max-w-full h-full" alt="Gallery Image" />
        </div>
      </div>

      <div class="grid gap-3 w-full sm:pt-[80px] md:pt-[150px]">
        <div v-for="(image, index) in rightColumn" :key="'right-' + index">
          <img :src="image" data-aos="fade-down" class="hover:scale-[1.05] transition-transform duration-300 z-10 w-full rounded-lg object-cover cursor-pointer max-w-full h-full" alt="Gallery Image" />
        </div>
      </div>

      <div class="grid gap-3 w-full">
        <div v-for="(image, index) in lastColumn" :key="'right-' + index">
          <img :src="image" data-aos="fade-left" class="hover:scale-[1.05] transition-transform duration-300 z-10 w-full rounded-lg object-cover cursor-pointer max-w-full h-full" alt="Gallery Image" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Image lists for different columns
const leftColumn = ref([
  "/images/hero-gallery-1.png",
  "/images/hero-gallery-2.png",
  "/images/hero-gallery-3.png",
]);

const middleLeftColumn = ref([
  "/images/hero-gallery-3.png",
  "/images/hero-gallery-5.png",
  "/images/hero-gallery-6.png",
]);

const middleRightColumn = ref([
  "/images/hero-gallery-4.png",
  "/images/hero-gallery-4.png",
  "/images/hero-gallery-5.png",
]);

const rightColumn = ref([
  "/images/hero-gallery-5.png",
"/images/hero-gallery-4.png",
"/images/hero-gallery-6.png",
]);
const lastColumn = ref([
  "/images/hero-gallery-6.png",
  "/images/hero-gallery-7.png",
  "/images/hero-gallery-5.png",
]);


import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

onMounted(() => {
  AOS.init({
    // You can customize AOS options here if needed
    duration: 1000, // Animation duration
    easing: 'ease-in-out', // Easing function
    once: true, // Whether animation should happen only once - while scrolling down
    mirror: false // Whether elements should animate out while scrolling past them
  });
});

</script>

<style scoped>
/* Optional: Smooth image scaling */
img {
  transition: transform 0.3s ease-in-out;
}
img:hover {
  transform: scale(1.05);
}
.banner-heading::after {
    content: "";
    background: url(/images/hero-bg.png);
    position: absolute;
    width: 100%;
    max-width: 704px;
    left: 0;
    right: 0;
    height: 280px;
    height: 100%;
    min-height: 100px;
    margin: 0 auto;
    top: 0;
    z-index: -3;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
.layout-grid-banner::after{
  content: "";
  position: absolute;
  width: 100%;
  height: 93px;
  bottom: -9px;
  top: auto;
  background: url(/images/landing-hero-transparent.png);
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 0;
}
@media screen and (max-width: 1350px) {
  .layout-grid-banner::after {
    bottom: -57px;
  }
}
@media screen and (max-width: 767px) {
  .layout-grid-banner {
    margin-top: 180px;
  }
}
@media screen and (max-width: 575px) {
  .layout-grid-banner::after {
    bottom: -80px;
  }
  .layout-grid-banner {
    margin-top: 130px;
  }
  .banner-heading br {
    display: none;
  }
}
</style>
