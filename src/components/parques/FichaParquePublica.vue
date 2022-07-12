<template>
  <div v-if="mostrarFicha">
    <h1>Ficha Técnica</h1>
    <FichaTecnicaVue
      @cerrarFicha="mostrarFicha = false"
      :data="fichaDatos"
      :images="imagenesFichaTecnica"
    >
       <template #titulo>
                <h2 class="ficha-tittle">{{ fichaDatos.nombre }}</h2>
            </template>
            <template #content>
                <div class="caracteristicas-ficha-tecnica">
                <h3>Características</h3>
                    <div>
                        <span class="subtitle-caracteristica">
                            <icono :icon="['fa', 'leaf']"></icono>
                            <h4>Tipoloxía</h4>
                        </span>
                        <p>{{ fichaDatos.tipoloxia }}</p>
                    </div>
                    <div>
                        <span class="subtitle-caracteristica">
                        <icono :icon="['fa', 'location-dot']"></icono>
                            <h4>Localización</h4>
                        </span>
                        <p>{{ fichaDatos.localizacion }}</p>
                    </div>
                    <div>
                        <span class="subtitle-caracteristica">
                        <icono :icon="['fa', 'arrows-left-right']"></icono>
                            <h4>Superficie</h4>
                        </span>
                        <p>{{ fichaDatos.superficie }} metros cadrados</p>
                    </div>
                    <div>
                        <span class="subtitle-caracteristica">
                        <icono :icon="['fa', 'calendar-days']"></icono>
                            <h4>Cronoloxía</h4>
                        </span>
                        <p>{{ fichaDatos.cronoloxia }}</p>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="descripcion-ficha-tecnica">
                <h3>Descripción</h3>
                    <p>{{ fichaDatos.descripcion }}</p>
                </div>
            </template>
      <template #mapa>
        <div class="descripcion-ficha-tecnica">
        <h3>Localización</h3>
          <TheGeolocation :icon="'../src/assets/parques.png'" :lat="fichaDatos.lat" :lng="fichaDatos.lng" />
        </div>
      </template>
    </FichaTecnicaVue>
  </div>
</template>

<script setup>
import FichaTecnicaVue from "@/components/catalogo/FichaTecnica.vue";
import TheGeolocation from "@/components/TheGeolocation.vue"
defineProps({
  fichaDatos: {
    type: Object,
  },
  imagenesFichaTecnica: {
    type: Array,
  },
  mostrarFicha: {
    type: Boolean,
    default: false,
  },
});
</script>
