<template>
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Admin: Manage Articles</h1>

    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-3 border">ID</th>
          <th class="p-3 border">Title</th>
          <th class="p-3 border">Status</th>
          <th class="p-3 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id" class="text-center">
          <td class="p-3 border">{{ article.id }}</td>
          <td class="p-3 border">{{ article.title }}</td>
          <td class="p-3 border">
            <span :class="article.active ? 'text-green-600' : 'text-red-600'">
              {{ article.active ? "Published" : "Unpublished" }}
            </span>
          </td>
          <td class="p-3 border flex justify-center gap-3">
            <button
              @click="togglePublish(article)"
              class="px-4 py-2 rounded text-white"
              :class="
                article.active
                  ? 'bg-red-500 hover:bg-red-700'
                  : 'bg-green-500 hover:bg-green-700'
              "
            >
              {{ article.active ? "Unpublish" : "Publish" }}
            </button>
            <NuxtLink
              :to="`/admin/edit-article/${article.id}`"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
            >
              Edit
            </NuxtLink>

            <NuxtLink
              :to="`/articles/${article.id}-${generateSlug(article.title)}`"
              class="px-4 py-2 bg-pink-500 hover:bg-gray-700 text-white rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Article
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-between mt-4">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
      >
        Previous
      </button>
      <span>Page {{ page }}</span>
      <button
        @click="nextPage"
        :disabled="!hasMore"
        class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useFetch } from "#app";
const supabase = useSupabaseClient();
const { generateSlug } = useSlug();

const articles = ref();
const page = ref(1);
const pageSize = ref(10);
const hasMore = ref(true);
const loading = ref(false);
const fetchArticles = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      `/api/all-article?page=${page.value}&limit=${pageSize.value}`
    );
    const data = await response.json();

    if (response.ok) {
      articles.value = data.articles || [];
      hasMore.value = data.hasMore ?? false;
    } else {
      console.error("Error fetching articles:", data.message);
      articles.value = [];
      hasMore.value = false;
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    articles.value = [];
    hasMore.value = false;
  } finally {
    loading.value = false;
  }
};

const prevPage = async () => {
  if (page.value > 1) {
    page.value = page.value - 1;
    await fetchArticles();
  }
};

const nextPage = async () => {
  if (hasMore.value) {
    page.value = page.value + 1;
    await fetchArticles();
  }
};

const togglePublish = async (article) => {
  console.log("--article--", article);

  const updatedStatus = !article.active;
  console.log("--updatedStatus--", updatedStatus);
  const { error } = await supabase
    .from("article")
    .update({
      active: updatedStatus,
    })
    .eq("id", article.id);
  //   const { error } = await useFetch(`/api/articles/${article.id}/publish`, {
  //     method: "PATCH",
  //     body: JSON.stringify({ active: updatedStatus }),
  //     headers: { "Content-Type": "application/json" },
  //   });

  if (error) {
    alert("Failed to update article status");
  } else {
    article.active = updatedStatus; // Update locally
    alert("article updated successfully");
  }
};

onMounted(fetchArticles);
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 12px;
  border: 1px solid #ddd;
}
</style>
