<template>
    <div class="home">
    <CarruselStoriesVue></CarruselStoriesVue>
    <!-- Carrusel de fotos -->
        <CarruselImagenesVue minHeight="350px" :images="imgs"></CarruselImagenesVue>
    <!-- Galeria de contenido -->
    <GaleriaVue></GaleriaVue>
    </div>
</template>

<script setup>
import CarruselStoriesVue from '@/components/parques/CarruselStories.vue';
import CarruselImagenesVue from '../components/CarruselImagenes.vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import GaleriaVue from '../components/galeria/Galeria.vue';

const router = useRouter();

const imgs =[
    './senlleiras_1.jpg',
   './senlleiras_2.jpg',
    './senlleiras_5.jpg',
    './senlleiras_10.jpg',
];

</script>

