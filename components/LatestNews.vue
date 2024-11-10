<template>
  <div class="w-full max-w-7xl mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold text-blue-900 mb-6">Latest News</h2>

    <!-- Articles Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(article, index) in articles"
        :key="index"
        :class="index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''"
        class="bg-white overflow-hidden"
      >
        <NuxtLink>
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
              {{ article.category }}
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
</style>
