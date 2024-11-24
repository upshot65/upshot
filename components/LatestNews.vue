<template>
  <section class="latest-news-section">
    <div class="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold text-blue-900 mb-6">Latest News</h2>

      <!-- Articles Grid -->
      <div class="web-latest-news-section-cards">
        <div
          v-for="(article, index) in articles"
          :key="index"
          :class="{
            'web-latest-news-section-cards-firstCard': index === 0,
          }"
          class="web-latest-news-section-cards-card"
        >
          <NuxtLink>
            <div class="web-latest-news-section-cards-card-image">
              <NuxtImg
                :src="article.image"
                :alt="article.title"
                sizes="100vw sm:50vw md:400px"
                class="w-full h-full object-cover rounded-xl"
                densities="x1 x2"
                quality="100"
              />

              <!-- Category Badge -->
              <div class="web-latest-news-section-cards-card-content">
                <span
                  class="absolute top-5 right-4 text-xs px-3 py-1 rounded-full"
                  style="background-color: #b9db32"
                >
                  {{ article.category }}
                </span>
                <div class="p-4 absolute bottom-3 left-3">
                  <h3 class="text-lg font-bold text-white mb-2">
                    {{ article.title }}
                  </h3>
                  <p class="text-white text-sm">
                    {{ article.description }}
                  </p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="mobile-latest-news-section-cards">
        <div
          v-for="(article, index) in articles"
          :key="index"
          :class="{
            'mobile-latest-news-section-cards-firstCard': index === 0,
          }"
          class="relative rounded-full"
        >
          <NuxtLink>
            <div>
              <NuxtImg
                :src="article.image"
                :alt="article.title"
                sizes="100vw sm:50vw md:400px"
                class="w-full h-full object-cover rounded-xl"
                densities="x1 x2"
                quality="100"
              />

              <!-- Category Badge -->
              <div>
                <span
                  class="absolute top-10 right-10 text-xs px-3 py-1 rounded-full"
                  style="background-color: #b9db32"
                >
                  {{ article.category }}
                </span>
                <div class="text-black mt-5">
                  <h3 class="text-lg font-bold mb-2">
                    {{ article.title }}
                  </h3>
                  <p class="text-sm">
                    {{ article.description }}
                  </p>
                </div>
              </div>
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
import { ref } from "vue";

const articles = ref([
  {
    id: 1,
    title: "US election results",
    description:
      "Lorem ipsum dolor sit amet consectetur. Dapibus scelerisque phasellus habitant sed",
    image: "/latestnews/uselection.png",
    category: "Politics",
  },
  {
    id: 2,
    title: "Terrorists killed in Kashmir",
    description:
      "Lorem ipsum dolor sit amet consectetur. Dapibus scelerisque phasellus habitant sed",
    image: "/latestnews/kashmir.png",
    category: "Defense",
  },
  {
    id: 3,
    title: "Singer Shardha Sinha died",
    description:
      "Lorem ipsum dolor sit amet consectetur. Dapibus scelerisque phasellus habitant sed",
    image: "/latestnews/shradha.png",
    category: "Entertainment",
  },
  {
    id: 4,
    title: "Virat Kohli’s birthday",
    description:
      "Lorem ipsum dolor sit amet consectetur. Dapibus scelerisque phasellus habitant sed",
    image: "/latestnews/virat.png",
    category: "Sports",
  },
  {
    id: 5,
    title: "Skoda Kylq launched",
    description:
      "Lorem ipsum dolor sit amet consectetur. Dapibus scelerisque phasellus habitant sed",
    image: "/latestnews/scoda.png",
    category: "Automobile",
  },
]);
</script>

<style scoped>
.web-latest-news-section-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
}

.web-latest-news-section-cards-firstCard {
  @media (min-width: 1024px) {
    grid-row: span 2;
  }
}
.web-latest-news-section-cards-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
  transition: transform 0.5s ease-in-out;
}

.web-latest-news-section-cards-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;
}
.web-latest-news-section-cards-card:hover
  .web-latest-news-section-cards-card-image {
  transform: scale(1);
}
.web-latest-news-section-cards-card-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.web-latest-news-section-cards-card:hover
  .web-latest-news-section-cards-card-content {
  opacity: 1;
}
.mobile-latest-news-section-cards {
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media screen and (min-width: 768px) {
    display: none;
  }
}
.mobile-latest-news-section-cards-firstCard img {
  height: 100%;
  max-height: 250px;
  object-fit: cover;
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
