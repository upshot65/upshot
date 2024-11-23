<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header Section -->
    <Header />

    <!-- Main Content Section -->
    <main class="flex-grow bg-white-100 py-8 px-6">
      <!-- class="max-w-7xl mx-auto" -->
      <div>
        <slot />
      </div>
    </main>

    <!-- Subscribe Section -->

    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<script setup></script>

<style scoped>
/* Additional styling if needed */
</style>
