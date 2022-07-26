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
        <h2 class="h2-ficha-tecnica">Descrición</h2>
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
      <!-- Se elimino router link con el listado de arboles -->
      <ul class="list-parque-arbol" v-if="parque?.especies">
        <li class="component-container" v-for="especie of parque.especies" :key="especie.idDoc">
         <router-link :to="{
          name:'FichaEspecie',
          params:{
            idDoc: especie.idDoc,
          }
         }">
          <span class="numero-mapa">{{especie.numero}}</span>{{especie.genero}} {{especie.especie}}
         </router-link>
          
        </li>
      </ul>

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

<style scoped>
.mapa-global{
  padding: 15px;
}

.mapas {
  display: grid;
  margin-top: 20px;
  /* grid-template-columns: repeat(auto-fit,minmax(400px,1fr)); */
}

.mapas img {
  width: 100%;
}

.list-parque-arbol{
  width: 100%;
  display: grid;
  gap: .25rem;
  padding: .5rem;
}
  a{
    width: inherit;
    gap: .25rem;
    text-decoration: none;
    color: var(--coloroscuro);
    display: grid;
    align-items: center;
    grid-template-columns: 22px 1fr;
    /* overflow: hidden; */
    white-space: nowrap;
    text-overflow: ellipsis;
  }
 
.numero-mapa {
  color: var(--colorclaro);
  background-color: var(--colorprincipal);
  font-weight: 600;
  border-radius: 50%;
  font-size: .9rem;
  padding: .2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
}

.texto-arbol {
  color: black;
  display: flex;
  align-items: center;
}
@media screen and (min-width: 440px) {
  .list-parque-arbol{
    grid-template-columns: auto auto;
  }
  .list-parque-arbol li{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
@media screen  and (min-width:700px){
  .list-parque-arbol{
    padding: .25rem 1rem;
  }
}


</style>
