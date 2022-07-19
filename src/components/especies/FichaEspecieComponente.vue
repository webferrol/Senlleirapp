<template>
  <div v-if="images.length" class="container-ficha-tecnica">
    <article class="ficha-tecnica">
      <div class="cabecera-ficha-tecnica">
        <!-- TITULO -->
        <h2 class="ficha-tittle">{{ especie.nombre_comun }}</h2>
        <icono
          class="cerrar-ficha-tecnica"
          :icon="['fa', 'xmark']"
          @click="handleClose"
        ></icono>
      </div>
      <CarruselImagenesVue :images="images"></CarruselImagenesVue>
      <!-- CARACTERISTICAS -->
      <div>
        <h2 class="h2-ficha-tecnica">Características</h2>
      </div>
      <div class="caracteristicas-ficha-tecnica">
        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'leaf']"></icono>
            <h4>Especie</h4>
          </span>
          <p>{{ especie.genero }} {{ especie.especie }}</p>
        </div>
        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'leaf']"></icono>
            <h4>Nombre</h4>
          </span>
          <p>{{ especie.nombre_comun }}</p>
        </div>
        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'leaf']"></icono>
            <h4>Nome Comun</h4>
          </span>
          <p>{{ especie.nombre_comun_gal }}</p>
        </div>
      </div>
      <!-- USOS -->
      <div>
        <hr class="line-ficha-tecnica" />
        <h2 class="h2-ficha-tecnica">USOS</h2>
      </div>

      <div class="descripcion-ficha-tecnica">
        <p>{{ especie.usos }}</p>
      </div>

      <!-- ORIXEN -->
      <div>
        <hr class="line-ficha-tecnica" />
        <h2 class="h2-ficha-tecnica">ORIXE</h2>
      </div>

      <div class="descripcion-ficha-tecnica">
        <p>{{ especie.origen_descripcion }}</p>
      </div>

      <!-- CURIOSIDADES -->

      <div>
        <hr class="line-ficha-tecnica" />
        <h2 class="h2-ficha-tecnica">CURIOSIDADES</h2>
      </div>

      <div class="descripcion-ficha-tecnica">
        <p>{{ especie.curiosidades }}</p>
      </div>
    </article>
  </div>
  <SkeletonFichaTecnicaVue v-else="images.lenght"></SkeletonFichaTecnicaVue>
</template>

<script setup >
import CarruselImagenesVue from "@/components/CarruselImagenes.vue";
import "@/assets/css/catalogo/ficha-tecnica.css";
import SkeletonFichaTecnicaVue from '../skeleton/SkeletonFichaTecnica.vue';

const props = defineProps({
     images: {
    type: Array,
    default: [],
  },

    especie: {
        type: Object,
    }

});

const handleClose = () => {
  window.history.back();
};


</script>

