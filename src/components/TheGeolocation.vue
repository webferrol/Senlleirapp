<template>
  <div>
    <form>
      <label for="lat" class="form-label">Latitude</label>
      <input
        class="input-senlleira"
        type="number"
        v-model.number="coords.lat"
        name="lat"
        id="lat"
        step="any"
        placeholder="Latitud"
      />
      <label for="lng" class="form-label">Lonxitude</label>
      <input
        class="input-senlleira"
        type="number"
        v-model.number="coords.lng"
        name="lng"
        id="lng"
        step="any"
        placeholder="Longitud"
      />
      <hr />
      <input type="button" @click="onClickGetCoords" value="Geolocalizacion" />

      <div
        v-if="geolocationPositionError"
        class="alert alert-danger m-3"
        role="alert"
      >
        Problema de Geolocalización. Compruebe la red o si su ubicación está
        activa.
      </div>
      <div
        v-else
        data-set="data"
        ref="mapDiv"
        style="margin: 0.5em 0; width: 100%; height: 50vh"
      ></div>

      <TheLoader :loading="loader"></TheLoader>
    </form>
  </div>
</template>

<script setup>
// -> Importaciones <- //
import { useStoreArbores } from "@/stores/arbores";
import { ref } from "vue";
import TheLoader from "@/components/TheLoader.vue";
import { Loader } from "@googlemaps/js-api-loader";

// -> Constantes/Variables <- //
const useArbore = useStoreArbores();
let errorStr = ref("");
let map = null;
let infoWindow, marker;
const mapDiv = ref(null);
const geolocationPositionError = ref(false);

const props = defineProps({
  coords: {
    type: Object,
    default: () => ({ lat: null, lng: null }),
  },
  apikey: {
    type: String,
    default: "AIzaSyDJUNfgGrajFUqtFZBX6WoX3gTRVavpzpE",
  },
});

// -> Loader para que el usuario sepa el tiempo de espera <- //
const loader = new Loader({ apiKey: props.apikey });

// -> Funcion que nos calcula la geolocalizacion actual <- //
const getCoords = async () => {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      maximumAge: 60000,
      timeout: 10000,
      enableHighAccuracy: true,
    });
  });

  return {
    lng: pos.coords.longitude,
    lat: pos.coords.latitude,
  };
};

// -> Obtenemos la geolocalizacion en los campos al hacer click <- //
const onClickGetCoords = async () => {
  errorStr.value = "";
  if (!window.navigator.geolocation) {
    errorStr.value = "La Geolocalización no está disponible";
    return;
  }
  try {
    loader.value = true;
    // -> Coordenadas actuales <- //
    let { lat, lng } = await getCoords();
    // -> Cargamos los valores del formulario <- //
    props.coords.lat = lat;
    props.coords.lng = lng;
  } catch (error) {
    errorStr.value = error.message;
  } finally {
    loader.value = false;
  }
};

//Función callback anónima y lanzada automáticamente
(async () => {
  try {
    // Inciamos loader de Google
    if (!loader.loading) await loader.load();
    // Coordenadas actuales
    let { lat, lng } = await getCoords();
    //Cargamos los valores del formulario
    props.coords.lat = lat;
    props.coords.lng = lng;
    //cargamos mapa y colocamos valores
    map = new google.maps.Map(mapDiv.value, {
      center: {
        lat: lat,
        lng: lng,
      },
      zoom: 12,
    });
    //Cargamos marcador
    marker = new google.maps.Marker({
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: {
        lat: lat,
        lng: lng,
      },
      icon: "src/assets/arbolito.png",
    });
    // Agregamos el listener para capturar el click y movimiento del marcador
    marker.addListener("click", function () {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
    // Capturamos cuando la posición del marcador cambie y realizamos la acción que se requiera
    google.maps.event.addListener(marker, "position_changed", function () {
      var lat = marker.getPosition().lat();
      var lng = marker.getPosition().lng();

      // console.log('Latitude: ' + lat);
      // console.log('Longitude: ' + lng);

      //Pintamos en el formulario
      props.coords.lat = lat;
      props.coords.lng = lng;
    });
    infoWindow = new google.maps.InfoWindow();
    infoWindow.setPosition({ lat, lng });
    infoWindow.setContent(
      `Latitude: ${lat}|Lonxitude: ${lng}.<br> Despraze o marcador para un mellor axuste.`
    );
    infoWindow.open(map);
  } catch (error) {
    console.log(error);
    geolocationPositionError.value = true;
  }
})();
</script>

<style scoped></style>
