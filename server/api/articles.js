// server/api/articles.js

export default defineEventHandler(async (event) => {
  // Get the query parameters
  const { categoryId, page = 1, limit = 10 } = getQuery(event);

  // Convert page and limit to numbers
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  // Calculate the offset for pagination
  const offset = (pageNum - 1) * limitNum;

  const supabase = await serverSupabaseClient(event);
  // Fetch articles from Supabase
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .eq("category_id", categoryId)
    .range(offset, offset + limitNum - 1);

  if (error) {
    setResponseStatus(event, 500);
    return { error: error.message };
  }

  // Check if there are more articles available
  const { count: totalArticles } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("category_id", categoryId);

  const hasMore = offset + articles.length < totalArticles;
  setResponseStatus(event, 200);
  // Return the articles and the "hasMore" flag
  return { articles, hasMore };
});
