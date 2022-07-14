<template>

  <div class="container-ficha-tecnica">
    <article class="ficha-tecnica">
      <div class="cabecera-ficha-tecnica">
        <!-- TITULO -->
        <h2 class="ficha-tittle">{{ parque.nombre }}</h2>
        <icono
          class="cerrar-ficha-tecnica"
          :icon="['fa', 'xmark']"
          @click="handleClose"
        ></icono>
      </div>
      <CarruselImagenesVue :images="images"></CarruselImagenesVue>
      <!-- CARACTERISTICAS -->
      <div>
        <hr class="line-ficha-tecnica" />
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
        <hr class="line-ficha-tecnica" />
        <h2 class="h2-ficha-tecnica">Descripción</h2>
      </div>

      <div class="descripcion-ficha-tecnica">
        <p>{{ parque.descripcion }}</p>
      </div>

      <!-- MAPA -->
      <div>
        <hr class="line-ficha-tecnica" />
        <h2 class="h2-ficha-tecnica">Localización</h2>
      </div>
      <TheGeolocation
        v-if="parque.lat"
        :icon="'../src/assets/parques.png'"        
        :lat="parque.lat"
        :lng="parque.lng"
      />

      <!-- IMAGEN DEL MAPA DEL PARQUE -->

    

      <!-- LISTADO DE ÁRBOLES -->

      <div class="mapas">
       
        <img v-for="mapa in mapas" :key="mapa" :src="mapa" :alt="mapa">
        
        
        <ul>
            <li v-for="arbore in arbores" :key="arbore.idDoc">
            <router-link class="enlaces"  :to = "{ name: 'FichaSenlleira', params:{idDoc:arbore.idDoc} }">
          {{(arbore?.numero_mapa>0)? arbore?.numero_mapa:''}} {{arbore?.nombre_comun_gal}} (Especie:  {{arbore?.genero}} {{arbore?.especie}} )
            </router-link>
            </li>
        </ul>
        
      
      </div>
    </article>
  </div>
</template>
<script setup>
//import CarruselImagenesVue from '../CarruselImagenes.vue';
import TheGeolocation from "@/components/TheGeolocation.vue";
import CarruselImagenesVue from "@/components/CarruselImagenes.vue";
import "@/assets/css/catalogo/ficha-tecnica.css";

const props = defineProps({
  images: {
    type: Array,
    default: [],
  },

  parque: {
    type: Object,
  },

  arbores: {
    type: Array,
    default: [],
  },
  mapas: {
    type: Array,
    default: [],
  },
});

const handleClose = () => {
  window.history.back();
};


</script>

<style>
.mapas{
    display: grid;
    /* grid-template-columns: repeat(auto-fit,minmax(400px,1fr)); */
}

.mapas img{
    width: 100%;
}

.enlaces{
  color: black;
  text-decoration: none;
}

</style>
