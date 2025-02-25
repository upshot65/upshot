<template>
  <section>
    <div class="flex justify-start px-6 space-x-7 items-center">
      <div class="w-full max-w-[830px]">
        <img src="../public/images/event-main.png" alt="Event Image" class="w-full h-full object-cover" />
      </div>
      <div class="w-full max-w-[360px] h-full min-h-[290px] px-4 py-6 border rounded-lg shadow-md bg-white">
        <h3 class="text-xl font-semibold text-gray-900">Event 1 : Feb 20, 2025</h3>

        <div class="flex items-center gap-2 text-gray-600 text-base mt-4">
          <img src="../public/images/music.png" alt="Clock Icon" class="w-4 h-4" />
          <span>Music</span>
        </div>

        <div class="flex items-center gap-2 text-gray-600 text-base mt-3">
          <img src="../public/images/calander.png" alt="Calendar Icon" class="w-4 h-4" />
          <span>Feb 20, 2025</span>
        </div>

        <div class="flex items-center gap-2 text-gray-600 text-base mt-3">
          <img src="../public/images/location2.png" alt="Location Icon" class="w-4 h-4" />
          <span>Location</span>
        </div>

        <div class="mt-4 border-t pt-5">
          <p class="text-gray-500 text-xs">Price</p>
          <div class="flex items-center justify-between mt-0">
            <span class="text-2xl font-medium text-gray-900">₹1000</span>
            <button class="bg-[#004AAC] text-white px-4 py-2 rounded-[60px] text-xl font-medium hover:bg-blue-700">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="photo-gallery-section">
    <div class="p-6">
      <h2 class="text-lg font-bold text-blue-700 mb-4">Photo Gallery</h2>
      <div class="grid grid-cols-4 gap-5 mb-4">
        <!-- First Row -->
        <div class="col-span-1 rounded-lg overflow-hidden bg-gray-300">
          <img src="https://via.placeholder.com/200x150?text=Image+1" alt="Dummy Image"
            class="w-full h-full min-h-[290px] object-cover" />
        </div>
        <div class="col-span-2 rounded-lg overflow-hidden bg-gray-300">
          <img src="https://via.placeholder.com/400x150?text=Image+2" alt="Dummy Image"
            class="w-full h-full min-h-[290px] object-cover" />
        </div>
        <div class="col-span-1 rounded-lg overflow-hidden bg-gray-300">
          <img src="https://via.placeholder.com/200x150?text=Image+3" alt="Dummy Image"
            class="w-full h-full min-h-[290px] object-cover" />
        </div>
      </div>
      <div class="grid grid-cols-5 gap-5">
        <!-- Second Row -->
        <div class="col-span-2 rounded-lg overflow-hidden bg-gray-300">
          <img src="https://via.placeholder.com/300x150?text=Image+4" alt="Dummy Image"
            class="w-full h-full min-h-[290px] object-cover" />
        </div>
        <div class="col-span-1 rounded-lg overflow-hidden bg-gray-300">
          <img src="https://via.placeholder.com/150x150?text=Image+5" alt="Dummy Image"
            class="w-full h-full min-h-[290px] object-cover" />
        </div>
        <div class="col-span-2 rounded-lg overflow-hidden bg-gray-300">
          <img src="https://via.placeholder.com/300x150?text=Image+6" alt="Dummy Image"
            class="w-full h-full min-h-[290px] object-cover" />
        </div>
      </div>
    </div>
  </section>

  <section class="events-section">
    <div class="w-full px-5 mx-auto relative">
      <h2 class="text-2xl font-bold text-blue-900 mb-6 px-4">Upcoming Events</h2>
      <div class="relative">
        <div class="overflow-hidden px-4">
          <div ref="sliderContainer" class="flex -mx-2 transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${scrollPosition}px)` }">
            <div v-for="event in upcomingEvents" :key="event.id" class="w-full md:max-w-[380px] px-2 flex-shrink-0">
              <div class="bg-white rounded-lg overflow-hidden h-full">
                <img src="/public/images/event-img.png" :alt="event.title"
                  class="w-full h-48 object-cover rounded-xl" />
                <div class="p-4">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ event.title }}</h3>
                  <p class="text-gray-600 text-sm">{{ event.date }}</p>
                  <p class="text-gray-600 text-sm line-clamp-2">{{ event.description }}</p>
                  <button class="prebook-button">Pre-book</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-6 gap-2">
          <button v-for="index in totalDots" :key="index" @click="goToSlide(index - 1)"
            class="w-3 h-3 rounded-full transition-colors duration-200"
            :class="currentDot === index - 1 ? 'bg-green-500' : 'bg-gray-300'" :aria-label="`Go to slide ${index}`" />
        </div>
      </div>
    </div>
  </section>


