// plugins/fetchInterests.client.js

export default defineNuxtPlugin(async (nuxtApp) => {
  const supabase = useSupabaseClient();
  const interests = useState("interests", () => []);

  // Only fetch if `interests` hasn't been populated yet
  if (!interests.value || interests.value.length === 0) {
    try {
      const { data, error } = await supabase.from("category").select("*");

      if (error) {
        console.error("Error fetching interests:", error.message);
        return;
      }

      // Check if data is returned and assign it to `interests`
      if (data) {
        interests.value = data;
        console.log("Interests fetched and set:", interests.value);
      } else {
        console.warn("No interests data found");
      }
    } catch (error) {
      console.error("Error fetching interests:", error.message);
    }
  }
});
