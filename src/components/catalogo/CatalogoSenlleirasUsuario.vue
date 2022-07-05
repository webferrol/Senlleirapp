<template>
    <div class="catalogo-section-component">
        <div class="arbol-catalogo-element" data-titulo="Mostrar" title="Máis info"
            v-for="(senlleira, index) in storeSenlleira.senlleiras" :key="index" identificador=senlleira.id
            @click="cargarDatosFicha(senlleira)">
            <div class="content-img">
                <img alt="imagen del arbol senlleiro" :src="senlleira.google_url">
            </div>
            <div class="arbol-info">
                <span class="arbol">
                    <icono :icon="['fa', 'leaf']"></icono>
                </span>
                <h3 class="arbol-nombre">{{ senlleira.nombre_arbol }}</h3>
                <span class="lugar">
                    <icono :icon="['fa', 'location-dot']"></icono>
                </span>
                <h4 class="arbol-lugar">{{ senlleira.localizacion }}</h4>
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
        <div class="datos-especie">
            <span>
                <h3>Especie</h3>
                <p>{{fichaDatos.genero}} {{fichaDatos.especie}}</p>
            </span>
            <span>
                <h3>Localizacion</h3>
                <p>{{fichaDatos.localizacion}}</p>
            </span>
            <span>
                <h3>Nombre</h3>
                <p>{{fichaDatos.nombre_comun}}</p>
            </span>
            <span>
                <h3>Nome</h3>
                <p>{{fichaDatos.nombre_comun_gal}}</p>
            </span>
            <span>
                <h3>Altura</h3>
                <p>{{fichaDatos.altura}} metros</p>
            </span>
            <span>
                <h3>Diametro</h3>
                <p>{{fichaDatos.diametroTronco}} metros</p>
            </span>
        
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
import { useStoreSenlleiras } from "@/stores/senlleiras";
import { useStoreEspecies } from "../../stores/especies";
import FichaTecnicaVue from "./FichaTecnica.vue";

import "@/assets/css/catalogo/catalogo.css";

const storeSenlleira = useStoreSenlleiras();
const storeEspecies = useStoreEspecies();
storeSenlleira.setSenlleiras();
storeEspecies.setEspecies();



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
    mostrarFicha.value = true;
    // Limpiamos y cargamos los datos tecnicos de la ficha
    const especie = storeEspecies.especies.find(el=>el.id,objeto.idEspecie);
    fichaDatos.value = null;
    fichaDatos.value= {...objeto,...especie};
    console.log(fichaDatos)
    // Limpiamos y cargamos las imagenes de la ficha
    imagenesFichaTecnicaVaciar()
    await storeSenlleira.setImagenes('senlleiras/' + objeto.idDoc)
    for (let i = 0; i < storeSenlleira.imagenes.length; i++) {
        imagenesFichaTecnica.value.push(storeSenlleira.imagenes[i])
    }
    await storeEspecies.setEspecies()
}
</script>
