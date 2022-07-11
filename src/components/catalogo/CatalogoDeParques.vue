<template>
    <div class="catalogo-section-component">
        <div class="arbol-catalogo-element" data-titulo="Mostrar" title="Máis info"
            v-for="(parque, index) in storeGeneral.tmp" :key="index" identificador=senlleira.id
            @click="cargarDatosFicha(parque)">
            <div class="imagen-catalogo">
                <img alt="imagen del arbol senlleiro" :src="parque.url_google">
            </div>
            <div class="arbol-info">
                <span class="arbol">
                    <icono :icon="['fa', 'leaf']"></icono>
                    <h3 class="arbol-nombre">{{ parque.nombre }}</h3>
                </span>
                <span class="lugar">
                    <icono :icon="['fa', 'location-dot']"></icono>
                    <h4 class="arbol-lugar">{{ parque.localizacion }}</h4>
                </span>
            </div>
        </div>
    </div>
     <!-- <pre>{{temPo}}</pre> -->

    <FichaTecnicaVue 
    
    v-if="mostrarFicha" @cerrarFicha="mostrarFicha = false"
    :data="fichaDatos" :images="imagenesFichaTecnica">
    <!-- Template de los datos que se van a cargar en el componente hijo -->
     <template #titulo>
        <h2 class="ficha-tittle">{{fichaDatos.nombre}}</h2>
     </template>
     <template #content>
        <div class="datos-especie">
            <span>
                <h3>Localizacion</h3>
                <p>{{fichaDatos.localizacion}}</p>
            </span>
            <span>
                <h3>Tipoloxia</h3>
                <p>{{fichaDatos.tipoloxia}}</p>
            </span>
            <span>
                <h3>Superficie</h3>
                <p>{{fichaDatos.superficie}} m</p>
            </span>
            <span>
                <h3>Cronoloxia</h3>
                <p>{{fichaDatos.cronoloxia}}</p>
            </span>
        </div>
        
     </template>

     <template #footer>
     <div class="descripcion">
         <h3>Descrición</h3>
         <p>{{fichaDatos.descripcion}}</p>
     </div>
     </template>
     <!-- Mapa ?? -->
    <template #mapa>
    <TheGeolocation :icon="'./src/assets/parques.png'" :lat="fichaDatos.lat" :lng="fichaDatos.lng"/>
     </template>
     
     
    </FichaTecnicaVue>

     
</template>

<script setup>

//Dependencias
import { ref } from "vue";
import FichaTecnicaVue from "./FichaTecnica.vue";
import { useStoreParques } from "../../stores/parques";
import { useStoreGeneral } from "../../stores/general";
import TheGeolocation from "@/components/TheGeolocation.vue"

import "@/assets/css/catalogo/catalogo.css";

const storeParques = useStoreParques();
const storeGeneral = useStoreGeneral();


// (async ()=>{
//     await storeArbores.setArbores()
//     await storeArbores.getDownloadURL();
//     // datos(storeArbores.arbores);
// })()
// const temPo = ref([]);
const loadPage = async () => {
    await storeParques.setParques();
    // await storeParques.getDownloadURL();
    storeGeneral.filtrarParques();
    // console.log(storeGeneral.tmp)
    // console.log(temPo.value);
}
loadPage();
// datos(temPo.value);
// temPo = tmp;
// console.log(storeArbores.arbores)
//storeEspecies.setEspecies();

// const filtrar = () => {
//     console.log("jeje")
//     temPo.value = storeGeneral.filtrar()
//     console.log(temPo);
// };

const mostrarFicha = ref(false)
const fichaDatos = ref(null);
const imagenesFichaTecnica = ref([]);

// Función que sirve para limpiar el array de imagenes
const imagenesFichaTecnicaVaciar = () => {
    while(imagenesFichaTecnica.value.length > 0)
    imagenesFichaTecnica.value.pop()
}

    // datos(storeArbores.arbores);
// Funcion para cargar datos de la ficha y sus respectivas imágenes
const cargarDatosFicha = async (objeto) => {
    //console.log(objeto)
    mostrarFicha.value = true;
    // Limpiamos y cargamos los datos tecnicos de la ficha
    //const especie = storeEspecies.especies.find(el=>el.idDoc===objeto.idEspecie);
    fichaDatos.value = null;
    //fichaDatos.value= {...objeto,...especie};
    fichaDatos.value = objeto;
    // enviamos para filtrar
    //console.log(fichaDatos)
    // Limpiamos y cargamos las imagenes de la ficha
    // imagenesFichaTecnicaVaciar()
    // console.log(fichaDatos.value)
    // await storeParques.setImagenes('Parques/' + objeto.idDoc)
    // for (let i = 0; i < storeParques.imagenes.length; i++) {
    //     imagenesFichaTecnica.value.push(storeParques.imagenes[i])
    // }
    //await storeEspecies.setEspecies()
}
</script>
