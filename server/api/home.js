import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event);

  const { data, error } = await client.rpc(
    "fetch_combined_data_with_category_articles"
  );

  if (error) {
    console.error("Error fetching combined data:", error);
    return { error: "Failed to fetch combined data." };
  }

  return {
    latestArticles: data[0]?.latest_articles || [],
    featuredArticles: data[0]?.featured_articles || [],
    categoriesWithLatest: data[0]?.categories_with_latest || [],
  };
});
