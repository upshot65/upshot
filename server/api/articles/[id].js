// server/api/articles/[id].js
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  // Extract the article ID from the URL parameters
  console.log("Event Params:", event.context.params);
  const id = getRouterParam(event, "id");

  console.log("idd---", id);
  const supabase = await serverSupabaseClient(event);
  // Fetch the article from the 'articles' table
  const { data: article, error } = await supabase
    .from("article")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !article) {
    // If there's an error or the article is not found, return a 404 response
    return { error: "Article not found" };
  }

  console.log("article---", article);
  // Return the article data
  return { article };
});
