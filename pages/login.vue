<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-gray-100">
    <!-- Left section for logo --->
    <div class="flex-1">
      <!-- Placeholder for logo/image -->
      <!-- <div class="w-full max-w-xs h-64 bg-gray-300"></div> -->
      <NuxtImg
        src="/images/auth-left.png"
        alt="Hero Background"
        class="w-full h-full"
      />
    </div>

    <!-- Right section for login form -->
    <div class="flex-1 flex items-center justify-center p-6 lg:p-12">
      <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold mb-4">Join us today</h2>
        <p class="text-gray-600 mb-6">
          We bring you the latest news, top articles, and captivating stories
          all in one place.
        </p>

        <button
          class="w-full py-3 mb-6 rounded-full bg-black text-white flex justify-center items-center font-semibold hover:bg-gray-800 transition-colors"
        >
          <span class="mr-2">G</span> Sign in with Google
        </button>

        <form @submit.prevent="handleSignIn" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email Address</label
            >
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="mt-2 w-full px-3 py-2 border border-gray-300 rounded-full"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              type="password"
              id="password"
              v-model="form.password"
              class="mt-2 w-full px-3 py-2 border border-gray-300 rounded-full"
              required
            />
          </div>

          <div class="flex items-center mt-4">
            <input type="checkbox" id="remember" class="mr-2" />
            <label for="remember" class="text-gray-700 text-sm"
              >Remember me</label
            >
          </div>

          <button
            type="submit"
            class="w-full py-3 mt-6 rounded-full bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors"
          >
            Sign In
          </button>
        </form>

        <p class="text-center text-gray-600 mt-4">
          Don’t have an account?

          <NuxtLink to="/signup" class="text-indigo-600"
            >Create free account</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
import { z } from "zod";
const supabase = useSupabaseClient();
const form = ref({
  email: "",
  password: "",
});

const errors = ref({});

const schema = z.object({
  email: z.string().email({ message: "Must be a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

function validateForm() {
  try {
    schema.parse(form.value);
    errors.value = {};
    return true;
  } catch (validationError) {
    errors.value = validationError.errors.reduce((acc, err) => {
      acc[err.path[0]] = err.message;
      return acc;
    }, {});
    return false;
  }
}

async function handleSignIn() {
  console.log("------form.value-----", form.value);
  if (!validateForm()) {
    return;
  }
  // Add your login functionality here
  const { error } = await supabase.auth.signInWithPassword({
    email: form.value.email,
    password: form.value.password,
  });

  if (error) {
    throw error;
  }

  // Get redirect path or fallback to home page
  const redirectPath = route.query.redirect || "/";
  router.push(redirectPath);
  console.log("done");
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
