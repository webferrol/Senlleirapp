<template>
    <div class="home">
    <NoticiaCarballoVue></NoticiaCarballoVue>
    <ExploraVue></ExploraVue>
    <ParticipaVue></ParticipaVue>
    <CarruselStoriesVue></CarruselStoriesVue>
    
    <!-- Carrusel de fotos -->
        <CarruselImagenesVue minHeight="350px" :images="imgs"></CarruselImagenesVue>
    <!-- Galeria de contenido -->
    <GaleriaVue v-if="senlleiros.length" :images="senlleiros"></GaleriaVue>
    </div>
</template>

<script setup>
import CarruselStoriesVue from '@/components/parques/CarruselStories.vue';
import CarruselImagenesVue from '../components/CarruselImagenes.vue';
import { useRouter } from 'vue-router';
import GaleriaVue from '../components/galeria/Galeria.vue';
import { ref } from 'vue';

import { getDocumentsWhere } from '../hook/firestore.hook';
import ParticipaVue from '../components/componentesGenerales/Participa.vue';
import ExploraVue from '../components/componentesGenerales/Explora.vue';
import NoticiaCarballoVue from '../components/componentesGenerales/NoticiaCarballo.vue';


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
        senlleiros.value = await getDocumentsWhere('Arbores','propuesta_senlleira',true,'nombre_arbol');

        // LINEAS TEMPORALES QUE SE BORRARÁN DESPUÉS DE LA PRESENTACIÓN
        const tam = senlleiros.value.length;
        const tmp = [];
        for(let i = 0; i<18;i++){
            tmp.push(senlleiros.value[Math.floor(Math.random()*tam)]);
        }
        senlleiros.value = tmp;
        // FINAL DE LINEAS TEMPORALES QUE SE BORRARÁN DESPUÉS DE LA PRESENTACIÓN


        senlleiros.value = senlleiros.value.map(sen=>{ //Mapeo para añadir un campo a la senlleira
            sen.urlFicha = `/ficha-tecnica/${sen.idDoc}`;
            return sen;
        })

    } catch (error) {
        console.log('------------>',error)
    }
    
})()

</script>

