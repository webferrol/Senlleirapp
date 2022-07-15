<template>
    <div class="container-ficha-tecnica">
        <article class="ficha-tecnica">
            <div class="cabecera-ficha-tecnica">
                <!-- TITULO -->
                <slot name="titulo">
                    <!-- contenido -->
                </slot>
                <icono class="cerrar-ficha-tecnica" :icon="['fa', 'xmark']" @click="$emit('cerrarFicha')"></icono>
            </div>
            <CarruselImagenesVue v-if="images.length >=1" :images="images"></CarruselImagenesVue>
            <!-- CARACTERISTICAS -->
            <div>
                
            </div>
            <slot name="content">
                <!-- Contenido -->
            </slot>
            <!-- DESCRIPCION -->
            <div>
                <hr class="line-ficha-tecnica">         
            </div>
            <slot name="footer">
                <!-- contenido -->
            </slot>
            <!-- MAPA -->
            <div>
                <hr class="line-ficha-tecnica">
            </div>
            <slot name="mapa"></slot>
            <slot name="usos"></slot>

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

</script>
