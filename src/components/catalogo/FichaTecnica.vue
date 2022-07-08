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
            <CarruselImagenesVue :images="images"></CarruselImagenesVue>
            <!-- CARACTERISTICAS -->
            <div>
                <hr class="line-ficha-tecnica">
                <h2 class="h2-ficha-tecnica">Características</h2>
                
            </div>
            <slot name="content">
                <!-- Contenido -->
            </slot>
            <!-- DESCRIPCION -->
            <div>
                <hr class="line-ficha-tecnica">
                <h2 class="h2-ficha-tecnica">Descripción</h2>
                
            </div>
            <slot name="footer">
                <!-- contenido -->
            </slot>
            <!-- MAPA -->
            <div>
                <hr class="line-ficha-tecnica">
                <h2 class="h2-ficha-tecnica">Localización</h2>
            </div>
            <slot name="mapa"></slot>

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
