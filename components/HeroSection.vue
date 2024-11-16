<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-content-heading">
        <h1
          class="text-2xl md:text-4xl lg:text-7xl font-bold text-gray-900 leading-tight"
        >
          Your daily dose of <br class="hidden md:block" />
          insights, & stories
        </h1>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.hero-section {
  background-image: url("/hero/landing-hero-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  position: relative;
}

.hero-content-heading {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
