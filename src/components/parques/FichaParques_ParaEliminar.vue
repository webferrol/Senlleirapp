<template>
    <div class="modal-stories">
        <article class="ficha-parques" v-for="(parque, index) in storeParques.parques">
            <icono class="cerrar-ficha-parques" :icon="['fa', 'xmark']" @click="$emit('cerrarFicha')"></icono>
            <h2>{{ parque.nombre }}</h2>
            <CarruselImagenesVue :images="imgs"></CarruselImagenesVue>

            <div class="caracteristicas-parque">

                <span>
                    <p>{{ parque.localizacion }}</p>
                </span>
                <span>
                    <h3>Superficie</h3>
                    <p>{{ parque.superficie }} m2</p>
                </span>
                <span>
                    <h3>tipología</h3>
                    <p>{{ parque.tipoloxia }}</p>
                </span>
                <span>
                    <h3>Cronología</h3>
                    <p>{{ parque.cronoloxía }}</p>
                </span>
            </div>

            <span class="descripcion">
                <h3>Descripcion</h3>
                <p>{{ parque.descripcion }}</p>
            </span>

        </article>
    </div>
</template>

<script setup>
import "@/assets/css/ficha-stories.css"
import { ref } from "vue";
import { useStoreParques } from "@/stores/parques";
import CarruselImagenesVue from "../CarruselImagenes.vue";

const error = ref("");
const ruta = ref([]);

const storeParques = useStoreParques();
storeParques.setParques();

const imgs = [
    './senlleiras_1.jpg',
    './senlleiras_2.jpg',
    './senlleiras_5.jpg',
    './senlleiras_10.jpg',
];

</script>
