<template>
    <div v-if="error.error" class="alert alert-danger m-3" role="alert">
    {{error.code}} ---> {{error.message}}
    </div>
    <div v-else data-set="data" ref="mapDiv" style="margin:.5em 0;width: 100%; height: 50vh; "></div>
</template>

<script setup>
//Dependencies
import { ref } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
 //Props
const props = defineProps({
    google_maps_api_key: {
        type: String,
        default: "AIzaSyDJUNfgGrajFUqtFZBX6WoX3gTRVavpzpE",
    },
    lat:{
        type: Number,
        default:345555,
    },
    lng:{
        type: Number,
        default:345555,
    }
});

//Lanzamiento asíncrona
/**
 * Función asíncrona que lanza el lodader 
 */
//let geolocationBool = ref(false);
const error = ref({
    error: false,
    code: null,
    message: '',
});
const mapDiv = ref(null);
let map, infoWindow, marker;

const loader = new Loader({ apiKey: props.google_maps_api_key });




//Función callback anónima y lanzada automáticamente
(async () => {
    try {
        // Inciamos loader de Google
        if (!loader.loading)
            await loader.load();
        // Coordenadas actuales
     
        
        //cargamos mapa y colocamos valores
        map = new google.maps.Map(mapDiv.value, {
            center: {
                lat: props.lat, lng: props.lng
            },
            zoom: 12,
        });
        //Cargamos marcador
        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {
                lat: props.lat,
                lng: props.lng
            },
            icon: 'src/assets/arbolito.png',
        });
        
        
        infoWindow = new google.maps.InfoWindow();
        infoWindow.setPosition({ lat, lng });
        infoWindow.setContent(`Latitude: ${lat}|Lonxitude: ${lng}.<br> Despraze o marcador para un mellor axuste.`);
        infoWindow.open(map);
    } catch (err) {
        //console.log(error);
        error.value.error = true;
        error.value.code = err.code;
        error.value.message = err.message;
    }
})();  
</script>