<template>
    <div class="container-ficha-tecnica">
        <article class="ficha-tecnica">
            <span class="head-ficha-tecnica">
                <icono class="cerrar-ficha-tecnica" :icon="['fa', 'xmark']" @click="$emit('cerrarFicha')"></icono>
                <slot name="titulo"></slot>
            </span>
            <CarruselImagenesVue :images="images"></CarruselImagenesVue>
            
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
