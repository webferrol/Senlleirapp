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
                    <button @click="editar(especie)" >
                        <icono :icon="['fa', 'pen']" to="/arb-:id"></icono>

                    </button>
                        
                    
                        
                </span>
            </td>
        </tr>
    </table>

    <!-- Alerta antes de eliminar especie -->
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

    <!-- Formulario para editar especie -->

    <form
    id="especies"
    @submit.prevent="cambiarDatos(especie.idDoc)"
    v-if="especie"
  >
    <fieldset class="data_especies">
      <h2>Editar Especies</h2>
      <input
        type="text"
        v-model="especie.genero"
        id="genero"
        placeholder="Género"
      />
      <input
        type="text"
        v-model="especie.especie"
        id="especie"
        placeholder="Especie"
      />
      <input
        type="text"
        v-model="especie.nombre_comun"
        id="nombre_comun"
        placeholder="Nombre común"
      />
      <input
        type="text"
        v-model="especie.nombre_comun_gal"
        id="nombre_comun_gal"
        placeholder="Nombre gallego"
      />
      <textarea
        type="text"
        v-model="especie.origen_descripcion"
        id="descripcion"
        placeholder="Descripción"
      ></textarea>
      <textarea
        type="text"
        v-model="especie.usos"
        id="usos"
        placeholder="Usos"
      ></textarea>
      <textarea
        type="text"
        v-model="especie.curiosidades"
        id="curiosidades"
        placeholder="Curiosidades"
      ></textarea>
      

      <input type="submit" value="Editar Especies" />
       <div v-if="loading">Guardando...</div>
    </fieldset>
  </form>


</template>

<script setup>
import { ref } from "vue";
import { useStoreEspecies } from "@/stores/especies.js";
import '@/assets/css/admin-css/catalogoAdmin.css';
import { updateDocument } from "../../../hook/firestore.hook";


const storeSpecies = useStoreEspecies();
storeSpecies.setEspecies().catch(error=>console.log(error));

const nombre = ref("");
const loading = ref(false);
let itemDelete = null;

const mostrar = ref(false);

//FUNCION PARA ELIMINAR ESPECIE

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

// FUNCION PARA EDITAR ESPECIE

  
const especie = ref(null);
const editar = (esp) => {
  //console.log(par);
  especie.value = esp;
  
};
const cambiarDatos = async (id) => {
  try {
    loading.value = true;
    await updateDocument(id,"Especies",especie.value);
  } catch (error) {
    console.log("aaaaah",error);
  } finally {
    loading.value= false;
  }

}

</script>


