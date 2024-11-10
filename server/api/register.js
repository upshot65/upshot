import bcrypt from "bcryptjs";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  // Extract the request body
  const body = await readBody(event);

  // Server-side validation (if required, but main validation is done on client side)
  if (!body.name || !body.email || !body.password) {
    return { statusCode: 400, body: { message: "Invalid input" } };
  }

  console.log("--body--", body);
  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const supabase = await serverSupabaseClient(event);
  // Insert user into Supabase 'users' table
  const { data, error } = await supabase
    .from("user")
    .insert([
      {
        name: body.name,
        email: body.email,
        password: hashedPassword, // Store the hashed password
      },
    ])
    .select();

  console.log("--data--", data);
  console.log("--error--", error);
  if (error) {
    return {
      statusCode: 500,
      body: { message: error.message, code: error.code },
    };
  }

  const userId = data[0].id;
  return {
    statusCode: 200,
    body: { message: "Account created successfully!", userId },
  };
});
