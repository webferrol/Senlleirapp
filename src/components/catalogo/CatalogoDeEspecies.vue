<template>
    <div>
        <h1>Catalogo de Especies</h1>
        <table class="tabla_datos_administrativo">
            <tr class="header_administrativo">
            <td class="mostrar_info"></td>
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

        <tr class="catalogo_administrativo" v-for="(especie, index) in speciesStore.especies" :key="index">
            <td class="mostrar_info" @click="detailDataElement"></td>
            <td class="genero">{{ especie.genero }}</td>
            <td class="especie">{{ especie.especie }}</td>
            <td class="nombre_comun">{{ especie.nombre_comun }}</td>
            <td class="nombre_comun_gal">{{ especie.nombre_comun_gal }}</td>
            <td class="origen_descripcion">{{ especie.origen_descripcion }}</td>
            <td class="usos">{{ especie.usos }}</td>
            <td class="curiosidades">{{ especie.curiosidades }}</td>
            <td class="tabla_administrativo_options">
                
                <span>
                    <icono :icon="['fa', 'trash']">
                    </icono>
                    <button @click="editar(especie.genero, especie.especie, especie.nombre_comun, especie.nombre_comun_gal, especie.origen_descripcion, especie.usos)">
                        <icono :icon="['fa', 'pen']" to="/arb-:id"></icono>
                    </button>
                </span>
            </td>
        </tr>
        </table>
    </div>

    <div v-for="(especie, index) in speciesStore.especies" :key="index">
        <form id="especies" @submit.prevent="cambiarDatos(`${especie.idCollection}`)" v-if="mostrar">
            <fieldset class="data_especies" >
                <h2>Editar Especies</h2>
                <input type="text" v-model="cambioGenero" id="genero" placeholder="Género">
                <input type="text" v-model="cambioEspecie" id="especie" placeholder="Especie">
                <input type="text" v-model="cambioNombreComun" id="nombre_comun" placeholder="Nombre Común">
                <input type="text" v-model="cambioNombreComunGal" id="nombre_comun" placeholder="Nombre Común Galego">
                <input type="text" v-model="descripcion" id="nombre_comun" placeholder="Descripción">
                <input type="text" v-model="usos" id="nombre_comun" placeholder="Usos">

                <input type="submit" value="Editar Especies">
            </fieldset>
        </form>
        
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useStoreEspecies } from '../../stores/especies';
import { editarDatos } from '../../hook/firestore.hook';
import '@/assets/css/admin-css/catalogoAdmin.css';



const speciesStore = useStoreEspecies();
speciesStore.setEspecies().catch(error=>console.log(error));


    let cambioEspecie = ref(null);
    let cambioGenero = ref(null);
    let cambioNombreComun = ref(null);
    let cambioNombreComunGal = ref(null);
    let descripcion = ref(null);
    let usos = ref(null);
    let mostrar =ref(false);
const editar = (especie, genero, nombre_comun, nombre_comun_gal, descripcion, usos) => {
        mostrar.value = true;
        cambioEspecie.value = especie;
        cambioGenero.value = genero;
        cambioNombreComun.value = nombre_comun;
        cambioNombreComunGal.value = nombre_comun_gal;
        // descripcion.value = descripcion;
        // usos.value = usos;
        // console.log(mostrar.value);
        // console.log(especie.value, descripcion.value, usos.value)

    }
const cambiarDatos = (id) => {
    console.log(id, cambioEspecie.value);
    editarDatos(id, cambioEspecie.value, cambioGenero.value, cambioNombreComun.value,cambioNombreComunGal.value,descripcion.value,usos.value);
    
    mostrar.value = false;
}

</script>