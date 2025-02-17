<script setup>
import { ref } from "vue";
import Editor from "@tinymce/tinymce-vue";

const apiKey = "31qzu1570diuw9j5zq5rlmtzl7wgh1meb91nnqj0gfd5ddfx"; // Replace with your TinyMCE API key (or use 'no-api-key' for basic features)
const content = ref("<p>Hello, TinyMCE in Nuxt 3! 🎉</p>");
</script>

<template>
  <div>
    <Editor
      v-model="content"
      :api-key="apiKey"
      :init="{
        height: 300,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help',
      }"
    />
  </div>
</template>
