<template>
  <div>
    <h1>Mapas</h1>
    <div>
        <strong>Start: </strong>
        <select id="start" onchange="calcRoute()">
          <option value="chicago, il">Chicago</option>
          <option value="st louis, mo">St Louis</option>
          <option value="joplin, mo">Joplin, MO</option>
          <option value="oklahoma city, ok">Oklahoma City</option>
          <option value="amarillo, tx">Amarillo</option>
          <option value="gallup, nm">Gallup, NM</option>
          <option value="flagstaff, az">Flagstaff, AZ</option>
          <option value="winona, az">Winona</option>
          <option value="kingman, az">Kingman</option>
          <option value="barstow, ca">Barstow</option>
          <option value="san bernardino, ca">San Bernardino</option>
          <option value="los angeles, ca">Los Angeles</option>
        </select>
        <strong>End: </strong>
        <select id="end" onchange="calcRoute()">
          <option value="chicago, il">Chicago</option>
          <option value="st louis, mo">St Louis</option>
          <option value="joplin, mo">Joplin, MO</option>
          <option value="oklahoma city, ok">Oklahoma City</option>
          <option value="amarillo, tx">Amarillo</option>
          <option value="gallup, nm">Gallup, NM</option>
          <option value="flagstaff, az">Flagstaff, AZ</option>
          <option value="winona, az">Winona</option>
          <option value="kingman, az">Kingman</option>
          <option value="barstow, ca">Barstow</option>
          <option value="san bernardino, ca">San Bernardino</option>
          <option value="los angeles, ca">Los Angeles</option>
        </select>
      </div>
    <div id="map" style="width: 95%; height: 80vh">
      
    </div>
  </div>
</template>

<script setup>
// -> Impotacion del loader e instalacion de npm googlemaps <- //
import { Loader } from "@googlemaps/js-api-loader";

// -> Loader que carga la ApiKey de Google <- //
const loader = new Loader({
  apiKey: "AIzaSyDJUNfgGrajFUqtFZBX6WoX3gTRVavpzpE",

  zoom: {
    type: Number,
    default: 17,
  },
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
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    zoom: 7,
    center: chicago,
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsRenderer.setMap(map);
};

function calcRoute() {
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var request = {
    origin: start,
    destination: end,
    travelMode: "DRIVING",
  };
  directionsService.route(request, function (result, status) {
    if (status == "OK") {
      directionsRenderer.setDirections(result);
    }
  });
}

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
