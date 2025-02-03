<template>
  <div
    class=" p-4 rounded-lg flex flex-col md:flex-row items-start gap-4"
  >
    <!-- Article Image -->
    <NuxtImg
      :src="image"
      alt="Article Image"
      class="w-full md:w-1/3 h-48 md:h-auto object-cover rounded-lg"
    />

    <!-- Article Content (Clickable) -->
    <NuxtLink
      :to="`/articles/${articleId}-${slugTitle}`"
      class="flex-1 text-left"
    >
      <h2 class="text-xl font-bold text-gray-900">{{ title }}</h2>
      <p class="text-gray-700 mt-2">
        {{ description }}
      </p>
      <p class="text-gray-500 mt-4 text-sm">
        Date posted: {{ formatDate(datePosted) }}
      </p>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    required: true,
  },
  articleId: {
    type: [String, Number],
    required: true,
  },
});

const { formatDate } = useFormatDate();

// Compute a slugified version of the title for SEO-friendly URLs
const slugTitle = computed(() => {
  return props.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special characters with dashes
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing dashes
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
