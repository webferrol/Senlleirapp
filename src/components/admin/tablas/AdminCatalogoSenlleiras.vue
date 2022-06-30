<template>
<table class="tabla_datos_administrativo">
    <tr class="header_administrativo">
        <td>Nome científico</td>
        <td>Nome en Galego</td>
        <td>Nome en Castelán</td>
        <td>Zona xeográfica</td>
        <td>Localización</td>
        <td class="tabla_administrativo_options">
            <span>
                <icono :icon="['fa', 'gears']"></icono>
            </span>
        </td>
    </tr>
     <tr v-for="(senlleira, index) in senlleira" :key="index">
            <td class="mostrar_info" @click="detailDataElement"></td>
            <td >{{ senlleira.genero }} {{senlleira.especie}}</td>
            <td >{{ senlleira.nombre_comun }}</td>
            <td >{{ senlleira.nombre_comun_gal }}</td>
            <td >{{ senlleira.zona_geografica }}</td>
            <td >{{ senlleira.localizacion }}</td>
             <td class="tabla_administrativo_options">
                <span>
                    <icono :icon="['fa', 'trash']"
                        @click="handleDelete({ id: senlleira.idCollection, name: `${senlleira.genero} ${senlleira.especie}` })">
                    </icono>
                    <icono :icon="['fa', 'pen']"></icono>
                </span>
            </td>
        </tr>
</table>
   <div v-if="mostrar" class="alerta_container">
        <div class="alerta_borrar_especie">
            <h2>Atención</h2>
            <span class="borrar_txt">
                <icono :icon="['fa', 'circle-exclamation']"></icono>
                <p>Se eliminará: {{ nombre }} de manera irrevesible</p>
                <p>!Todas las senlleiras que contentan esta especie se verán afectadas!</p>
            </span>
            <span class="borrar_btn">
                <button @click="borrarSenlleira">Eliminar</button>
                <button @click="mostrar = false">Cancelar</button>
            </span>
        </div>
    </div>
</template>

<script setup>
import { getDatos } from "@/hook/firestore.hook";
import { ref } from "vue";
import "@/assets/css/admin-css/catalogoAdmin.css";
import { useStoreSenlleiras } from "../../../stores/senlleiras";
const storeSenlleira = useStoreSenlleiras()

const senlleira = ref(null);
(async ()=>{
    try {
        senlleira.value = await getDatos('Singulares');
    } catch (error) {
        
    }

})();

const nombre = ref("");
let itemDelete = null;

const mostrar = ref(false);

const handleDelete = ({ id, name }) => {
    itemDelete = id;
    nombre.value = name;
    mostrar.value = true
}

const borrarSenlleira = async() => {
    if(itemDelete){
        await storeSenlleira.borrarSenlleira(itemDelete)
    }
}


</script>

<style>

</style>