export const useCategoryStore = defineStore("category", {
  state: () => ({
    articlesByCategory: {}, // Articles by category { [categoryId]: { articles, lastFetched, hasMore } }
  }),

  actions: {
    async fetchArticles(
      categoryId,
      page = 1,
      limit = 10,
      forceRefresh = false
    ) {
      const currentTime = Date.now();
      const cachedCategory = this.articlesByCategory[categoryId];

      // Check if we need to refresh the data
      if (
        !forceRefresh &&
        cachedCategory &&
        currentTime - cachedCategory.lastFetched < 2 * 60 * 1000 // 2 minutes TTL
      ) {
        return;
      }

      try {
        const response = await $fetch("/api/articles", {
          params: { categoryId, page, limit },
        });

        const newArticles =
          page === 1
            ? response.articles
            : [...cachedCategory.articles, ...response.articles];

        this.articlesByCategory[categoryId] = {
          articles: newArticles,
          lastFetched: currentTime,
          hasMore: response.articles.length === limit,
        };
      } catch (error) {
        console.error("Failed to fetch articles for category:", error);
      }
    },
  },

  getters: {
    getArticlesByCategory: (state) => (categoryId) =>
      state.articlesByCategory[categoryId]?.articles || [],
    hasMoreArticles: (state) => (categoryId) =>
      state.articlesByCategory[categoryId]?.hasMore || false,
  },
});
