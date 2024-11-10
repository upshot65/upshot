<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100">
    <!-- Header with Logo -->
    <header class="w-full bg-gray-200 py-6 flex justify-center">
      <img src="/logo.png" alt="Logo" class="h-10" />
    </header>

    <!-- Profile Setup Form -->
    <div
      class="bg-white w-full max-w-3xl mx-auto mt-8 p-8 rounded-lg shadow-lg"
    >
      <h2 class="text-2xl font-bold mb-2">Create your profile</h2>
      <p class="text-gray-600 mb-6">
        Hi XYZ, Lorem ipsum dolor sit amet consectetur. Dapibus scelerisque
        phasellus habitant sed pharetra mollis velit.
      </p>

      <form @submit.prevent="handleProfileSetup" class="space-y-6">
        <!-- Profile Picture and Social Links -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              for="profile-picture"
              class="block text-sm font-medium text-gray-700"
              >Profile picture</label
            >
            <input
              type="file"
              id="profile-picture"
              class="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200 transition"
            />
          </div>
          <div>
            <label
              for="linkedin"
              class="block text-sm font-medium text-gray-700"
              >LinkedIn</label
            >
            <input
              type="url"
              id="linkedin"
              v-model="linkedin"
              placeholder="LinkedIn URL"
              class="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200 transition"
            />
          </div>
          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700"
              >Bio</label
            >
            <textarea
              id="bio"
              v-model="bio"
              placeholder="Short Bio"
              rows="2"
              class="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200 transition"
            ></textarea>
          </div>
          <div>
            <label
              for="instagram"
              class="block text-sm font-medium text-gray-700"
              >Instagram</label
            >
            <input
              type="url"
              id="instagram"
              v-model="instagram"
              placeholder="Instagram URL"
              class="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200 transition"
            />
          </div>
        </div>

        <!-- Interests Selection -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700">Select Interests</h3>
          <div class="flex flex-wrap gap-2 mt-2">
            <label
              v-for="interest in interests"
              :key="interest.id"
              @click="toggleInterest(interest.name)"
              class="flex items-center px-4 py-2 rounded-full cursor-pointer"
              :class="{
                'bg-black text-white': selectedInterests.includes(
                  interest.name
                ),
                'bg-gray-200 text-gray-800': !selectedInterests.includes(
                  interest.name
                ),
              }"
            >
              <!-- <input
                v-model="selectedInterests"
                :value="interest"
                class="hidden"
              /> -->
              {{ interest.name }}
            </label>
          </div>
        </div>

        <!-- Newsletter Signup and Preferences -->
        <div class="flex items-center space-x-4">
          <span class="text-gray-700">Newsletter signup</span>
          <label class="flex items-center">
            <input
              type="radio"
              v-model="newsletterSignup"
              value="yes"
              class="form-radio text-indigo-600 h-4 w-4"
            />
            <span class="ml-2 text-gray-700">Yes</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              v-model="newsletterSignup"
              value="no"
              class="form-radio text-indigo-600 h-4 w-4"
            />
            <span class="ml-2 text-gray-700">No</span>
          </label>
        </div>

        <div v-if="newsletterSignup === 'yes'">
          <h3 class="text-lg font-semibold text-gray-700 mt-4">
            Newsletter Preference
          </h3>
          <div class="flex space-x-4 mt-2">
            <label
              v-for="preference in newsletterPreferences"
              :key="preference"
              class="bg-gray-200 px-4 py-2 rounded-full cursor-pointer"
            >
              <input
                type="radio"
                v-model="newsletterPreference"
                :value="preference"
                class="hidden"
              />
              {{ preference }}
            </label>
          </div>
        </div>

        <!-- Complete Button -->
        <button
          type="submit"
          class="w-full py-3 mt-6 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
        >
          Complete
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const linkedin = ref("");
const bio = ref("");
const instagram = ref("");
// const interests = [
//   "Technology",
//   "Fashion",
//   "Business",
//   "Finance",
//   "Sports",
//   "Health",
//   "Design",
//   "Arts",
//   "Politics",
//   "Spirituality",
//   "Add other",
// ];
// const selectedInterests = ref([]);
const newsletterSignup = ref("no");
const newsletterPreferences = ["Daily", "Weekly", "Monthly"];
const newsletterPreference = ref("");
const selectedInterests = ref([]);

const userId = useState("userId");

const interests = useState("interests"); // Access global state for interests

const interestNameIdMap = computed(() => {
  return interests.value.reduce((acc, curr) => {
    acc[curr.name] = curr;
    return acc;
  }, {});
});

console.log("-interestNameIdMap---", interestNameIdMap);

async function handleProfileSetup() {
  console.log({
    linkedin: linkedin.value,
    bio: bio.value,
    instagram: instagram.value,
    selectedInterests: selectedInterests.value.map((interest) => {
      return interestNameIdMap.value[interest.name];
    }),
    newsletterSignup: newsletterSignup.value,
    newsletterPreference: newsletterPreference.value,
  });

  // Call profile setup API with userId, Instagram URL, and interests
  const response = await $fetch("/api/profile", {
    method: "POST",
    body: {
      linkedin: linkedin.value,
      bio: bio.value,
      instagram: instagram.value,
      selectedInterests: selectedInterests.value.map((interest) => {
        return interestNameIdMap.value[interest.name];
      }),
      newsletterSignup: newsletterSignup.value,
      newsletterPreference: newsletterPreference.value,
      userId,
    },
  });

  if (response.statusCode === 500) {
    alert(
      "Failed to complete profile: " +
        (error.value.data?.message || "Unknown error")
    );
  } else {
    alert("Profile completed successfully!");
  }
}

console.log("-interests---", interests);

function toggleInterest(interest) {
  console.log("interest being toggled", interest);
  if (selectedInterests.value.includes(interest)) {
    console.log("-selectedInterests---", selectedInterests.value);
    // Remove interest if it's already selected
    selectedInterests.value = selectedInterests.value.filter(
      (i) => i !== interest
    );
  } else {
    // Add interest if it's not selected
    selectedInterests.value.push(interest);
    console.log("-selectedInterests---", selectedInterests.value);
  }
}
</script>

<style scoped>
/* Adjustments for styling if needed */
</style>
