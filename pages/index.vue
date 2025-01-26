<script setup>
// import { useArticleStore } from "@/stores/articles";
// import { storeToRefs } from "pinia";

const articleStore = useArticleStore();

// Fetch the combined data on the server side
// await articleStore.fetchCombinedData(true);
await useAsyncData("articless", () => articleStore.fetchCombinedData(true));
// Map state from the store
const { latestArticles, featuredArticles, categoriesWithLatest } =
  storeToRefs(articleStore);

console.log(latestArticles.value);
console.log(featuredArticles.value);
console.log(categoriesWithLatest.value);
// Set SEO meta tags using `useHead`
useHead({
  title: "Home - News Website",
  meta: [
    {
      name: "description",
      content:
        "Stay updated with the latest articles, featured news, and explore categories on our news website.",
    },
    { name: "keywords", content: "news, latest articles, featured news" },
  ],
});
</script>

<template>
  <div>
    <HeroSection />
    <FeaturedArticles />
    <LatestNews />
    <PopularCategories />
    <Subscribe />
  </div>
</template>

<style lang="scss" scoped></style>
