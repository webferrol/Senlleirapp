<template>
    <div style="background-color: rgb(245, 244, 244);">
        <l-map 
            :style="`height: ${lMapHeight};width:100%;`" 
            :options="{attributionControl: false}" 
            :zoom="theZoom" 
            :center="centrado" 
            :maxZoom="maxZoom">
            <l-control-layers position="topright"></l-control-layers>
            <l-tile-layer
                v-for="tileProvider in tileProviders"
                :key="tileProvider.name"
                :name="tileProvider.name"
                :visible="tileProvider.visible"
                :url="tileProvider.url"
                :attribution="tileProvider.attribution"
                layer-type="base"
            />
            <div v-if="location.length">
                <l-marker
                    v-for="(loc,index) in location"
                    :key="index"
                    :lat-lng="loc.latLong"
                    @dblclick="handleRoute(loc)"
                >
                    <l-icon
                        :icon-url="iconUrl"
                        :icon-size="iconSize"
                    />
                    <l-tooltip>
                    <div style="font-weight: bold">{{loc.tooltip}}</div><div style="color: red">Doble click para vela ficha</div>
                </l-tooltip>  
                </l-marker>
            </div>
        </l-map>
    </div>
</template>

<script setup>
import { LMap, LTileLayer, LMarker, LIcon, LControlLayers, LTooltip } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { useRouter } from "vue-router";
import { reactive } from "vue";

const router = useRouter();
defineProps({
    /**
     * {Number} Zoom con que arranca la aplicación. Valor máximo 17
     */
    theZoom: {
        type: Number,
        default: 15,
    },
    /**
     * {Number} Máximo zoom que tiene la aplicación 17
     */
    maxZoom: {
        type: Number,
        default: 17
    },
    /**
     * {String} Tamaño Altura del componente mapa
     */
    lMapHeight: {
        type: String,
        default: 'calc(100vh - 83px)',
    },
    /**
     * {Array} Datos que almacena arrays donde almacena [latitiud,longitud]
     */
    location: {
        type: Array,
        default: () => [
            {
                tooltip: 'Texto en tooltip',
                route:{
                    name:'FichaParque',
                    params:{ idDoc: 1}
                },
                latLong:[42.877702, -8.5508146],
            }
        ]
    },
    /**
     * {Array} Centrado del mapa
     */
    centrado: {
        type: Array,
        default: () => [42.877702, -8.5508146]
    },
    /**
     * {String} URL del icono que se presenta como marcador
     */
    iconUrl: {
        type: String,
        default: "./arbolito.png",
    },
    /**
     * {Array} width y height del icono que se presenta como marcador
     */
    iconSize:{
        type: Array,
        default: [80,80],
    }
});


const tileProviders = reactive([
        {
          name: 'Mapa rueiro',
          visible: true,          
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        },
        {
          name: 'Mapa xeográfico',
          visible: false,
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',      
        },
      ]);

const handleRoute = ({route}) => {
   
  if (route) {
    router.push(route);    
  }
  return;
}

</script>

<style lang="scss" scoped>
.leaflet-container {
    z-index: 0 !important;
    border-radius: 0.2rem;
}
.width {
    width: 100%;
    min-width: 18rem;
    min-height: 18rem;
}
</style>