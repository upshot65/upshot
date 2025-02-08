import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchArticles() {
  const { data, error } = await supabase
    .from("article")
    .select("id, title, updated_at");

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }

  return data;
}
