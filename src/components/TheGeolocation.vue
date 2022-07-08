<template>
  <div>
    <form>
      <label for="lat" class="form-label" >Latitude</label>
      <input
        class="input-senlleira"
        type="number"
        v-model.number="location.latitude"
        name="lat"
        id="lat"
        step="any"
        placeholder="Latitud"
      />
      <label for="lng" class="form-label">Lonxitude</label>
      <input
        class="input-senlleira"
        type="number"
        v-model.number="location.longitude"
        name="lng"
        id="lng"
        step="any"
        placeholder="Longitud"
      />
      <hr>
      <input type="button" @click="onClickGetCoords" value="Geolocalizacion">

    <TheLoader :loading="loader"></TheLoader>

    </form>
  </div>
</template>

<script setup>
// -> Importaciones <- //
import { useStoreArbores } from "@/stores/arbores";
import { ref } from "vue";
import TheLoader from "@/components/TheLoader.vue";


// -> Constantes/Variables <- //
const useArbore = useStoreArbores();
let errorStr = ref("");
// -> Loader para que el usuario sepa el tiempo de espera <- //
let loader = ref(false);


const props = defineProps({
  location: {
    type: Object,
    default: () => ({ lat: null, lng: null }),
  },
});

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
    props.location.latitude = lat;
    props.location.longitude = lng;

    // console.log(lat, lng)

    
  } catch (error) {
    errorStr.value = error.message;
  } finally {
    loader.value = false

  }
};


</script>

<style scoped></style>
