<template>
  <section class="max-w-3xl mx-auto p-4">
    <input
      v-model="title"
      type="text"
      placeholder="Enter article title"
      class="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <ClientOnly>
      <Quill v-model:content="body" />
    </ClientOnly>

    <main v-html="body"></main>
  </section>

  <div class="flex items-center justify-center min-h-screen">
    <button
      @click="addArticle"
      :disabled="loading"
      class="w-50 py-3 mt-6 rounded-full font-semibold transition-colors"
      :class="
        loading
          ? 'bg-gray-500 text-white'
          : 'bg-black text-white hover:bg-gray-800'
      "
    >
      {{ loading ? "Submitting..." : "Add Article" }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "#app";

const title = ref("");
const body = ref("");
const loading = ref(false);

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
        content: body.value,
        description: "Automatically added from editor",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.error.value) {
      console.error("Error:", response.error.value);
      alert("Failed to add article");
    } else {
      alert("Article added successfully!");
      title.value = "";
      body.value = "";
    }
  } catch (error) {
    console.error("Request failed:", error);
    alert("An error occurred. Please try again.");
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
