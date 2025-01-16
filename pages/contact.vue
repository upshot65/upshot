<template>
  <div class="max-w-7xl mx-auto py-10 px-4">
    <h1 class="text-4xl font-bold text-center mb-4">Contact us</h1>
    <p class="text-center text-gray-600 mb-8">
      Any question or remarks? Just write us a message!
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Contact Information -->
      <div class="bg-blue-800 text-white rounded-lg p-6 space-y-4">
        <h2 class="text-lg font-semibold">Contact Information</h2>
        <p>Say something to start a live chat!</p>
        <div class="space-y-2">
          <div class="flex items-center space-x-2">
            <i class="fas fa-phone"></i>
            <span>+91 8962429492</span>
          </div>
          <div class="flex items-center space-x-2">
            <i class="fas fa-envelope"></i>
            <span>contact@upshotbrandmedia.com</span>
          </div>
          <div class="flex items-center space-x-2">
            <i class="fas fa-map-marker-alt"></i>
            <span>HQ: 12/4, Film Colony, regal Square, indore (M.P)</span>
          </div>
        </div>
        <div class="flex space-x-4 mt-4">
          <a href="#" class="text-blue-200 hover:text-blue-400">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="text-blue-200 hover:text-blue-400">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" class="text-blue-200 hover:text-blue-400">
            <i class="fab fa-discord"></i>
          </a>
        </div>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            v-model="form.name"
            placeholder="Name"
            class="border rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            v-model="form.phone"
            placeholder="Phone Number"
            class="border rounded-md p-2 w-full"
            required
          />
        </div>
        <input
          type="email"
          v-model="form.email"
          placeholder="Email ID"
          class="border rounded-md p-2 w-full"
          required
        />
        <select
          v-model="form.enquiryFor"
          class="border rounded-md p-2 w-full"
          required
        >
          <option value="" disabled>Select from list</option>
          <option value="General Inquiry">Branding & Marketing</option>
          <option value="Support">Digital marketing</option>
          <option value="Feedback">Promotional campaigns</option>
          <option value="Other">BTL activations</option>
          <option value="Support">Concept Events</option>
          <option value="Feedback">OTT Integration</option>
          <option value="Other">Celebrity management</option>
          <option value="Other">Print Solutions</option>
          <option value="Other">Others</option>
        </select>
        <textarea
          v-model="form.message"
          placeholder="Write your message..."
          class="border rounded-md p-2 w-full h-28"
          required
        ></textarea>
        <button
          type="submit"
          class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full md:w-auto"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  name: "",
  phone: "",
  email: "",
  enquiryFor: "",
  message: "",
});

async function submitForm() {
  try {
    if (!form.value.name || !form.value.email) {
      alert("Please fill out all required fields.");
      console.log("ok");
      return;
    }
    const response = await $fetch("/api/send-email", {
      method: "POST",
      body: form.value,
    });
    alert("Message sent successfully!");
    form.value = {
      name: "",
      phone: "",
      email: "",
      enquiryFor: "",
      message: "",
    };
  } catch (error) {
    alert("Error sending message. Please try again later.");
  }
}
</script>

<style scoped>
/* Add any custom styles specific to this page if needed */
</style>
