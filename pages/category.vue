<script setup>
const selectedCategory = useState("selectedCategory"); // Populated by your plugin on app mount
const title = computed(() => {
  return `${selectedCategory?.value?.name} - News`;
});
const content = computed(() => {
  return `Read the latest articles in ${selectedCategory?.value?.name}.`;
});

  definePageMeta({
  layout: "default", // ✅ Use the default layout
});
  
useHead({
  title,
  meta: [
    {
      name: "description",
      content,
    },
  ],
});
</script>

<template>
  <div>
    <Category />
  </div>
</template>

<style lang="scss" scoped></style>
