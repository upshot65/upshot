// middleware/loadStoreData.global.ts
import { useArticleStore } from "~/stores/articles"; // Import your Pinia store
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const articleStore = useArticleStore();
  const { categoriesWithLatest } = storeToRefs(articleStore);

  // Only fetch if store is empty
  if (!categoriesWithLatest.value.length) {
    await articleStore.fetchCombinedData();
  }
});
