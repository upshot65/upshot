import { createClient } from "@supabase/supabase-js";

export async function fetchArticles() {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supabaseUrl;
  const supabaseKey = config.public.supabaseAnonKey;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from("article")
    .select("id, title, updated_at");

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }

  return data;
}
