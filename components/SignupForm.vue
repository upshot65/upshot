<template>
  <!-- Conditional Rendering -->

  <div v-if="showProfileSetupForm">
    <!-- Show ProfileSetupForm.vue component when showProfileSetupForm is true -->
    <ProfileSetupForm />
  </div>
  <div v-else>
    <SignUp @accountCreated="handleAccountCreated" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const showProfileSetupForm = ref(false);
showProfileSetupForm.value = true;
</script>

<style scoped>
/* Scoped style adjustments (if any) can be added here */
</style>
