<template>
    <div class="container-ficha-tecnica">
        <article class="ficha-tecnica">
            <div class="cabecera-ficha-tecnica">
                 <slot name="titulo"></slot>
                <icono class="cerrar-ficha-tecnica" :icon="['fa', 'xmark']" @click="$emit('cerrarFicha')"></icono>
            </div>
            <CarruselImagenesVue :images="images"></CarruselImagenesVue>
            <hr class="line-ficha-tecnica">
            <h2 class="h2-ficha-tecnica">Características</h2>
            <hr class="line-ficha-tecnica">
            <!-- <CarruselTemplate :imagenes="images"></CarruselTemplate> -->
            <slot name="content">
            </slot>
            <slot name="footer">
               
     
            </slot>

        </article>
    </div>

</template>

<script setup>
import CarruselImagenesVue from '../CarruselImagenes.vue';
import "@/assets/css/catalogo/ficha-tecnica.css";
import CarruselTemplate from '../CarruselTemplate.vue';

const props = defineProps({

    images: {
        type: Array,
        default: []
    },

    data: {
        type: Object,
    }

});

//props.title

</script>
