// server/api/articles.js
import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  // Get the query parameters
  const { categoryId, page = 1, limit = 5, articleId } = getQuery(event);
  console.log("---categorId in related", categoryId);
  // Convert page and limit to numbers
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  if (!categoryId) {
    console.error("[API] ID is undefined");
    return { error: "Invalid categoryId ID" };
  }
  // Calculate the offset for pagination
  const offset = (pageNum - 1) * limitNum;

  const supabase = await serverSupabaseClient(event);
  const { data: articles, error } = await supabase
    .from("article")
    .select("*")
    .eq("category_id", categoryId)
    .neq("id", articleId)
    .range(offset, offset + limitNum - 1);

  if (error) {
    setResponseStatus(event, 500);
    return { error: error.message };
  }

  console.log("--related articles--", articles);
  return { articles };
});
