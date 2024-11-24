// import { useNuxtApp } from "#app";

export const useArticleStore = defineStore("articleStore", {
  state: () => ({
    latestArticles: [],
    featuredArticles: [],
    categoriesWithLatest: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchCombinedData(server = false) {
      // const { $supabase } = useNuxtApp();

      this.isLoading = true;
      this.error = null;
      const supabase = useSupabaseClient();
      try {
        const { data, error } = await supabase.rpc(
          "fetch_combined_data_with_category_articles"
        );

        if (error) {
          console.error("Error fetching combined data:", error);
          this.error = "Failed to fetch data.";
          return;
        }

        // Update state with data from the RPC call
        this.latestArticles = data[0]?.latest_articles || [];
        this.featuredArticles = data[0]?.featured_articles || [];
        this.categoriesWithLatest = data[0]?.categories_with_latest || [];
      } catch (err) {
        console.error("Error:", err);
        this.error = "An unexpected error occurred.";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
