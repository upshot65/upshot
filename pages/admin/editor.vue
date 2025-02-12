<template>
  <div class="flex h-full gap-6 p-6 max-w-7xl mx-auto">
    <!-- Editor Section -->
    <section class="w-2/3 p-4 pt-0 h-full rounded-lg bg-white shadow-sm">
      <input
        v-model="title"
        type="text"
        placeholder="Enter article title"
        class="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        v-model="description"
        placeholder="Enter article description..."
        class="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      
      <!-- Header Image Upload -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Upload Header Image</label>
        <input 
          type="file" 
          @change="uploadImage" 
          :disabled="imageLoading"
          class="w-full p-2 border border-gray-300 rounded-md cursor-pointer disabled:opacity-50"
        />
        <p v-if="imageLoading" class="text-sm text-blue-500 mt-2">Uploading image...</p>
        <p v-if="headerImageUrl" class="text-sm text-green-500 mt-2">✅ Image uploaded successfully!</p>
      </div>
      
      <ClientOnly>
        <Quill v-model:content="body" />
      </ClientOnly>

      <div class="flex items-center gap-2 mt-4">
        <input type="checkbox" v-model="isFeatured" id="featured" class="w-4 h-4" />
        <label for="featured" class="text-sm font-medium">Mark as Featured</label>
         <!-- Show selected category -->
         
         <span v-if="currCategory" class="ml-4 px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">
          Category --> {{ currCategory.name }}
        </span>
      </div>

      <div class="flex gap-3 mt-6">
        <button
          @click="addArticle"
          :disabled="loading"
          class="px-5 py-2 rounded-full font-semibold transition-colors"
          :class="loading ? 'bg-gray-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-800'"
        >
          {{ loading ? "Submitting..." : "Publish" }}
        </button>
        <button class="px-5 py-2 rounded-full bg-gray-200 text-black font-semibold">Save Draft</button>
      </div>
    </section>
    
    <!-- Sidebar Section -->
    <aside class="w-1/3 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
      <h2 class="text-lg font-semibold mb-3">Select Category</h2>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="category in categories" 
          :key="category.id" 
          class="px-3 py-1 bg-[#B9DB32] text-black rounded-full cursor-pointer hover:bg-green-400"
          :class="{ 'bg-green-600 text-white': currCategory === category.name }"
          @click="setCategory(category)" 
        >
          {{ category.name }}
        </span>
        
        <button 
          @click="showInput = true" 
          v-if="!showInput"
          class="px-3 py-1 border border-gray-400 rounded-full"
        >
          Add new +
        </button>

        <input 
          v-if="showInput"
          v-model="newCategory"
          @keyup.enter="addCategory"
          @blur="addCategory"
          type="text" 
          placeholder="Enter category"
          class="px-3 py-1 border border-gray-400 rounded-full focus:outline-none"
        />
      </div>
      <h2 class="text-lg font-semibold mt-6">Add tags</h2>
      <input
        type="text"
        placeholder="Add up to 3 tags..."
        class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

definePageMeta({
  layout: "admin",
});
  
const supabase = useSupabaseClient();

const title = ref("");
const description = ref("");
const body = ref("");
const loading = ref(false);
const isFeatured = ref(false);
const headerImageUrl = ref("");
const imageLoading = ref(false);
const categories = ref([]); // Fetch categories from API
const newCategory = ref("");
const showInput = ref(false);
const currCategory = ref(null); // Store selected category object

// Fetch Categories on Page Load
const fetchCategories = async () => {
  try {
    const { data, error } = await supabase.from("category").select("*");
    if (error) throw error;
    categories.value = data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
};

// Upload Image to Supabase Storage
const uploadImage = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  imageLoading.value = true;

  const { data, error } = await supabase.storage.from("articlesImage").upload(`headers/${file.name}`, file, {
    cacheControl: "3600",
    upsert: true,
  });

  if (error) {
    console.error("Upload error:", error);
    alert("Failed to upload image");
    imageLoading.value = false;
    return;
  }

  // Get Public URL
  const { data: publicUrlData } = supabase.storage.from("articlesImage").getPublicUrl(data.path);
  headerImageUrl.value = publicUrlData.publicUrl;

  alert("✅ Image uploaded successfully!");
  imageLoading.value = false;
};

// Add a New Category
const addCategory = async () => {
  const trimmedCategory = newCategory.value.trim();
  if (!trimmedCategory) return;

  try {
    const { data, error } = await supabase
      .from("categories")
      .insert([{ name: trimmedCategory }])
      .select("*")
      .single();

    if (error) throw error;
    
    categories.value.push(data);
    newCategory.value = "";
    showInput.value = false;
  } catch (error) {
    console.error("Error adding category:", error.message);
    alert("Failed to add category.");
  }
};

// Set Selected Category
const setCategory = (category) => {
  currCategory.value = category;
  console.log("Selected Category:", category);
};

// Submit Article
const addArticle = async () => {
  if (!title.value.trim() || !body.value.trim() || !currCategory.value) {
    alert("Title, content, and category are required!");
    return;
  }

  loading.value = true;
  try {
    const { data, error } = await supabase.from("article").insert([
      {
        title: title.value,
        description: description.value,
        content: body.value,
        is_featured: isFeatured.value,
        header_image: headerImageUrl.value,
        category_id: currCategory.value.id,
        active:true
      },
    ]);

    if (error) throw error;

    alert("✅ Article added successfully!");
    title.value = "";
    description.value = "";
    body.value = "";
    isFeatured.value = false;
    headerImageUrl.value = "";
    currCategory.value = null;
  } catch (error) {
    console.error("Error submitting article:", error.message);
    alert("Failed to submit article.");
  } finally {
    loading.value = false;
  }
};

// Fetch categories when the component is mounted
onMounted(fetchCategories);
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}
</style>
