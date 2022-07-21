<template>
  <div class="container-ficha-tecnica">
    <article class="ficha-tecnica">
      <div class="cabecera-ficha-tecnica">
        <!-- TITULO -->
        <h2 class="ficha-tittle">{{ senlleira.nombre_arbol }}</h2>
        <icono class="cerrar-ficha-tecnica" :icon="['fa', 'xmark']" @click="handleClose"></icono>
      </div>
      <CarruselImagenesVue v-if="images.length >= 1" :images="images">
      </CarruselImagenesVue>
      <div>

        <h2 class="h2-ficha-tecnica">Características</h2>
      </div>
      <!-- CARACTERISTICAS -->
      <div class="caracteristicas-ficha-tecnica">
        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'leaf']"></icono>
            <h4>Especie</h4>
          </span>
          <p>{{ senlleira.genero }} {{ senlleira.especie }}</p>
        </div>
         <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'signature']"></icono>
            <h4>Nome galego</h4>
          </span>
          <p>{{ senlleira.nombre_comun_gal }}</p>
        </div>
        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'signature']"></icono>
            <h4>Nome castelán</h4>
          </span>
          <p>{{ senlleira.nombre_comun }}</p>
        </div>
       
        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'up-long']"></icono>
            <h4>Altura</h4>
          </span>
          <p>{{ senlleira.altura }} metros</p>
        </div>

        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'arrows-left-right']"></icono>
            <h3>Perímetro</h3>
          </span>
          <p>{{ senlleira.diametro }} metros</p>
        </div>
      </div>
      <!-- DESCRIPCION -->
      <div>
        <hr class="line-ficha-tecnica" />
        <h2 class="h2-ficha-tecnica">Descrición</h2>
      </div>
      <div class="descripcion-ficha-tecnica">
        <p>{{ senlleira.descripcion }}</p>
      </div>

      <!-- MAPA -->
      <div>
        <hr class="line-ficha-tecnica" />
        <h2 class="h2-ficha-tecnica">Localización</h2>
      </div>
      <div class="mapa-global">
        <TheLeafletComponent
        v-if="senlleira?.lat && senlleira?.lng"
        icon-url="../arbolito.png"
        :location="location"
        :centrado="[Number(senlleira?.lat), Number(senlleira?.lng)]" />
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed } from "vue";
import TheLeafletComponent from "../admin/TheLeafletComponent.vue";
import CarruselImagenesVue from "../CarruselImagenes.vue";
import "@/assets/css/catalogo/ficha-tecnica.css";

const props = defineProps({
  images: {
    type: Array,
    default: [],
  },
  senlleira: {
    type: Object,
  },
});

const location = computed(() => [
  {
    tooltip: props.senlleira.nombre_comun,
    route: false,
    latLong: [Number(props.senlleira.lat), Number(props.senlleira.lng)],
  }
]);



const handleClose = () => {
  window.history.back();
};
</script>

