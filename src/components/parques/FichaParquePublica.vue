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
        <div class="datos-especie">
          <span>
            <h3>Tipoloxía</h3>
            <p>{{ fichaDatos.tipoloxia }}</p>
          </span>
          <span>
            <h3>Localizacion</h3>
            <p>{{ fichaDatos.localizacion }}</p>
          </span>
          <span>
            <h3>Superficie</h3>
            <p>{{ fichaDatos.superficie }} metros cadrados</p>
          </span>
          <span>
            <h3>Cronoloxía</h3>
            <p>{{ fichaDatos.cronoloxia }}</p>
          </span>
        </div>
      </template>
      <template #footer>
        <div class="descripcion">
          <h3>Descrición</h3>
          <p>{{ fichaDatos.descripcion }}</p>
        </div>
      </template>
      <template #mapa>
        <TheGeolocation :icon="'./src/assets/parques.png'" :lat="fichaDatos.lat" :lng="fichaDatos.lng" />
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
