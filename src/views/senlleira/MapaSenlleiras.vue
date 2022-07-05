<template>
  <div :data-set="data" ref="mapDiv" style="width: 100%; height: 95vh"></div>
</template>

<script setup>
//Dependendencias
import { Loader } from "@googlemaps/js-api-loader";
import { computed, ref, reactive } from "vue";
import { useRouter } from "vue-router";

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
let puntos = [
  { lat: 42.8805962, lng: -8.5446412 },
  { lat: 42.86116699999999, lng: -8.552389 },
];

// -> Icono del marcador <- //
const image = "src/assets/prueba.png";

// -> Cargamos el loader para llamara la apiKey <- //
const loader = new Loader({ apiKey: apikey.value });

// -> Pintamos/cargamos el mapa de google en la vista <- //

/**
 * @description Nos permite enrutar la senlleira hacia su ficha
 * @param {String} id - Código da árbore senlleira
 */
// const showRoute = (id) => {
//   if (id) {
//     router.push({
//       path: "/arb-:id",
//       name: "Senlleira",
//       params: {
//         id: id,
//       },
//     });
//   }
// };

/**
 * Limpiamos marcadores de google maps
 */
// const limpiar = () => {
//   for (let i = 0, tam = markers.length; i < tam; i++) {
//     markers[i].setMap(null);
//   }
//   markers = [];
// };

/**
 * Función asíncrona que lanza el lodader
 */
(async () => {
  try {
    if (!loader.loading) await loader.load();
    //console.log(loader.loading)
    map = new google.maps.Map(mapDiv.value, {
      center: props.currPos,
      zoom: props.zoom,
      
    });

    puntos.forEach((item) => {
      new google.maps.Marker({
        map,
        position: item,
        icon: image,
        animation: google.maps.Animation.DROP
        // streetViewService: true
      });
    });
  } catch (error) {
    //console.log(error);
  }
})();

// const pintar = async () => {
//   console.log(loader.loading)
//   await loader.load();
//   new google.maps.Marker({
//     map,
//     position: catedral,
//   });
//     new google.maps.Marker({
//       map,
//       position: conxo,
//     });
// };
</script>
