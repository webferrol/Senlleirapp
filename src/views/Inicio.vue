<template>
    <div class="home">
    <CarruselStoriesVue></CarruselStoriesVue>
    <!-- Carrusel de fotos -->
        <CarruselImagenesVue minHeight="350px" :images="imgs"></CarruselImagenesVue>
        <ParticipaVue></ParticipaVue>
    <!-- Galeria de contenido -->
    <pre>
        <!-- {{senlleiros}} -->
    </pre>
    <GaleriaVue></GaleriaVue>
    </div>
</template>

<script setup>
import CarruselStoriesVue from '@/components/parques/CarruselStories.vue';
import CarruselImagenesVue from '../components/CarruselImagenes.vue';
import { useRouter } from 'vue-router';
import GaleriaVue from '../components/galeria/Galeria.vue';
import { ref } from 'vue';

import { getDocumenstWhere } from '../hook/firestore.hook';
import ParticipaVue from '../components/componentesGenerales/Participa.vue';

const senlleiros = ref([]);

const router = useRouter();

const imgs =[
    './senlleiras_1.jpg',
   './senlleiras_2.jpg',
    './senlleiras_5.jpg',
    './senlleiras_10.jpg',
];

(async()=>{
    try {
        senlleiros.value = await getDocumenstWhere('Arbores','senlleira',true,'nombre_arbol');
    } catch (error) {
        console.log('------------>',error)
    }
    
})()

</script>

