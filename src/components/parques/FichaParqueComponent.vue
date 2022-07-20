<template>

  <div v-if="images.length" class="container-ficha-tecnica">
    <article class="ficha-tecnica">
      <div class="cabecera-ficha-tecnica">
        <!-- TITULO -->
        <h2 class="ficha-tittle">{{ parque.nombre }}</h2>
        <icono class="cerrar-ficha-tecnica" :icon="['fa', 'xmark']" @click="handleClose"></icono>
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
      <div class="mapa-global">
        <TheLeafletComponent
          v-if="parque.lat"
          icon-url="../parques.png"
          :location="location"
          :centrado="[parque.lat, parque.lng]"
        />
      </div>

      <!-- LISTADO DE ÁRBOLES -->
      <div>
        <hr class="line-ficha-tecnica" />
        <h2 class="h2-ficha-tecnica">Listado de árbores en parques</h2>
      </div>

      <div class="component-container">
        <router-link
          v-for="arbore in arbores"
          :key="arbore.idDoc"
          :to="{ name: 'FichaSenlleira', params: { idDoc: arbore.idDoc } }"
        >
           <span class="numero-mapa" v-if="arbore?.numero_mapa>0" >
            {{arbore?.numero_mapa}}</span>
          <span class="texto-arbol"
            >{{ arbore?.nombre_comun_gal }} (Especie: {{ arbore?.genero }}
            {{ arbore?.especie }} )</span
          >
        </router-link>
      </div>

      <div class="mapas">
        <img v-for="mapa in mapas" :key="mapa" :src="mapa" :alt="mapa">
      </div>

    </article>
  </div>
  <SkeletonFichaTecnicaVue v-else></SkeletonFichaTecnicaVue>


</template>
<script setup>
import { computed } from "vue";
import TheLeafletComponent from "../admin/TheLeafletComponent.vue";
import CarruselImagenesVue from "@/components/CarruselImagenes.vue";
import "@/assets/css/catalogo/ficha-tecnica.css";
import SkeletonFichaTecnicaVue from '../skeleton/SkeletonFichaTecnica.vue';

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

const location = computed(() => [
  {
    tooltip: props.parque.nombre,
    route: false,
    latLong: [props.parque.lat, props.parque.lng],
  },
]);

const handleClose = () => {
  window.history.back();
};
</script>

<style scoped lang="scss">
.mapa-global{
  padding: 15px;
}

.mapas {
  display: grid;
  /* grid-template-columns: repeat(auto-fit,minmax(400px,1fr)); */
}

.mapas img {
  width: 100%;
}

.component-container {
  padding: 0.5rem;
  background-color: bisque;
  margin-top: 10px;
  a {
    text-decoration: none;
    display: block;
    display: flex;
    gap: .5em;
  }
}
.component-element {
 
  margin-bottom: 3px;
}

.numero-mapa {
  color: white;
  background-color: black;
  border-radius: 50%;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1em;
  height: 1em;
}

.texto-arbol {
  color: black;
  display: flex;
  align-items: center;
}
</style>
