import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;

  console.log("--------data---------", page, limit, offset);
  const supabase = await serverSupabaseClient(event);
  const { data, error, count } = await supabase
    .from("article")
    .select("id, title, active, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  console.log("--data--", data);
  if (error) {
    return { error: error.message };
  }

  return {
    articles: data,
    hasMore: offset + limit < count, // Check if there are more pages
  };
});
