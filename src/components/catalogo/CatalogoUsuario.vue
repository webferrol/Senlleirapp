<template>
    <!-- <span class="background-color"></span> -->
    <div class="catalogo-section-component">
        <div class="arbol-catalogo-element" data-titulo="Mostrar" title="Máis info"
            v-for="(senlleira, index) in storeSenlleira.senlleiras" :key="index" identificador=senlleira.id
            @click="mostrarFicha(senlleira); $emit('mostrarFicha') ">
            <div class="content-img">
                <img alt="imagen del arbol senlleiro" :src="senlleira.google_url">
            </div>
            <div class="arbol-info">
                <span class="arbol">
                    <icono :icon="['fa', 'leaf']"></icono>
                </span>
                <h3 class="arbol-nombre">{{ senlleira.genero }}</h3>
                <span class="lugar">
                    <icono :icon="['fa', 'location-dot']"></icono>
                </span>
                <h4 class="arbol-lugar">{{ senlleira.localizacion }}</h4>
            </div>
        </div>
    </div>
     
</template>

<script setup>

//Dependencias
import "@/assets/css/catalogo/catalogo.css";
import { useStoreSenlleiras } from "@/stores/senlleiras";
import { useStoreEspecies } from "../../stores/especies";
import { ref } from "vue";

const storeSenlleira = useStoreSenlleiras();
const storeEspecies = useStoreEspecies();
storeSenlleira.setSenlleiras();
storeEspecies.setEspecies();

const props = defineProps({
    fichaDatos: {
        type: Array,
        default: []
    },
    imagenesFichaTecnica: {
        type: Array,
        default: []
    }
})
// Funcion para cargar las imagenes correspondientes de la ficha tecnica
const mostrarFicha = async (objeto) => {
    const especie = storeEspecies.especies.find(el=>el.id,objeto.idEspecie);
    props.fichaDatos.pop();
    props.fichaDatos.push({...objeto,...especie});
    props.imagenesFichaTecnica.pop();
    await storeSenlleira.setImagenes('senlleiras/' + objeto.id)
    for (let i = 0; i < storeSenlleira.imagenes.length; i++) {
        props.imagenesFichaTecnica.push(storeSenlleira.imagenes[i])
    }
    await storeEspecies.setEspecies()

    // console.log("datos son  => ",props.fichaDatos, "imagenes son => ",props.imagenesFichaTecnica)
}
</script>
