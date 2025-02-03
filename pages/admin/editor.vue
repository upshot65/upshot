<template>
  <section>
    <!-- <h1 class="justify-center">Welcome to Editor</h1> -->

    <ClientOnly>
      <Quill v-model:content="body" />
    </ClientOnly>
    <main v-html="body"></main>
  </section>
</template>

<script setup>
const body = ref("");
</script>

<style></style>
