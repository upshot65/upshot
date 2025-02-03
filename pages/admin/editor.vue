<template>
  <section>
    <!-- <h1 class="justify-center">Welcome to Editor</h1> -->

    <ClientOnly>
      <Quill v-model:content="body" />
    </ClientOnly>
    <main v-html="body"></main>
  </section>

  <div class="flex items-center justify-center min-h-screen">
    <button
      @click="addArticle"
      class="w-50 py-3 mt-6 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
    >
      Add Article
    </button>
  </div>
</template>

<script setup>
const body = ref("");

const addArticle = async () => {
  if (!body.value.trim()) {
    alert("Article content cannot be empty.");
    return;
  }

  try {
    const response = await useFetch("/api/create-article", {
      method: "POST",
      body: JSON.stringify({
        title: "New Article", // You can replace this with a title input field
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
      body.value = ""; // Clear editor after submission
    }
  } catch (error) {
    console.error("Request failed:", error);
    alert("An error occurred. Please try again.");
  }
};
</script>

<style></style>
