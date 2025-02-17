<script setup>
import { defineProps, defineEmits } from "vue";
import Editor from "@tinymce/tinymce-vue";
const apiKey = "31qzu1570diuw9j5zq5rlmtzl7wgh1meb91nnqj0gfd5ddfx";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <Editor
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
    :model-value="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  />
</template>
