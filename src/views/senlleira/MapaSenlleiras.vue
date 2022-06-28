<template>
  <div>
    <h1>Mapas</h1>
    <div id="map" style="width: 95%; height: 80vh"></div>
  </div>
</template>

<script setup>
// -> Impotacion del loader e instalacion de npm googlemaps <- //
import {Loader} from '@googlemaps/js-api-loader';

// -> Loader que carga la ApiKey de Google <- //
const loader = new Loader({
  apiKey: "AIzaSyDJUNfgGrajFUqtFZBX6WoX3gTRVavpzpE",
  
  zoom: {
    type: Number,
    default: 17
  }
});

// -> Array para almacenar las marcas <- //
let marcadores = [];

// -> Icono del marcador <- //
const imagen = "src/assets/prueba.png";

// -> Funcion que lanza el mapa y marcas <- //
const pintar = async () => {
  if (!loader.loading) await loader.load();
  marcadores.push(
    new google.maps.Marker({
      position: {
        lat: 42.8775066,
        lng: -8.5489188,
      },
      map,
      animation: google.maps.Animation.DROP,
      icon: imagen,
    })
  );
};

// -> Funcion que lanza el cargador del mapa "loader.load()" <- //
(async () => {
  try {
    if (!loader.loading) await loader.load();
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 42.8775066, lng: -8.5489188 },
      zoom: 18,
    });
    await pintar();
  } catch (error) {
    console.log(error);
  }
})();
</script>
