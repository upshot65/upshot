<script setup>
import TinyMCEEditor from "~/components/TinyMCEEditor.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

 // definePageMeta({
 // middleware: "auth", // Matches `middleware/auth.ts`
//});

  
const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();

const articleId = route.params.id; // Get article ID from route params

const title = ref("");
const description = ref("");
const body = ref("");
const loading = ref(false);
const isFeatured = ref(false);
const headerImageUrl = ref("");
const imageLoading = ref(false);
const categories = ref([]);
const currCategory = ref(null);

// Fetch Categories
const fetchCategories = async () => {
  try {
    const { data, error } = await supabase.from("category").select("*");
    if (error) throw error;
    categories.value = data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
};

// Fetch Article Details
const fetchArticleDetails = async () => {
  console.log("---articleId--", articleId);
  try {
    const { data, error } = await supabase
      .from("article")
      .select("*")
      .eq("id", articleId)
      .single();

    if (error) throw error;

    title.value = data.title;
    description.value = data.description;
    body.value = data.content;
    isFeatured.value = data.is_featured;
    headerImageUrl.value = data.header_image;
    currCategory.value = categories.value.find(
      (cat) => cat.id === data.category_id
    );
  } catch (error) {
    console.error("Error fetching article:", error.message);
  }
};

// Upload Image to Supabase
const uploadImage = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  imageLoading.value = true;
  const { data, error } = await supabase.storage
    .from("articlesImage")
    .upload(`headers/${file.name}`, file, { upsert: true });

  if (error) {
    console.error("Upload error:", error);
    alert("Failed to upload image");
    imageLoading.value = false;
    return;
  }

  const { data: publicUrlData } = supabase.storage
    .from("articlesImage")
    .getPublicUrl(data.path);
  headerImageUrl.value = publicUrlData.publicUrl;

  alert("✅ Image uploaded successfully!");
  imageLoading.value = false;
};

// Update Article
const updateArticle = async () => {
  if (!title.value.trim() || !body.value.trim() || !currCategory.value) {
    alert("Title, content, and category are required!");
    return;
  }

  console.log("---articleId--", articleId);

  loading.value = true;
  try {
    const { error } = await supabase
      .from("article")
      .update({
        title: title.value,
        description: description.value,
        content: body.value,
        is_featured: isFeatured.value,
        header_image: headerImageUrl.value,
        category_id: currCategory.value.id,
      })
      .eq("id", articleId);

    if (error) throw error;

    alert("✅ Article updated successfully!");
    router.push("/admin/articles"); // Redirect back to articles list
  } catch (error) {
    console.error("Error updating article:", error.message);
    alert("Failed to update article.");
  } finally {
    loading.value = false;
  }
};

// Set Selected Category
const setCategory = (category) => {
  currCategory.value = category;
};

// Fetch categories and article details on mount
onMounted(async () => {
  await fetchCategories();
  await fetchArticleDetails();
});
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-xl font-bold mb-4">Edit Article</h1>
    <div class="flex h-full gap-6 p-6 max-w-7xl mx-auto">
      <!-- Editor Section -->
      <section class="w-2/3 p-4 pt-0 h-full rounded-lg bg-white shadow-sm">
        <input
          v-model="title"
          type="text"
          placeholder="Enter article title"
          class="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <textarea
          v-model="description"
          placeholder="Enter article description..."
          class="w-full p-3 border border-gray-300 rounded-md mb-4"
        ></textarea>

        <!-- Header Image Upload -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2"
            >Upload Header Image</label
          >
          <input
            type="file"
            @change="uploadImage"
            :disabled="imageLoading"
            class="w-full p-2 border border-gray-300 rounded-md cursor-pointer"
          />
          <p v-if="imageLoading" class="text-sm text-blue-500 mt-2">
            Uploading image...
          </p>
          <p v-if="headerImageUrl" class="text-sm text-green-500 mt-2">
            ✅ Image uploaded successfully!
          </p>
        </div>

        <ClientOnly>
          <TinyMCEEditor v-model="body" />
        </ClientOnly>
        <div class="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            v-model="isFeatured"
            id="featured"
            class="w-4 h-4"
          />
          <label for="featured" class="text-sm font-medium"
            >Mark as Featured</label
          >

          <!-- Show selected category -->
          <span
            v-if="currCategory"
            class="ml-4 px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm"
          >
            Category --> {{ currCategory.name }}
          </span>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            @click="updateArticle"
            :disabled="loading"
            class="px-5 py-2 rounded-full font-semibold transition-colors"
            :class="
              loading
                ? 'bg-gray-500 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-800'
            "
          >
            {{ loading ? "Updating..." : "Update" }}
          </button>
          <button
            @click="$router.push('/admin/articles')"
            class="px-5 py-2 rounded-full bg-gray-200 text-black font-semibold"
          >
            Cancel
          </button>
        </div>
      </section>

      <!-- Sidebar Section -->
      <aside
        class="w-1/3 p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
      >
        <h2 class="text-lg font-semibold mb-3">Select Category</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="category in categories"
            :key="category.id"
            class="px-3 py-1 bg-[#B9DB32] text-black rounded-full cursor-pointer hover:bg-green-400"
            :class="{
              'bg-green-600 text-white': currCategory?.id === category.id,
            }"
            @click="setCategory(category)"
          >
            {{ category.name }}
          </span>
        </div>
      </aside>
    </div>
  </div>
</template>
