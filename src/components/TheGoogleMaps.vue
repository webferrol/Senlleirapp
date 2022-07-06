<template>
  <nav class="nav-mapa">
    <router-link to="/mapaSenlleiras">Senlleiras</router-link>
    <router-link to="/mapaParques">Parques</router-link>
    </nav>
  <div :data-set="data" ref="mapDiv" style="width: 100%; height: calc(100vh - 91px)"></div>
</template>

<script setup>
//Dependendencias
import { Loader } from "@googlemaps/js-api-loader";
import { ref } from "vue";
import "../assets/css/mapa/google-maps.css"
const props = defineProps({
  /**
   * {Number} zoom - Zoom que tendrá por defecto el mapa de google
   */
  zoom: {
    type: Number,
    default: 17,
  },
  coords: {
    type: Array,
  },
  /**
   * {Object} CurrPos - Punto central  definido por una latitud y una longitud  en la que aparecerán todos los marcadores del mapas
   * @default {lat: 42.8775066,lng: -8.5489188}
   */
  currPos: {
    type: Object,
    default: () => ({ lat: 42.8775066, lng: -8.5489188 }),
  },
  icon: {
    type: String,
    default: "src/assets/arbol.png",
  },
  apikey: {
    type: String,
    default: "AIzaSyDJUNfgGrajFUqtFZBX6WoX3gTRVavpzpE",
  },
});

//Objeto instanciado de google.maps.Map
let map = null;
const mapDiv = ref(null);
const data = null;

// -> Cargamos el loader para llamara la apiKey <- //
const loader = new Loader({ apiKey: props.apikey });

/**
 * Función asíncrona que lanza el loader y recorre las coordenadas de parques y arbores .js.
 */
(async () => {
  try {
    if (!loader.loading) await loader.load();
    //console.log(loader.loading)
    map = new google.maps.Map(mapDiv.value, {
      center: props.currPos,
      zoom: props.zoom,
    });

    // -> Bucle para recorrer y pintar los parques <- //
    props.coords.forEach((item) => {
      new google.maps.Marker({
        map,
        position: item,
        icon: props.icon,
        animation: google.maps.Animation.DROP,
      });
    });
  } catch (error) {
    //console.log(error);
  }
})();
</script>
