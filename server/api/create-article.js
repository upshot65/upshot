import { serverSupabaseClient } from "#supabase/server";

// Initialize Supabase Client
export default defineEventHandler(async (event) => {
  // Read request body
  const body = await readBody(event);

  console.log(body);
  // Validate input
  if (!body.title || !body.content) {
    return {
      status: 400,
      message: "Title and content a re required.",
    };
  }
  const supabase = await serverSupabaseClient(event);
  // Insert into the 'article' table
  const { data, error } = await supabase.from("article").insert([
    {
      title: body.title,
      content: body.content,
      description: body.description || "",
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    return {
      status: 500,
      message: "Error inserting article",
      error,
    };
  }

  return {
    status: 200,
    message: "Article added successfully",
    data,
  };
});
