<template>
    <div class="container-ficha-tecnica">
        <article class="ficha-tecnica">
            <div class="cabecera-ficha-tecnica">
                <!-- TITULO -->
                <h2 class="ficha-tittle">{{ parque.nombre }}</h2>
                <icono class="cerrar-ficha-tecnica" :icon="['fa', 'xmark']" @click="handleClose"></icono>
            </div>
            <CarruselImagenesVue :images="images"></CarruselImagenesVue>
            <!-- CARACTERISTICAS -->
            <div>
                <hr class="line-ficha-tecnica">
                <h2 class="h2-ficha-tecnica">Características</h2>
                
            </div>
            
                <div class="caracteristicas-ficha-tecnica">
                    <div>
                        <span class="subtitle-caracteristica">
                            <icono :icon="['fa', 'leaf']"></icono>
                            <h3>Tipoloxía</h3>
                        </span>
                        <p>{{ parque.tipoloxia }}</p>
                    </div>
                    <div>
                        <span class="subtitle-caracteristica">
                        <icono :icon="['fa', 'location-dot']"></icono>
                            <h3>Localización</h3>
                        </span>
                        <p>{{ parque.localizacion }}</p>
                    </div>
                    <div>
                        <span class="subtitle-caracteristica">
                        <icono :icon="['fa', 'arrows-left-right']"></icono>
                            <h3>Superficie</h3>
                        </span>

                        
                        <p>{{ parque.superficie }} metros cadrados</p>
                    </div>
                    <div>
                        <span class="subtitle-caracteristica">
                        <icono :icon="['fa', 'calendar-days']"></icono>
                            <h3>Cronoloxía</h3>
                        </span>
                        <p>{{ parque.cronoloxia }}</p>
                    </div>
                </div>
           
            <!-- DESCRIPCION -->
            <div>
                <hr class="line-ficha-tecnica">
                <h2 class="h2-ficha-tecnica">Descripción</h2>
                
            </div>
           
                <div class="descripcion-ficha-tecnica">
                    <p>{{ parque.descripcion }}</p>
                </div>
            
            <!-- MAPA -->
            <div>
                <hr class="line-ficha-tecnica">
                <h2 class="h2-ficha-tecnica">Localización</h2>
            </div>
            <TheGeolocation :icon="'../src/assets/parques.png'" :lat="parque.lat" :lng="parque.lng" />

        </article>
    </div>
</template>
<script setup>
//import CarruselImagenesVue from '../CarruselImagenes.vue';
import TheGeolocation from "@/components/TheGeolocation.vue"
import CarruselImagenesVue from '@/components/CarruselImagenes.vue';
import "@/assets/css/catalogo/ficha-tecnica.css";

const props = defineProps({

    images: {
        type: Array,
        default: []
    },

    parque: {
        type: Object,
    }

});

const handleClose = () => {
    window.history.back();
}
</script>
