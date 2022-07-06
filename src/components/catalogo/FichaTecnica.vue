<template>
    <div class="container-ficha-tecnica">
        <article class="ficha-tecnica">
        <CarruselImagenesVue :images="images"></CarruselImagenesVue>
            <span class="head-ficha-tecnica">
                <icono class="cerrar-ficha-tecnica" :icon="['fa', 'xmark']" @click="$emit('cerrarFicha')"></icono>
                <slot name="titulo"></slot>
            </span>
            
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
