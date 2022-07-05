<template>
 <table class="tabla_datos_administrativo">
    <tr class="header_administrativo">
      <td>Nome da árbore</td>  
      <td>Nome científico</td>
      <td>Nome en Galego</td>
      <td>Nome en Castelán</td>
      <td>Zona xeográfica</td>
      <td>Localizacion, Parque</td>
      <td>Latitude</td>
      <td>Lonxitude</td>
      <td class="tabla_administrativo_options">
        <span>
          <icono :icon="['fa', 'gears']"></icono>
        </span>
      </td>
    </tr>
    <tr
      class="catalogo_administrativo"
      v-for="(arbores, index) in storeArbores.arbores"
      :key="index"
    >
      <td>{{arbores.nombre_arbol}}</td>
      <td>{{ arbores.genero }} {{ arbores.especie }}</td>
      <td>{{ arbores.nombre_comun }}</td>
      <td>{{ arbores.nombre_comun_gal }}</td>
      <td>{{ arbores.zona_geografica }}</td>
      <td>{{ arbores.localizacion }}</td>
      <td>{{arbores.latitud}}</td>
      <td>{{arbores.longitud}}</td>
      <td class="tabla_administrativo_options">
        <span>
          <icono
            :icon="['fa', 'trash']"
            @click="
              handleDelete({
                id: arbores.idDoc,
                name: `${arbores.genero} ${arbores.especie}`,
              })
            "
          >
          </icono>

          <button @click="editar( arbores ) " >
           <icono :icon="['fa', 'pen']"></icono> 
          </button>
        
        </span>
      </td>
    </tr>
  </table>
  <!-- Alerta para eliminar arbores -->
  <div v-if="mostrar" class="alerta_container">
    <div class="alerta_borrar_especie">
      <h2>Atención</h2>
      <span class="borrar_txt">
        <icono :icon="['fa', 'circle-exclamation']"></icono>
        <p>Se eliminará: {{ nombre }} de maneira irrevesible</p>
        <p>
          !Todalas arbores que conteñan esta especie veranse afectadas!
        </p>
      </span>
      <span class="borrar_btn">
        <button @click="borrarArbore">Eliminar</button>
        <button @click="mostrar = false">Cancelar</button>
      </span>
    </div>
  </div>
   <!-- Modulo para editar arbore -->
<form
      id="senlleiras"
      @submit.prevent="cambiarDatos(`${arbore.idDoc}`)"
      v-if="arbore"
    >
      <fieldset class="data_especies">
        <h2>Editar Arbores</h2>
         <input
          type="text"
          v-model="arbore.nombre_arbol"
          id="arbore"
          placeholder="Nome da arbore"
        />
        <input
          type="text"
          v-model="arbore.nombre_comun"
          id="nombre_comun"
          placeholder="Nome en Castelán"
        />
        <input
          type="text"
          v-model="arbore.nombre_comun_gal"
          id="nombre_comun_gal"
          placeholder="Nome en Galego"
        />
        <input
          type="text"
          v-model="arbore.zona_geografica"
          id="zona-geografica"
          placeholder="Zona xeográfica"
        />
        <input
        type="text"
          v-model="arbore.localizacion"
          id="localizacion"
          placeholder="Localización, parque"
        />
          <input
        type="number"
          v-model.number="arbore.latitud"
          id="latitud"
          placeholder="867479686"
        />
            <input
        type="number"
          v-model.number="arbore.longitud"
          id="longitud"
          placeholder="867543934"
        />
               
        <input type="submit" value="Editar Arbore" :disabled="arbore===null" />
        <div v-if="loading">Guardando...</div>
      </fieldset>
    </form>

</template>

<script setup >
import { useStoreArbores } from '@/stores/arbores.js';
import { updateDocument } from "@/hook/firestore.hook";
import {ref} from 'vue';
import "@/assets/css/admin-css/catalogoAdmin.css";

const storeArbores = useStoreArbores();
storeArbores.setArbores().catch((error) => console.log(error));

const nombre = ref("");
const loading = ref(false);
let itemDelete = null;

const mostrar = ref(false);

const handleDelete = ({ id, name }) => {
  itemDelete = id;
  nombre.value = name;
  mostrar.value = true;
};

const borrarArbore = async () => {
  if (itemDelete) {
    await storeArbores.borrarArbore(itemDelete);
  }
};

//Editar Arbore
const arbore = ref(null);
const editar = (arb) => {
  //console.log(par);
  arbore.value = arb;
  
};
const cambiarDatos = async (id) => {
  //console.log("uid",id);
  try {
    loading.value = true;
    await updateDocument(id,"Arbores",arbore.value);
  } catch (error) {
    console.log("aaaaah",error);
  } finally {
    loading.value= false;
  }

}

</script>
