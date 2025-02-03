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
      class="w-50 py-3 mt-6 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
    >
      Add Article
    </button>
  </div>
</template>

<script setup>
const body = ref("");
</script>

<style></style>
