<template>
  <carousel :items-to-show="1">
    <Slide v-for="item in imagenes" :key="item">
      <img :src="item" class="carousel__item" />
    </Slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";

const props = defineProps({
  imagenes: {
    type: Array,
    default: [
      "@/assets/gallery/senlleiras_12.jpg",
      "@/assets/gallery/senlleiras_10.jpg",
      "@/assets/gallery/senlleiras_8.jpg",
    ],
  },
});
</script>

<style>
.carousel__item {
  width: 100%;
  height: 350px;
  object-fit: cover;
  overflow: hidden;
}
</style>
