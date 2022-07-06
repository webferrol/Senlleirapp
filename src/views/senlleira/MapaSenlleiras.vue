<template>
  <div>
    <!-- <h1 v-for="(coordenadas, index) in useParques.parques">{{ coordenadas.lat }} - {{coordenadas.lng}}</h1> -->
  </div>
  <div :data-set="data" ref="mapDiv" style="width: 100%; height: 95vh"></div>
</template>

<script setup>
//Dependendencias
import { Loader } from "@googlemaps/js-api-loader";
import { ref } from "vue";
import { useStoreParques } from "../../stores/parques";
import { useStoreArbores } from "../../stores/arbores";

const useParques = useStoreParques();
const useArbol = useStoreArbores();

const coordsParques = ref([]);
const coordsSingulares = ref([]);

const props = defineProps({
  /**
   * {Number} zoom - Zoom que tendrá por defecto el mapa de google
   */
  zoom: {
    type: Number,
    default: 17,
  },
  /**
   * {Object} CurrPos - Punto central  definido por una latitud y una longitud  en la que aparecerán todos los marcadores del mapas
   * @default {lat: 42.8775066,lng: -8.5489188}
   */
  currPos: {
    type: Object,
    default: () => ({ lat: 42.8775066, lng: -8.5489188 }),
  },
});

//Objeto instanciado de google.maps.Map
const apikey = "AIzaSyDJUNfgGrajFUqtFZBX6WoX3gTRVavpzpE";
let map = null;
const mapDiv = ref(null);
const data = null;
// let markers = [];

// -> Coordenadas <- //
// let puntos = [
//   { lat: 42.8805962, lng: -8.5446412 },
//   { lat: 42.86116699999999, lng: -8.552389 },
// ];

// -> Iconos marcadores <- //
const arbol = "src/assets/arbol.png";
const parque = "src/assets/parque.png";

// -> Cargamos el loader para llamara la apiKey <- //
const loader = new Loader({ apiKey: apikey.value });



/**
 * Función asíncrona que lanza el loader y recorre las coordenadas de parques y arbores .js.
 */
(async () => {
  try {
    await useParques.setParques();
    for (let i = 0; i < useParques.parques.length; i++) {
      coordsParques.value.push({
        lat: useParques.parques[i].lat,
        lng: useParques.parques[i].lng,
      });
    }
    for (let i = 0; i < useArbol.arbores.length; i++) {
      coordsSingulares.value.push({
        lat: useArbol.arbores[i].lat,
        lng: useArbol.arbores[i].lng,
      });
    }

    if (!loader.loading) await loader.load();
    //console.log(loader.loading)
    map = new google.maps.Map(mapDiv.value, {
      center: props.currPos,
      zoom: props.zoom,
    });

    // -> Bucle para recorrer y pintar los parques <- //
    coordsParques.value.forEach((item) => {
      new google.maps.Marker({
        map,
        position: item,
        icon: parque,
        animation: google.maps.Animation.DROP,
      });
    });

    // -> Bucle para recorrer y pintar los arboles singulares <- //
    coordsSingulares.value.forEach((item) => {
      new google.maps.Marker({
        map,
        position: item,
        icon: arbol,
        animation: google.maps.Animation.DROP,
      });
    });



  } catch (error) {
    //console.log(error);
  }
})();
</script>
