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
          :key="category" 
          class="px-3 py-1 bg-[#B9DB32] text-black rounded-full cursor-pointer hover:bg-green-400"
        >
          {{ category }}
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
import { ref } from "vue";
import { useFetch } from "#app";


const supabase = useSupabaseClient();

const title = ref("");
const description = ref("");
const body = ref("");
const loading = ref(false);
const isFeatured = ref(false);
const headerImageUrl = ref("");
const imageLoading = ref(false);
const categories = ref(["Technology", "Fashion", "Business", "Finance", "Sports", "Health", "Politics"]);
const newCategory = ref("");
const showInput = ref(false);

const uploadImage = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  imageLoading.value = true; // Start loading state

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

  // Get the public URL
  const { data: publicUrlData } = supabase.storage.from("articlesImage").getPublicUrl(data.path);
  headerImageUrl.value = publicUrlData.publicUrl;

  alert("✅ Image uploaded successfully!");
  imageLoading.value = false; // Stop loading state
};

const addCategory = () => {
  if (newCategory.value.trim()) {
    categories.value.push(newCategory.value.trim());
  }
  newCategory.value = "";
  showInput.value = false;
};

const addArticle = async () => {
  if (!title.value.trim() || !body.value.trim()) {
    alert("Title and content cannot be empty.");
    return;
  }
  loading.value = true;
  try {
    const response = await useFetch("/api/create-article", {
      method: "POST",
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        content: body.value,
        isFeatured: isFeatured.value,
        header_image: headerImageUrl.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.error.value) {
      console.error("Error:", response.error.value);
      alert("Failed to add article");
    } else {
      alert("✅ Article added successfully!");
      title.value = "";
      description.value = "";
      body.value = "";
      isFeatured.value = false;
      headerImageUrl.value = "";
    }
  } catch (error) {
    console.error("Request failed:", error);
    alert("An error occurred. Please try again.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}
</style>
