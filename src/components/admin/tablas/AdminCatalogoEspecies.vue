<template>
    <table class="tabla_datos_administrativo">

        <tr class="header_administrativo">
            <td class="genero">Genero</td>
            <td class="especie">Especie</td>
            <td class="nombre_comun">Nombre Comun</td>
            <td class="nombre_comun_gal">Nombre comun (gallego)</td>
            <td class="origen_descripcion">Origen - Descripción</td>
            <td class="usos">Usos</td>
            <td class="curiosidades">Curiosidades</td>
            <td class="tabla_administrativo_options">
                <span>
                    <icono :icon="['fa', 'gears']"></icono>
                </span>
            </td>

        </tr>

        <tr class="catalogo_administrativo" v-for="(especie, index) in storeSpecies.especies" :key="index">
            <td class="genero">{{ especie.nombre_comun }}</td>
            <td class="especie">{{ especie.especie }}</td>
            <td class="nombre_comun">{{ especie.nombre_comun }}</td>
            <td class="nombre_comun_gal">{{ especie.nombre_comun_gal }}</td>
            <td class="origen_descripcion">{{ especie.origen_descripcion }}</td>
            <td class="usos">{{ especie.usos }}</td>
            <td class="curiosidades">{{ especie.curiosidades }}</td>
            <td class="tabla_administrativo_options">
                <span>
                    <icono :icon="['fa', 'trash']"
                        @click="handleDelete({ id: especie.idCollection, name: `${especie.genero} ${especie.especie}` })">
                    </icono>
                    
                        <icono :icon="['fa', 'pen']" to="/arb-:id"></icono>
                    
                        
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
                <button @click="borrarEspecie">Eliminar</button>
                <button @click="mostrar = false">Cancelar</button>
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStoreEspecies } from "@/stores/especies.js";
import '@/assets/css/admin-css/catalogoAdmin.css';
import router from "@/router";


const storeSpecies = useStoreEspecies();
storeSpecies.setEspecies().catch(error=>console.log(error));

const nombre = ref("");
let itemDelete = null;

const mostrar = ref(false);

const handleDelete = ({ id, name }) => {
    itemDelete = id;
    nombre.value = name;
    mostrar.value = true
}

const borrarEspecie = async() => {
    if(itemDelete){
        await storeSpecies.borrarEspecie(itemDelete);
        mostrar.value = false;
    }
}

</script>


