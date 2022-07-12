<template>
  <h1 class="tittle-section">Catalogo Senlleiras</h1>
  <div class="catalogo-section-component">
    <div
      class="arbol-catalogo-element"
      data-titulo="Mostrar"
      title="Máis info"
      v-for="(senlleira, index) in storeGeneral.tmp"
      :key="index"
      identificador="senlleira.id"
      @click="cargarDatosFicha(senlleira)"
    >
      <img
        class="imagen-catalogo"
        alt="imagen del arbol senlleiro"
        :src="senlleira.google_url"
      />
      <div class="arbol-info">
        <span class="arbol">
          <icono :icon="['fa', 'leaf']"></icono>
          <h3 class="arbol-nombre">{{ senlleira.nombre_arbol }}</h3>
        </span>
        <span class="lugar">
          <icono :icon="['fa', 'location-dot']"></icono>
          <h4 class="arbol-lugar">{{ senlleira.ubicacion_parque }}</h4>
        </span>
      </div>
    </div>
  </div>
  <!-- <pre>{{temPo}}</pre> -->

  <FichaTecnicaVue
    v-if="mostrarFicha"
    @cerrarFicha="mostrarFicha = false"
    :data="fichaDatos"
    :images="imagenesFichaTecnica"
  >
    <!-- Template de los datos que se van a cargar en el componente hijo -->
    <template #titulo>
      <h2 class="ficha-tittle">{{ fichaDatos.nombre_arbol }}</h2>
    </template>
    <template #content>
      <!-- Caracteristicas -->
      <div class="caracteristicas-ficha-tecnica">
        <h3>Características</h3>
        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'leaf']"></icono>
            <h4>Especie</h4>
          </span>
          <p>{{ fichaDatos.genero }} {{ fichaDatos.especie }}</p>
        </div>

        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'signature']"></icono>
            <h4>Nome castelán</h4>
          </span>
          <p>{{ fichaDatos.nombre_comun }}</p>
        </div>

        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'signature']"></icono>
            <h4>Nome galego</h4>
          </span>
          <p>{{ fichaDatos.nombre_comun_gal }}</p>
        </div>

        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'up-long']"></icono>
            <h4>Altura</h4>
          </span>
          <p>{{ fichaDatos.altura }} metros</p>
        </div>

        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'arrows-left-right']"></icono>
            <h3>Diametro</h3>
          </span>
          <p>{{ fichaDatos.diametroTronco }} metros</p>
        </div>
      </div>
    </template>
    <!-- Descripcion -->
    <template #footer>
      <div class="descripcion-ficha-tecnica">
      <h3>Descripción</h3>
        <p>{{ fichaDatos.descripcion }}</p>
      </div>
    </template>
    <!-- Mapa ?? -->
    <template #mapa>

    <div class="descripcion-ficha-tecnica">
      <h3>Localización</h3>
        <TheGeolocation :lat="fichaDatos.lat" :lng="fichaDatos.lng" />
    </div>
    </template>
  </FichaTecnicaVue>
</template>

<script setup>
//Dependencias
import { ref } from "vue";
import { useStoreArbores } from "@/stores/arbores.js";
import { useStoreEspecies } from "../../stores/especies";
import FichaTecnicaVue from "./FichaTecnica.vue";
import { useStoreGeneral } from "../../stores/general";

import "@/assets/css/catalogo/catalogo.css";
import TheGeolocation from "../TheGeolocation.vue";

const storeArbores = useStoreArbores();
const storeEspecies = useStoreEspecies();
const storeGeneral = useStoreGeneral();

// (async ()=>{
//     await storeArbores.setArbores()
//     await storeArbores.getDownloadURL();
//     // datos(storeArbores.arbores);
// })()
// const temPo = ref([]);
const loadPage = async () => {
  await storeArbores.setArbores();
  await storeArbores.getDownloadURL();
  storeGeneral.filtrarArbores();
  // console.log(storeGeneral.tmp)
  // console.log(temPo.value);
};
loadPage();
// datos(temPo.value);
// temPo = tmp;
// console.log(storeArbores.arbores)
//storeEspecies.setEspecies();

// const filtrar = () => {
//     console.log("jeje")
//     temPo.value = storeGeneral.filtrar()
//     console.log(temPo);
// };

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
    // enviamos para filtrar
    //console.log(fichaDatos)
    // Limpiamos y cargamos las imagenes de la ficha
    imagenesFichaTecnicaVaciar()
    await storeArbores.setImagenes('Arbores/' + objeto.idDoc)
    for (let i = 0; i < storeArbores.imagenes.length; i++) {
        imagenesFichaTecnica.value.push(storeArbores.imagenes[i])
    }
    //await storeEspecies.setEspecies()
}


</script>
