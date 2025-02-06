<template>
  <QuillEditor :options="options" content-type="html" />
</template>

<script setup>
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["image", "link", "video", "formula"], // Ensure this is correctly placed
  ["clean"], // remove formatting button
];

const options = ref({
  modules: { // FIXED: changed from "module" to "modules"
    toolbar: toolbarOptions,
  },
  placeholder: "Compose Here.....",
  readonly: false,
  theme: "snow",
});
</script>

<style>
.ql-container {
  min-height: 100px;
  height: 100%;
}

.ql-editor {
  min-height: 100px;
  height: 100%;
}
</style>
