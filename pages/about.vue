<template>
  <div class="about-us-page py-10 px-6 md:px-16 lg:px-32">
    <!--  Hero  Section -->
    <section class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
      <p class="text-lg leading-relaxed">
        We are a Responsible Branding company that helps brands envision their
        branded future.<br/> This future is built on the foundation of
        research-amplified content, immersive ideations,<br/> and diminishing
        branding deadbeats.
      </p>
      <div class="relative flex justify-center max-w-[660px] mx-auto items-center bg-transparent">
        <img src="/images/about-us.jpg" alt="" 
            class="hover:scale-[1.05] transition-transform duration-300 rounded-[16px] flex justify-center items-center mb-8 mt-6 h-80 object-cover mx-auto" />
      </div>

      <p class="text-lg text-center leading-relaxed">UBM helps businesses reach their brand goals, connect with target audiences via<br/> community activations, and have a 360° approach toward reaching brand goals.</p>
    </section>

    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="max-w-[520px] w-full flex flex-col items-center py-6 bg-white border-2 rounded-lg shadow-sm border-gray-200 mx-auto justify-center"
          >
            <img :src="item.image" :alt="item.title" class="w-10 h-auto mb-3" />
            <span class="font-semibold text-center">{{ item.title }}</span>
          </div>
        </div>
        </div>
    </section>


    <section class="py-16 px-4">
  <h2 class="text-[32px] md:text-[42px] mb-[30px] md:mb-[40px] font-semibold text-center">
    Our Clients
  </h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[520px] sm:max-w-full mx-auto">
    <div class="p-4 border border-[#AFAFAF] rounded-[20px] text-center">
      <p class="text-[48px] md:text-[62px]">50+</p>
      <p class="text-black text-[22px] md:text-[28px]">Activations</p>
    </div>
    <div class="p-4 border border-[#AFAFAF] rounded-[20px] text-center">
      <p class="text-[48px] md:text-[62px]">5000+</p>
      <p class="text-black text-[22px] md:text-[28px]">TG Audience Connect</p>
    </div>
    <div class="p-4 rounded-[20px] bg-[#85B356] text-white transform rotate-[-5deg] text-center">
      <p class="text-[48px] md:text-[62px]">5</p>
      <p class="text-white m-0 text-[22px] md:text-[28px]">Flagship Properties</p>
    </div>
    <div class="p-4 border py-6 border-[#AFAFAF] rounded-[20px] text-center">
      <p class="text-[48px] md:text-[62px]">40k+</p>
      <p class="text-black text-[22px] md:text-[28px]">Digital Impressions</p>
    </div>
  </div>
</section>



 <!-- Team Carousel -->
 <section class="py-12 bg-white text-center">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold mb-6">Meet Our Team</h2>
      <Swiper
        :slidesPerView="slides"
        :spaceBetween="20"
        :loop="false"
        :pagination="{ clickable: true }"
        :navigation="true"
        :autoplay="{ delay: 3000 }"
        :modules="modules"
        class="team-carousel"
      >
        <SwiperSlide v-for="(member, index) in team" :key="index">
          <div class="bg-white rounded-lg sm:p-6 p-0 text-left mb-16">
            <img :src="member.image" :alt="member.name" class="w-full h-full object-cover rounded-md mb-4" />
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
import { ref, onMounted, onUnmounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const modules = [Pagination, Navigation, Autoplay];

const items = [
  { image: "/images/personal-branding.jpg", title: "Personal Branding Expert" },
  { image: "/images/concept-events.png", title: "Concept Events & Marketing" },
  { image: "/images/concept-visualizer.png", title: "Concept Creation Visualizer" },
  { image: "/images/digital-brand.png", title: "Digital Brand Creators" },
];

const team = [
  { image: "/images/moomal-sisodia.png", name: "Moomal Sisodia", role: "Founder & CEO", description: "Image Consultant & Personal Branding Expert 8+ yrs in Brand Building including MP Police professionals" },
  { image: "/images/aditi-gupta.png", name: "Aditi Gupta", role: "Lead Advisor - Strategic Partnerships", description: "15+ yrs experience in building Branded Content for Hotstar/ Star/ Zee Group" },
  { image: "/images/yashi-kothari.png", name: "Yashi Kathari", role: "Partner & Promoter", description: "M.Sc., M.Tech from NIT Kurukshetra" },
  { image: "/images/kavita-singh.png", name: "kavita-singh", role: "Content Lead", description: "16+ yrs of Content building experience" },
  { image: "/images/nisha-sharma.png", name: "Nisha Sharma", role: "Partner & Promoter", description: "M.Sc, M.Tech from NIT Kurukshetra" },
];
const slides = ref(3);

const updateSlides = () => {
  const width = window.innerWidth;
  if (width < 640) {
    slides.value = 1;
  } else if (width < 1024) {
    slides.value = 2;
  } else {
    slides.value = 3;
  }
};

onMounted(() => {
  updateSlides();
  window.addEventListener('resize', updateSlides);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateSlides);
});
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
