<template>
  <table class="tabla_datos_administrativo">
    <tr class="header_administrativo">
      <td class="genero">Xénero</td>
      <td class="especie">Especie</td>
      <td class="nombre_comun">Nome Común (Castelan)</td>
      <td class="nombre_comun_gal">Nome común (Galego)</td>
      <td class="origen_descripcion">Orixe - Descrición</td>
      <td class="usos">Usos</td>
      <td class="curiosidades">Curiosidades</td>
      <td class="tabla_administrativo_options">
        <span>
          <icono :icon="['fa', 'gears']"></icono>
        </span>
      </td>
    </tr>

    <tr
      class="catalogo_administrativo"
      v-for="(especie, index) in storeSpecies.especies"
      :key="index"
    >
      <td class="genero">{{ especie.genero }}</td>
      <td class="especie">{{ especie.especie }}</td>
      <td class="nombre_comun">{{ especie.nombre_comun }}</td>
      <td class="nombre_comun_gal">{{ especie.nombre_comun_gal }}</td>
      <td class="origen_descripcion">{{ especie.origen_descripcion }}</td>
      <td class="usos">{{ especie.usos }}</td>
      <td class="curiosidades">{{ especie.curiosidades }}</td>
      <td class="tabla_administrativo_options">
        <span>
          <icono
            :icon="['fa', 'trash']"
            @click="
              handleDelete({
                id: especie.idDoc,
                name: `${especie.genero} ${especie.especie}`,
              })
            "
          >
          </icono>
          <button @click="editar(especie)">
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
        <p>
          !Todas las senlleiras que contentan esta especie se verán afectadas!
        </p>
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
    <icono
      class="close-form"
      :icon="['fa', 'xmark']"
      @click="especie = null"
    ></icono>
    <fieldset class="data_especies">
      <h2>Editar Especies</h2>
      <label for="genero">Xénero</label>
      <input
        type="text"
        v-model="especie.genero"
        id="genero"
        placeholder="Género"
      />
      <label for="especie">Especie</label>
      <input
        type="text"
        v-model="especie.especie"
        id="especie"
        placeholder="Especie"
      />
      <label for="nombre_comun">Nome común - (Castelán)</label>
      <input
        type="text"
        v-model="especie.nombre_comun"
        id="nombre_comun"
        placeholder="Nombre común"
      />
      <label for="nombre_comun_gal">Nome común - (Galego)</label>
      <input
        type="text"
        v-model="especie.nombre_comun_gal"
        id="nombre_comun_gal"
        placeholder="Nombre gallego"
      />
      <label for="descripcion">Descrición</label>
      <textarea
        type="text"
        v-model="especie.origen_descripcion"
        id="descripcion"
        placeholder="Descripción"
      ></textarea>
      <label for="usos">Usos</label>
      <textarea
        type="text"
        v-model="especie.usos"
        id="usos"
        placeholder="Usos"
      ></textarea>
      <label for="curiosidades">Curiosidades</label>
      <textarea
        type="text"
        v-model="especie.curiosidades"
        id="curiosidades"
        placeholder="Curiosidades"
      ></textarea>

      <input type="submit" value="Editar Especies" />
      <div v-if="loading">Gardando...</div>
    </fieldset>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useStoreEspecies } from "@/stores/especies.js";
import "@/assets/css/admin-css/catalogoAdmin.css";
import { updateDocument } from "../../../hook/firestore.hook";

const storeSpecies = useStoreEspecies();
storeSpecies.setEspecies().catch((error) => console.log(error));

const nombre = ref("");
const loading = ref(false);
let itemDelete = null;

const mostrar = ref(false);

//FUNCION PARA ELIMINAR ESPECIE

const handleDelete = ({ id, name }) => {
  itemDelete = id;
  nombre.value = name;
  mostrar.value = true;
};

const borrarEspecie = async () => {
  if (itemDelete) {
    await storeSpecies.borrarEspecie(itemDelete);
    mostrar.value = false;
  }
};

// FUNCION PARA EDITAR ESPECIE

const especie = ref(null);
const editar = (esp) => {
  //console.log(par);
  especie.value = esp;
};
const cambiarDatos = async (id) => {
  try {
    loading.value = true;
    await updateDocument(id, "Especies", especie.value);
  } catch (error) {
    console.log("aaaaah", error);
  } finally {
    loading.value = false;
  }
};
</script>


