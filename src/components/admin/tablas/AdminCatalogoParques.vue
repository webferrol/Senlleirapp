<template>
  <table class="tabla_datos_administrativo">
    <tr class="header_administrativo">
        <td>Nome</td>
        <td>Tipoloxía</td>
        <td>Localización</td>
        <td>Cronoloxía</td>
        <td>Superficie</td>
        <td>Descripción</td>
        <td class="tabla_administrativo_options">
            <span>
                <icono :icon="['fa', 'gears']"></icono>
            </span>
        </td>
    </tr>

     <tr v-for="(parque, index) in parques" :key="index">
            <td class="mostrar_info" @click="detailDataElement"></td>
            <td >{{ parque.nombre }}</td>
            
             <td class="tabla_administrativo_options">
                <span>
                    <icono :icon="['fa', 'trash']"
                        @click="handleDelete({ id: parque.idCollection, name: `${parque.genero} ${parque.especie}` })">
                    </icono>
                    <icono :icon="['fa', 'pen']"></icono>
                </span>
            </td>
        </tr>
  </table>
</template>

<script>
import { getDatos } from "@/hook/firestore.hook";
import { ref } from "vue";
import "@/assets/css/admin-css/catalogoAdmin.css";
import { useStoreParques } from "../../../stores/parques";
const storeParques = useStoreParques();

const parque = ref(null);
(async ()=>{
    try {
        parque.value = await getDatos('Parques');
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

const borrarParque = async() => {
    if(itemDelete){
        await storeSenlleira.borrarParque(itemDelete)
    }
}


</script>



