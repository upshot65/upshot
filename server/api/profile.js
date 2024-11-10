// server/api/profile.js

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  //   const { userId, instagram_url, interests } = body;
  const {
    linkedin,
    bio,
    instagram,
    selectedInterests,
    newsletterSignup,
    newsletterPreference,
    userId,
  } = body;

  console.log("----body-----", body);
  if (!userId) {
    return { statusCode: 400, body: { message: "User ID is required" } };
  }

  // Insert profile data
  const { error: profileError } = await supabase.from("user_profile").upsert({
    user_id: userId,
    instagram_url: instagram,
    newletter_preference: newsletterPreference,
    is_newsetter_signup: newsletterSignup,
    bio,
    linkedin_url: linkedin,
  });

  if (profileError) {
    return { statusCode: 500, body: { message: profileError.message } };
  }

  // Insert interests data (assuming `interests` is an array of interest IDs)
  if (Array.isArray(selectedInterests)) {
    const interestsData = selectedInterests.map((interest) => ({
      user_id: userId,
      interest_id: interest.id,
    }));

    const { error: interestsError } = await supabase
      .from("user_interests")
      .insert(interestsData);

    if (interestsError) {
      return { statusCode: 500, body: { message: interestsError.message } };
    }
  }

  return {
    statusCode: 200,
    body: { message: "Profile and interests updated successfully!" },
  };
});
