<template>
  <div class="max-w-7xl mx-auto py-10 px-4">
    <h1 class="text-4xl font-bold text-center mb-4">Contact us</h1>
    <p class="text-center text-gray-600 mb-8">
      AAny question or remarks? Just write us a message!
    </p>

    <div class="grid grid-cols-1 mt-14 lg:grid-cols-2 mx-[80px] gap-8 !content-center">
      <!-- Contact Information -->
      <div class="bg-blue-800 flex justify-between flex-col text-white max-w-[491px] max-h-[647px] rounded-lg p-6 space-y-4">
        <div>
            <h2 class="text-[28px] font-semibold">Contact Information</h2>
            <p class="text-lg mt-2">Say something to start a live chat!</p>
        </div>
        <div class="space-y-2 pt-[50px] pb-[70px]">
          <div class="flex items-center space-x-4 !mb-[40px]">
            <img src="/images/phone.png" alt="" />
            <span>+91 8962429492</span>
          </div>
          <div class="flex items-center space-x-4 !mb-[40px]">
            <img src="/images/email.png" alt="" />
            <span>contact@upshotbrandmedia.com</span>
          </div>
          <div class="flex items-center space-x-4">
            <img src="/images/location.png" alt="" />
            <span>132 Dartmouth Street Boston,<br/> Massachusetts 02156 United States</span>
          </div>
        </div>
        <div class="flex items-center  space-x-4 mt-4">
           <a
            href="category"
            aria-label="Twitter"
            target="_blank"
            class="p-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 hover:bg-[#85B356]  transition"
          >
            <i class="fab fa-twitter text-white"></i>
          </a>
          <a
            href="https://www.facebook.com/Upshotbrandmediallp?mibextid=ZbWKwL"
            aria-label="Facebook"
            target="_blank"
            class="p-2 flex h-10 w-10 items-center justify-center  rounded-full text-white bg-gray-300 hover:bg-[#85B356]  transition"
          >
            <i class="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/upshotbrandmedia/profilecard/?igsh=MWE4ZnRpc2ZxemIxMg%3D%3D"
            aria-label="Instagram"
            target="_blank"
            class="p-2 flex h-10 w-10 items-center justify-center  rounded-full bg-gray-300 hover:bg-[#85B356]  transition"
          >
            <i class="fab fa-instagram text-white"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/upshotbrandmediallp/"
            aria-label="LinkedIn"
            target="_blank"
            class="p-2 flex h-10 w-10 items-center justify-center  rounded-full bg-gray-300 hover:bg-[#85B356]  transition"
          >
            <i class="fab fa-linkedin text-white"></i>
          </a>
        </div>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="submitForm" class="space-y-4 mt-[50px]">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            v-model="form.name"
            placeholder="Name"
            class="border text-black rounded-md p-2 w-full placeholder:text-black"
            required
          />
          <input
            type="text"
            v-model="form.phone"
            placeholder="Phone Number"
            class="border rounded-md text-black p-2 w-full placeholder:text-black"
            required
          />
        </div>
        <input
          type="email"
          v-model="form.email"
          placeholder="Email ID"
          class="border rounded-md p-2 w-full text-black placeholder:text-black"
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
          class="border rounded-md p-2 w-full h-28 text-black placeholder:text-black"
          required
        ></textarea>
        <button
          type="submit"
          class="bg-[#011C2A] text-right ml-auto flex text-white px-8 py-2 rounded-md hover:bg-blue-700 w-full md:w-auto"
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
