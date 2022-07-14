<template>
  <h1 class="tittle-section">Catalogo especies</h1>
  <div class="catalogo-especies-component" v-if="loadGaleria">

    <div class="especie-catalogo-element" data-titulo="Mostrar" title="Máis info"
      v-for="(especie, index) in storeGeneral.tmp" :key="index" identificador="senlleira.id"
      @click="cargarDatosFicha(especie)">
      <div class="especie-info">
        <h4 class="arbol-lugar">{{ especie.genero }} {{ especie.especie }}</h4>
        <h5> {{ especie.nombre_comun_gal }}</h5>
      </div>
    </div>
  </div>
  <SkeletonCatalogoEspeciesVue v-else="loadGaleria"></SkeletonCatalogoEspeciesVue>
  <!-- <pre>{{temPo}}</pre> -->

  <FichaTecnicaVue v-if="mostrarFicha" @cerrarFicha="mostrarFicha = false" :data="fichaDatos"
    :images="imagenesFichaTecnica">
    <!-- Template de los datos que se van a cargar en el componente hijo -->
    <template #titulo>
      <h2 class="ficha-tittle">{{ fichaDatos.nombre_comun }}</h2>
    </template>

    <template #content>
      <div class="caracteristicas-ficha-tecnica">
      <h3>CARACTERÍSTICAS</h3>
        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'leaf']"></icono>
            <h4>Especie</h4>
          </span>
          <p>{{ fichaDatos.genero }} {{ fichaDatos.especie }}</p>
        </div>

        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'leaf']"></icono>
            <h4>Nombre</h4>
          </span>
          <p>{{ fichaDatos.nombre_comun }}</p>
        </div>

        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'leaf']"></icono>
            <h4>Nome Comun</h4>
          </span>
          <p>{{ fichaDatos.nombre_comun_gal }}</p>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="descripcion-ficha-tecnica">
        <h3>USOS</h3>
        <p>{{ fichaDatos.usos }}</p>
      </div>
    </template>

    <template #usos>
      <div class="descripcion-ficha-tecnica">
        <h3>ORIXE</h3>
        <p>{{ fichaDatos.origen_descripcion }} metros</p>
      </div>
    </template>
  </FichaTecnicaVue>
</template>

<script setup>
//Dependencias
import { ref } from "vue";
import { useStoreEspecies } from "../../stores/especies";
import FichaTecnicaVue from "./FichaTecnica.vue";
import { useStoreGeneral } from "../../stores/general";
import "@/assets/css/catalogo/catalogo-especies.css";

// Skeleton
import SkeletonCatalogoEspeciesVue from "../skeleton/SkeletonCatalogoEspecies.vue";

const storeEspecies = useStoreEspecies();
const storeGeneral = useStoreGeneral();


const loadGaleria = ref(false);
const loadPage = async () => {
  try {
    await storeEspecies.setEspecies();
    loadGaleria.value = true
    storeGeneral.filtrarEspecies();
  } catch (error) {
    console.log("error--->",error);
  }
  
};
loadPage();

const mostrarFicha = ref(false);
const fichaDatos = ref(null);
const imagenesFichaTecnica = ref([]);

// Función que sirve para limpiar el array de imagenes
const imagenesFichaTecnicaVaciar = () => {
  while (imagenesFichaTecnica.value.length > 0)
    imagenesFichaTecnica.value.pop();
};

// datos(storeArbores.arbores);
// Funcion para cargar datos de la ficha y sus respectivas imágenes
const cargarDatosFicha = async (objeto) => {
  //console.log(objeto)
  mostrarFicha.value = true;
  // Limpiamos y cargamos los datos tecnicos de la ficha
  //const especie = storeEspecies.especies.find(el=>el.idDoc===objeto.idEspecie);
  fichaDatos.value = null;
  //fichaDatos.value= {...objeto,...especie};
  fichaDatos.value = objeto;
};

</script>
