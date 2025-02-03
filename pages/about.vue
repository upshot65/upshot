<template>
  <div class="about-us-page py-10 px-6 md:px-16 lg:px-32">
    <!--  Hero Section -->
    <section class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
      <p class="text-lg leading-relaxed">
        We are a Responsible Branding company that helps brands envision their
        branded future.<br/> This future is built on the foundation of
        research-amplified content, immersive ideations,<br/> and diminishing
        branding deadbeats.
      </p>
      <div class="relative about-img-wrapper bg-transparent">
        <img src="/images/about-us.jpg" alt="" class="hover:scale-[1.05] transition-transform duration-300 rounded-[16px] mb-8 mt-6"/>
      </div>
      <p class="text-lg text-center leading-relaxed">UBM helps businesses reach their brand goals, connect with target audiences via<br/> community activations, and have a 360° approach toward reaching brand goals.</p>
    </section>

    <section class="py-12 bg-white">
      <div class="container mx-auto">
        <div class="grid grid-cols-2 gap-6">
          <div v-for="(item, index) in items" :key="index" class="max-w-[520px] flex flex-col items-center py-6 bg-white border-2 rounded-lg shadow-sm border border-gray-200">
            <img :src="item.image" alt="item.title" class="w-10 h-auto mb-3" />
            <span class="font-semibold">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </section>

 <!-- Team Carousel -->
    <section class="py-12 bg-white text-center">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold mb-6">Meet Our Team</h2>
        <Swiper
          :slidesPerView="3"
          :spaceBetween="20"
          :loop="true"
          :pagination="{ clickable: true }"
          :navigation="true"
          :autoplay="{ delay: 3000 }"
          :modules="modules"
          class="team-carousel"
        >
          <SwiperSlide v-for="(member, index) in team" :key="index">
            <div class="bg-white rounded-lg p-6 text-left">
              <img :src="member.image" :alt="member.name" class="w-full h-60 object-cover rounded-md mb-4" />
              <h3 class="text-lg font-semibold text-blue-600">{{ member.name }}</h3>
              <p class="text-gray-500 text-sm mb-2">{{ member.role }}</p>
              <p class="text-gray-600 text-xs">{{ member.description }}</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import autoplay styles
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Register Swiper modules
const modules = [Navigation, Pagination, Autoplay];

const items = [
  { image: "/images/personal-branding.jpg", title: "Personal Branding Expert" },
  { image: "/images/concept-events.png", title: "Concept Events & Marketing" },
  { image: "/images/concept-visualizer.png", title: "Concept Creation Visualizer" },
  { image: "/images/digital-brand.png", title: "Digital Brand Creators" },
];

const team = [
  { image: "/images/team-member-1.jpg", name: "Moomal Sisodia", role: "Founder & CEO", description: "Image Consultant & Personal Branding Expert 8+ yrs in Brand Building including MP Police professionals" },
  { image: "/images/team-member-2.jpg", name: "Aditi Gupta", role: "Lead Advisor - Strategic Partnerships", description: "15+ yrs experience in building Branded Content for Hotstar/ Star/ Zee Group" },
  { image: "/images/team-member-3.jpg", name: "Nisha Sharma", role: "Partner & Promoter", description: "M.Sc., M.Tech from NIT Kurukshetra" },
  { image: "/images/team-member-2.jpg", name: "Kavita SIngh", role: "Content Lead", description: "16+ yrs of Content building experience" },
];
</script>

<style scoped>
.about-img-wrapper::after {
  content: "";
  position: absolute;
  background: url("/images/about-star.png");
  right: -90px;
  left: auto;
  width: 100%;
  max-width: 242px;
  height: 242px;
  top: -116px;
  background-repeat: no-repeat;
  z-index: -1;
}
</style>