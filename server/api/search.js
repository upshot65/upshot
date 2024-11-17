// server/api/search.js
import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const { query, categoryId, page = 1, limit = 10 } = getQuery(event);

  console.log("--request coming in the search api---", query);
  // Convert page and limit to numbers
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const offset = (pageNum - 1) * limitNum;

  const supabase = await serverSupabaseClient(event);

  // Build the search query with full-text search
  let searchQuery = supabase
    .from("articles")
    .select("id, title, header, content, category_id", { count: "exact" });

  // Full-text search on search_vector using query string
  if (query) {
    searchQuery = searchQuery.textSearch("search_vector", query, {
      config: "english", // English language configuration
      type: "websearch", // Web search syntax for a more intuitive search
    });
  }

  // Filter by category if categoryId is provided
  if (categoryId) {
    searchQuery = searchQuery.eq("category_id", categoryId);
  }

  // Apply pagination
  searchQuery = searchQuery.range(offset, offset + limitNum - 1);

  // Execute the query
  const { data: articles, error, count: totalResults } = await searchQuery;

  if (error) {
    setResponseStatus(event, 500);
    return { error: error.message };
  }

  // Determine if more articles are available for pagination
  const hasMore = offset + articles.length < totalResults;

  return { articles, hasMore, totalResults };
});

// need to add this index in the supabase
// CREATE INDEX articles_full_text_search_idx ON articles USING GIN (to_tsvector('english', title || ' ' || header || ' ' || content));

// -- Add a new column for full-text search vector
// ALTER TABLE articles ADD COLUMN search_vector tsvector;

// -- Populate the search_vector column with weighted data
// UPDATE articles SET search_vector =
//   setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
//   setweight(to_tsvector('english', coalesce(header, '')), 'B') ||
//   setweight(to_tsvector('english', coalesce(content, '')), 'C');

// -- Create a GIN index on the search_vector column for fast search
// CREATE INDEX articles_search_idx ON articles USING GIN (search_vector);
