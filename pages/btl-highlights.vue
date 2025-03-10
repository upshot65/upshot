<template>
  <section>
    <div class="relative overflow-hidden flex justify-center mx-auto cursor-pointer btl-bg group w-full">
      <div class="absolute bottom-0 left-[20px] text-white p-3 text-lg">
        BTL Highlights
      </div>
    </div>
  </section>
  <section class="events-section">
    <div class="w-full md:px-5 px-0 mx-auto relative">
      <h2 class="text-2xl font-bold text-blue-900 mb-6 px-4">Ongoing Events</h2>
      <div class="relative">
        <div class="overflow-hidden px-4">
          <div ref="sliderContainer" class="flex -mx-2 w-full transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${scrollPosition}px)` }">
            <div v-for="event in ongoingEvents" :key="event.id" class="w-full md:max-w-[380px] px-2 flex-shrink-0">
              <div class="bg-white rounded-lg overflow-hidden h-full">
                <img src="/public/images/event-img.png" :alt="event.title"
                  class="w-full h-48 object-cover rounded-xl" />
                <div class="p-4">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ event.title }}</h3>
                  <p class="text-gray-600 text-sm">{{ event.date }}</p>
                  <p class="text-gray-600 text-sm line-clamp-2">{{ event.description }}</p>
                  <a href="/contact" class="prebook-button">Inquiry Now</a>
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

  <section class="events-section">
    <div class="w-full md:px-5 px-0 mx-auto relative">
      <h2 class="text-2xl font-bold text-blue-900 mb-6 px-4">Upcoming Events</h2>
      <div class="relative">
        <div class="overflow-hidden px-4">
          <div ref="sliderContainer" class="flex -mx-2 transition-transform duration-500 ease-in-out w-full"
            :style="{ transform: `translateX(-${scrollPosition}px)` }">
            <div v-for="event in upcomingEvents" :key="event.id" class="w-full md:max-w-[380px] px-2 flex-shrink-0">
              <div class="bg-white rounded-lg overflow-hidden h-full">
                <img src="/public/images/event-img.png" :alt="event.title"
                  class="w-full h-48 object-cover rounded-xl" />
                <div class="p-4">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ event.title }}</h3>
                  <p class="text-gray-600 text-sm">{{ event.date }}</p>
                  <p class="text-gray-600 text-sm line-clamp-2">{{ event.description }}</p>
                  <a href="/contact" class="prebook-button">Inquiry Now</a>
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

  <section class="events-section">
    <div class="w-full md:px-5 px-0 mx-auto relative">
      <h2 class="text-2xl font-bold text-blue-900 mb-6 px-4">Past Events</h2>
      <div class="relative">
        <div class="overflow-hidden px-4">
          <div ref="sliderContainer" class="flex -mx-2 transition-transform duration-500 ease-in-out w-full"
            :style="{ transform: `translateX(-${scrollPosition}px)` }">
            <div v-for="event in upcomingEvents" :key="event.id" class="w-full md:max-w-[380px] px-2 flex-shrink-0">
              <div class="bg-white rounded-lg overflow-hidden h-full">
                <img src="/public/images/event-img.png" :alt="event.title"
                  class="w-full h-48 object-cover rounded-xl" />
                <div class="p-4">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ event.title }}</h3>
                  <p class="text-gray-600 text-sm">{{ event.date }}</p>
                  <p class="text-gray-600 text-sm line-clamp-2">{{ event.description }}</p>
                  <a href="/contact" class="prebook-button">Inquiry Now</a>
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

  <section class="photo-gallery-section">
    <div class="p-6">
      <h2 class="text-3xl font-bold text-[#004AAC] mb-4 text-center md:text-left">Photo Gallery</h2>
      
      <!-- First Row -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-4">
        <div class="col-span-1 rounded-lg overflow-hidden bg-gray-300">
          <img src="https://via.placeholder.com/200x150?text=Image+1" alt="Dummy Image" class="w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[290px] object-cover" />
        </div>
        <div class="col-span-1 lg:col-span-2 rounded-lg overflow-hidden bg-gray-300">
          <img src="https://via.placeholder.com/400x150?text=Image+2" alt="Dummy Image" class="w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[290px] object-cover" />
        </div>
        <div class="col-span-1 rounded-lg overflow-hidden bg-gray-300">
          <img src="https://via.placeholder.com/200x150?text=Image+3" alt="Dummy Image" class="w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[290px] object-cover" />
        </div>
      </div>
      
      <!-- Second Row -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div class="col-span-1 lg:col-span-2 rounded-lg overflow-hidden bg-gray-300">
          <img src="https://via.placeholder.com/300x150?text=Image+4" alt="Dummy Image" class="w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[290px] object-cover" />
        </div>
        <div class="col-span-1 rounded-lg overflow-hidden bg-gray-300">
          <img src="https://via.placeholder.com/150x150?text=Image+5" alt="Dummy Image" class="w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[290px] object-cover" />
        </div>
        <div class="col-span-1 lg:col-span-2 rounded-lg overflow-hidden bg-gray-300">
          <img src="https://via.placeholder.com/300x150?text=Image+6" alt="Dummy Image" class="w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[290px] object-cover" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import EventImg from '../public/images/event-img.png'


const ongoingEvents = [
  { id: 1, title: "Event 1", date: "Feb 20, 2025", description: "Short description", image: { EventImg } },
  { id: 2, title: "Event 2", date: "Feb 18 - 23, 2025", description: "Short description", image: "/public/images/event-img.png" },
  { id: 3, title: "Event 1", date: "Feb 20, 2025", description: "Short description", image: "/public/images/event-img.png" },
  { id: 4, title: "Event 2", date: "Feb 18 - 23, 2025", description: "Short description", image: "/public/images/event-img.png" },
  { id: 5, title: "Event 1", date: "Feb 20, 2025", description: "Short description", image: "/public/images/event-img.png" },
  { id: 6, title: "Event 2", date: "Feb 18 - 23, 2025", description: "Short description", image: "/public/images/event-img.png" },
  { id: 7, title: "Event 1", date: "Feb 20, 2025", description: "Short description", image: "/public/images/event-img.png" },
  { id: 8, title: "Event 2", date: "Feb 18 - 23, 2025", description: "Short description", image: "/public/images/event-img.png" }
];


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

const pastEvents = [
  { id: 6, title: "Event 1", date: "Jan 01, 2025", description: "Short description", image: "/public/images/event-img.png" },
  { id: 7, title: "Event 2", date: "Jan 14, 2025", description: "Short description", image: "/public/images/event-img.png" },
  { id: 8, title: "Event 3", date: "Feb 10 - 16, 2025", description: "Short description", image: "/public/images/event-img.png" }
];

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
  display: block;
  text-align: center;
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

.btl-bg {
  background-image: url('/images/popular-main.png');
  background-size: cover;
  background-position: center;
  min-height: 500px;
  height: 100%;
  width: 100%;
}

@media (max-width: 768px) {
  .btl-bg {
    min-height: 300px;
  }
}
</style>