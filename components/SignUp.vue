<template>
  <div
    class="flex flex-col lg:flex-row 1 justify-center items-center min-h-screen bg-gray-100 px-4"
  >
    <div>
      <NuxtImg src="/google-icon.png" />
    </div>
    <div class="bg-white max-w-lg w-full p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold mb-4">Join us today</h2>
      <p class="text-gray-600 mb-6">
        We bring you the latest news, top articles, and captivating stories all
        in one place.
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="mt-2 w-full px-3 py-2 border rounded-full"
          />
          <p v-if="errors.name" class="text-red-500 text-sm">
            {{ errors.name }}
          </p>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email Address</label
          >
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="mt-2 w-full px-3 py-2 border rounded-full"
          />
          <p v-if="errors.email" class="text-red-500 text-sm">
            {{ errors.email }}
          </p>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="mt-2 w-full px-3 py-2 border rounded-full"
          />
          <p v-if="errors.password" class="text-red-500 text-sm">
            {{ errors.password }}
          </p>
        </div>
        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="mt-2 w-full px-3 py-2 border rounded-full"
          />
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <div class="flex items-center mt-4">
          <input
            type="checkbox"
            id="terms"
            v-model="form.agreeToTerms"
            class="mr-2"
          />
          <label for="terms" class="text-gray-700 text-sm"
            >Terms and Privacy Agreement</label
          >
        </div>
        <p v-if="errors.agreeToTerms" class="text-red-500 text-sm">
          {{ errors.agreeToTerms }}
        </p>

        <button
          type="submit"
          class="w-full py-3 mt-6 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
        >
          Create Account
        </button>
      </form>

      <NuxtLink
        to="/login"
        class="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors mt-30"
        >Already Have a account sign In here</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
import { z } from "zod";
const supabase = useSupabaseClient();
const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
});

const errors = ref({});

const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Must be a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password is required" }),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({
        message: "You must agree to the Terms and Privacy Agreement",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
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

// Global state for userId
const userId = useState("userId", () => null);

const emit = defineEmits(["accountCreated"]);

async function handleSubmit() {
  if (!validateForm()) return;
  console.log("----form-----", form.value);

  const { data, error } = await supabase.auth.signUp({
    email: form.value.email,
    password: form.value.password,
    options: {
      data: { name: form.value.name }, // ✅ Works in Supabase v1
    },
  });

  console.log("--error---", error);
  console.log("--data---", data);
  if (error) throw error;
  alert("check your email to confirm your account");
  form.value.name = null;
  form.value.email = null;
  form.value.password = null;
  form.value.confirmPassword = null;
  console.log("----data response-----", data);

  // if (response.statusCode == 500) {
  //   if (response.body.code == "23505") {
  //     alert("this email already exist ");
  //   } else {
  //     alert("Failed to create account: ");
  //   }
  // } else {
  //   // Emit the event if account creation is successful
  //   emit("accountCreated");

  //   userId.value = response.body.userId;
  //   // alert("Account created successfully");
  // }
}
</script>

<style scoped>
/* Additional styling if needed */
</style>