</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const upcomingEvents = [
  { id: 9, title: "I-Rise Event", date: "March 08, 2025", description: "Short description", image: "/public/images/event-img.png" },
  { id: 10, title: "I-Believe", date: "Aug - Sept, 2025", description: "Short description", image: "/public/images/event-img.png" },
  { id: 11, title: "Event Name", date: "TBA", description: "Short description", image: "/public/images/event-img.png" },
  { id: 12, title: "I-Rise Event", date: "March 08, 2025", description: "Short description", image: "/public/images/event-img.png" },
  { id: 13, title: "I-Believe", date: "Aug - Sept, 2025", description: "Short description", image: "/public/images/event-img.png" },
  { id: 14, title: "Event Name", date: "TBA", description: "Short description", image: "/public/images/event-img.png" }
];

const sliderContainer = ref(null);
const scrollPosition = ref(0);
const currentDot = ref(0);
const containerWidth = ref(0);
const slideWidth = ref(0);

const maxScroll = computed(() => {
  if (!containerWidth.value) return 0;
  const totalWidth = upcomingEvents.length * slideWidth.value;
  return Math.max(0, totalWidth - containerWidth.value);
});

const totalDots = computed(() => {
  if (!containerWidth.value) return 1;
  const slidesPerView = Math.floor(containerWidth.value / slideWidth.value);
  return Math.ceil((upcomingEvents.length - slidesPerView) / 1) + 1;
});

onMounted(() => {
  const updateDimensions = () => {
    const container = sliderContainer.value;
    if (!container) return;

    containerWidth.value = container.parentElement.offsetWidth;
    const firstSlide = container.firstElementChild;
    if (firstSlide) {
      slideWidth.value = firstSlide.offsetWidth;
    }

    if (scrollPosition.value > maxScroll.value) {
      scrollPosition.value = maxScroll.value;
      updateCurrentDot(scrollPosition.value);
    }
  };

  updateDimensions();
  window.addEventListener("resize", updateDimensions);

  onUnmounted(() => {
    window.removeEventListener("resize", updateDimensions);
  });
});

const goToSlide = (index) => {
  const newPosition = Math.min(index * slideWidth.value, maxScroll.value);
  scrollPosition.value = newPosition;
  currentDot.value = index;
};

const updateCurrentDot = (position) => {
  currentDot.value = Math.round(position / slideWidth.value);
};
</script>



<style scoped>
.events-section {
  position: relative;
  padding-top: 50px;
  margin: 30px 0;
}

.event-carousel {
  display: flex;
  overflow-x: auto;
  gap: 16px;
}

.event-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  flex-shrink: 0;
}

.event-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.event-info {
  padding: 16px;
}

.event-title {
  font-size: 18px;
  font-weight: bold;
}

.event-date {
  font-size: 14px;
  color: gray;
}

.event-description {
  font-size: 14px;
  margin-top: 8px;
}

.prebook-button,
.highlight-button {
  margin-top: 12px;
  padding: 8px 12px;
  border-radius: 60px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  max-width: 162px;
}

.prebook-button {
  background-color: #004AAC;
  color: white;
  border: none;
}

.photo-gallery-section {
  position: relative;
  padding-top: 50px;
  margin: 30px 0;
}

.photo-card {
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.events-section {
  position: relative;
  padding-top: 50px;
  margin: 30px 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>