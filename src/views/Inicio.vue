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
import CarruselStoriesVue from '../components/CarruselStories.vue';
import CarruselImagenesVue from '../components/CarruselImagenes.vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import GaleriaVue from '../components/galeria/Galeria.vue';

const router = useRouter();

const imgs = reactive([
    {
    url:'./senlleiras_1.jpg',
    text: 'Árbore sen flor, día sen sol.',
    clases: { 'carrusel-image': true, 'carruselmostrado': true },//El primero mostrado
    puntos: { 'posicionado': true },
    },
    {
        url: './senlleiras_2.jpg',
        text: 'De tal árbore, tal acha.',
        clases: { 'carrusel-image': true, 'carruselmostrado': false },
        puntos: { 'posicionado': false },
    },
    {
        url: './senlleiras_5.jpg',
        text: 'Árbore  trasplantado, ben regado.',
        clases: { 'carrusel-image': true, 'carruselmostrado': false },
        puntos: { 'posicionado': false },
    },
    {
        url: './senlleiras_10.jpg',
        text: 'Quen ten árbore, ten paxaros.',
        clases: { 'carrusel-image': true, 'carruselmostrado': false },
        puntos: { 'posicionado': false },
    }
]);

//Router para la galería. Al hacer click entrar en el catálogo
const catalogoGo = () => {
    router.push({
        name: 'CatalogoSenlleira',
      })
}
</script>

