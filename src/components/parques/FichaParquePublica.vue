<template>
    <div v-if="mostrarFicha">
        <h1>Ficha Técnica</h1>
        <FichaTecnicaVue @cerrarFicha="mostrarFicha = false" :data="fichaDatos" :images="imagenesFichaTecnica">
            <template #titulo>
                <h2 class="ficha-tittle">{{ fichaDatos.nombre }}</h2>
            </template>
            <template #content>
                <div class="caracteristicas-ficha-tecnica">
                    <div>
                        <span class="subtitle-caracteristica">
                            <icono :icon="['fa', 'leaf']"></icono>
                            <h3>Tipoloxía</h3>
                        </span>
                        <p>{{ fichaDatos.tipoloxia }}</p>
                    </div>
                    <div>
                        <span class="subtitle-caracteristica">
                        <icono :icon="['fa', 'location-dot']"></icono>
                            <h3>Localización</h3>
                        </span>
                        <p>{{ fichaDatos.localizacion }}</p>
                    </div>
                    <div>
                        <span class="subtitle-caracteristica">
                        <icono :icon="['fa', 'arrows-left-right']"></icono>
                            <h3>Superficie</h3>
                        </span>
                        <p>{{ fichaDatos.superficie }} metros cadrados</p>
                    </div>
                    <div>
                        <span class="subtitle-caracteristica">
                        <icono :icon="['fa', 'calendar-days']"></icono>
                            <h3>Cronoloxía</h3>
                        </span>
                        <p>{{ fichaDatos.cronoloxia }}</p>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="descripcion-ficha-tecnica">
                    <p>{{ fichaDatos.descripcion }}</p>
                </div>
            </template>
        </FichaTecnicaVue>
    </div>
</template>

<script setup>
import FichaTecnicaVue from "@/components/catalogo/FichaTecnica.vue";
defineProps({
    fichaDatos: {
        type: Object
    },
    imagenesFichaTecnica: {
        type: Array
    },
    mostrarFicha: {
        type: Boolean,
        default: false,
    }

});
</script>