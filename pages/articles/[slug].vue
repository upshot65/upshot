<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Article Header -->

    <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ article.title }}</h1>
    <p class="text-gray-500 mb-4">{{ article.subtitle }}</p>

    <!-- Article Image -->
    <NuxtImg
      :src="article.header_image"
      alt="Article Image"
      class="w-full h-96 object-cover mb-8 rounded-xl"
    />

    <!-- Article Author, Date, and Stats -->
    <div class="flex items-center border-b justify-between mb-8">
      <!-- Author Info -->
      <div class="flex items-center">
        <NuxtImg
          :src="article.authorImage"
          alt="Author Image"
          class="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p class="text-gray-800">{{ article.author }}</p>
          <p class="text-gray-500 text-sm">
            {{ formatDate(article.created_at) }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center border-b justify-between pb-5 mb-8">
      <!-- Article Stats -->
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-1 cursor-pointer">
          <span class="text-gray-700 font-medium">{{ likeCount }}</span>
          <img src="/images/hands-clapping.png" alt="" @click="toggleLike" />
        </div>
        <div class="flex items-center gap-1 cursor-pointer">
          <span class="text-gray-700 font-medium">{{ article.comments }}</span>
          <img src="/images/comment.png" alt="" />
        </div>
        <button
          @click="saveArticle"
          class="text-gray-700 hover:text-blue-600 font-medium"
        >
          <img src="/images/save.png" alt="" />
        </button>
      </div>
      <!-- Social Media Sharing -->
      <div class="flex items-center gap-4">
        <span class="text-gray-700 font-medium">Share:</span>
        <a
          :href="`https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`"
          target="_blank"
          class="text-gray-500 hover:text-blue-500"
        >
          <img src="/images/linkedin.png" alt="" />
        </a>
        <a
          :href="`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`"
          target="_blank"
          class="text-gray-500 hover:text-blue-600"
        >
          <img src="/images/instagram.png" alt="" />
        </a>
        <a
          :href="`https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`"
          target="_blank"
          class="text-gray-500 hover:text-blue-700"
        >
          <img src="/images/twitter.png" alt="" />
        </a>
        <a
          :href="`https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`"
          target="_blank"
          class="text-gray-500 hover:text-blue-700"
        >
          <img src="/images/medium.png" alt="" />
        </a>
      </div>
    </div>

    <!-- Article Content -->
    <div class="text-gray-700 leading-relaxed" v-html="article.content"></div>

    <!-- Article Tags -->
    <div class="mt-6">
      <h3 class="text-xl font-semibold">Tags:</h3>
      <div class="flex gap-4 mt-2">
        <span
          v-for="tag in article.tags"
          :key="tag"
          class="px-3 py-1 bg-gray-200 rounded-lg text-sm text-gray-700"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Article Stats -->
    <div class="flex items-center gap-6 py-4">
      <div class="flex items-center gap-1">
        <span class="text-gray-700 font-medium">{{ likeCount }}</span>
        <button @click="toggleLike">
          <img src="/images/hands-clapping.png" alt="" />
        </button>
      </div>

      <div class="flex items-center gap-1 cursor-pointer">
        <span class="text-gray-700 font-medium">{{ article.comments }}</span>
        <img src="/images/comment.png" alt="" />
      </div>
      <button
        @click="saveArticle"
        class="text-gray-700 hover:text-blue-600 font-medium"
      >
        <img src="/images/save.png" alt="" />
      </button>
    </div>

    <!-- Related Posts Section -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold text-blue-900 mb-6">Related Posts:</h2>

      <!-- <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"> -->
      <RelatedArticle :articleId="articleId" :categoryId="categoryId" />
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
// Extract route params
const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const articleId = ref(slug.split("-")[0]); // Extract article ID from slug
const categoryId = ref(1); // Extract article ID from slug
// Define reactive variables
const article = ref({});
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const isLiked = ref(false);
const likeCount = ref(0);
// Fetch article data and related posts
// const { data: response, error } = await useAsyncData(
//   `article-${articleId.value}`,
//   () =>
//     $fetch(`/api/articles/${articleId.value}`, {
//       params: { includeRelated: true },
//     }),
//   { immediate: true, key: `article-${articleId.value}` }
// );
const toggleLike = async () => {
  console.log("------user-------");
  if (!user.value) {
    alert("You need to log in to like this article.");
    router.push("/login");
    return;
  }

  console.log("-user--", user.value);
  if (isLiked.value) {
    // Unlike the article
    console.log("----unliking the article-----");
    const { error } = await supabase
      .from("article_like")
      .delete()
      .match({ user_id: user.value.id, article_id: articleId.value });

    if (!error) {
      isLiked.value = false;
      console.log("--likeCount--", typeof likeCount.value);
      likeCount.value = Number(likeCount.value) - 1;
      console.log("--likeCount--", typeof likeCount.value);
      console.log("--likeCount--", likeCount.value);
    } else {
      console.error("Error unliking article:", error.message);
    }
  } else {
    // Like the article
    console.log("----liking the article-----");
    const { error } = await supabase
      .from("article_like")
      .insert([{ user_id: user.value.id, article_id: articleId.value }]);

    if (!error) {
      isLiked.value = true;
      console.log("--likeCount--", typeof likeCount.value);
      likeCount.value = Number(likeCount.value) + 1;
      console.log("--likeCount--", typeof likeCount.value);
      console.log("--likeCount--", likeCount.value);
    } else {
      console.error("Error liking article:", error.message);
    }
  }
};

const { data: response, error } = await useFetch(
  `/api/articles/${articleId.value}`,
  {
    server: true,
    key: `article-${articleId.value}`,
  }
);

// Assign fetched data
if (!error.value && response?.value) {
  console.log("----response.value.article---", response.value.article);
  article.value = response.value.article || {};
  likeCount.value = article.value.likes;
}

// Compute article URL based on the current route
const articleUrl = computed(() => {
  const baseUrl = window?.location?.origin || "https:upshotmedia.com";
  return `${baseUrl}/articles/${slug}`;
});

// Set SEO meta tags using `useHead`
useHead({
  title: article.value ? article.value.title : "Article",
  meta: [
    {
      name: "description",
      content: article.value
        ? article.value.subtitle
        : "Read the latest article.",
    },
    {
      property: "og:title",
      content: article.value ? article.value.title : "Article",
    },
    {
      property: "og:description",
      content: article.value
        ? article.value.subtitle
        : "Read the latest article.",
    },
    { property: "og:image", content: article.value ? article.value.image : "" },
    // { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: article.value ? article.value.title : "Article",
    },
    {
      name: "twitter:description",
      content: article.value
        ? article.value.subtitle
        : "Read the latest article.",
    },
    {
      name: "twitter:image",
      content: article.value ? article.value.image : "",
    },
  ],
});

// Helper function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

onMounted(async () => {
  if (!user.value) return;

  // Check if the user has already liked the article
  const { data, error } = await supabase
    .from("article_like")
    .select("*")
    .eq("article_id", articleId.value)
    .eq("user_id", user.value.id)
    .maybeSingle();

  console.log("--data--", data);
  if (data) {
    isLiked.value = true;
  }
  console.log("--error", error);
});
</script>

<style scoped>
/* Add any necessary styles here */
.clickable {
  cursor: pointer;
  pointer-events: auto;
}
</style>
