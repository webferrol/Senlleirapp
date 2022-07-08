<template>
<h1 class="tittle-section"> Catalogo Senlleiras</h1>
    <div class="catalogo-section-component">
        <div class="arbol-catalogo-element" data-titulo="Mostrar" title="Máis info"
            v-for="(senlleira, index) in storeArbores.arbores" :key="index" identificador=senlleira.id
            @click="cargarDatosFicha(senlleira)">
            <img class="imagen-catalogo" alt="imagen del arbol senlleiro" :src="senlleira.google_url">
            <div class="arbol-info">
                <span class="arbol">
                    <icono :icon="['fa', 'leaf']"></icono>
                    <h3 class="arbol-nombre">{{ senlleira.nombre_arbol }}</h3>
                </span>
                <span class="lugar">
                    <icono :icon="['fa', 'location-dot']"></icono>
                    <h4 class="arbol-lugar">{{ senlleira.ubicacion_parque }}</h4>
                </span>       
            </div>
        </div>
    </div>
     

    <FichaTecnicaVue 
    
    v-if="mostrarFicha" @cerrarFicha="mostrarFicha = false"
    :data="fichaDatos" :images="imagenesFichaTecnica">
    <!-- Template de los datos que se van a cargar en el componente hijo -->
     <template #titulo>
        <h2 class="ficha-tittle">{{fichaDatos.nombre_arbol}}</h2>
     </template>
     <template #content>
     <!-- Caracteristicas -->
        <div class="caracteristicas-ficha-tecnica">
            <div>
                <span class="subtitle-caracteristica">
                <icono :icon="['fa', 'leaf']"></icono>
                    <h3>Especie</h3>
                </span>
                <p>{{fichaDatos.genero}} {{fichaDatos.especie}}</p>
            </div>

            <div>
                <span class="subtitle-caracteristica">
                <icono :icon="['fa', 'signature']"></icono>
                    <h3>Nombre</h3>
                </span>
                <p>{{fichaDatos.nombre_comun}}</p>
            </div>

            <div>
                <span class="subtitle-caracteristica">
                <icono :icon="['fa', 'signature']"></icono>
                    <h3>Nome</h3>
                </span>
                <p>{{fichaDatos.nombre_comun_gal}}</p>
            </div>

            <div>
                <span class="subtitle-caracteristica">
                    <icono :icon="['fa', 'up-long']"></icono>
                    <h3>Altura</h3>
                </span>
                <p>{{fichaDatos.altura}} metros</p>
            </div>

            <div>
                <span class="subtitle-caracteristica">
                <icono :icon="['fa', 'arrows-left-right']"></icono>
                    <h3>Diametro</h3>
                </span>
                <p>{{fichaDatos.diametroTronco}} metros</p>
            </div>
        
        </div>
     </template>

     <template #footer>
     <div class="descripcion">
         <h3>Descrición</h3>
         <p>{{fichaDatos.descripcion}}</p>
     </div>
     </template>
     
    </FichaTecnicaVue>

     
</template>

<script setup>

//Dependencias
import { ref } from "vue";
import { useStoreArbores } from "@/stores/arbores.js";
import { useStoreEspecies } from "../../stores/especies";
import FichaTecnicaVue from "./FichaTecnica.vue";

import "@/assets/css/catalogo/catalogo.css";

const storeArbores = useStoreArbores();
const storeEspecies = useStoreEspecies();

(async ()=>{
    await storeArbores.setArbores();
    await storeArbores.getDownloadURL();
})()

console.log(storeArbores.arbores)
//storeEspecies.setEspecies();



const mostrarFicha = ref(false)
const fichaDatos = ref(null);
const imagenesFichaTecnica = ref([]);

// Función que sirve para limpiar el array de imagenes
const imagenesFichaTecnicaVaciar = () => {
    while(imagenesFichaTecnica.value.length > 0)
    imagenesFichaTecnica.value.pop()
}

// Funcion para cargar datos de la ficha y sus respectivas imágenes
const cargarDatosFicha = async (objeto) => {
    //console.log(objeto)
    mostrarFicha.value = true;
    // Limpiamos y cargamos los datos tecnicos de la ficha
    //const especie = storeEspecies.especies.find(el=>el.idDoc===objeto.idEspecie);
    fichaDatos.value = null;
    //fichaDatos.value= {...objeto,...especie};
    fichaDatos.value = objeto;
    //console.log(fichaDatos)
    // Limpiamos y cargamos las imagenes de la ficha
    imagenesFichaTecnicaVaciar()
    console.log(fichaDatos)
    await storeArbores.setImagenes('Arbores/' + objeto.idDoc)
    for (let i = 0; i < storeArbores.imagenes.length; i++) {
        imagenesFichaTecnica.value.push(storeArbores.imagenes[i])
    }
    //await storeEspecies.setEspecies()
}
</script>
