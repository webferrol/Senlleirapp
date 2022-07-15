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
        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'leaf']"></icono>
            <h3>Especie</h3>
          </span>
          <p>{{ fichaDatos.genero }} {{ fichaDatos.especie }}</p>
        </div>

        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'signature']"></icono>
            <h3>Nome castelán</h3>
          </span>
          <p>{{ fichaDatos.nombre_comun }}</p>
        </div>

        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'signature']"></icono>
            <h3>Nome galego</h3>
          </span>
          <p>{{ fichaDatos.nombre_comun_gal }}</p>
        </div>

        <div>
          <span class="subtitle-caracteristica">
            <icono :icon="['fa', 'up-long']"></icono>
            <h3>Altura</h3>
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
        <p>{{ fichaDatos.descripcion }}</p>
      </div>
    </template>
    <!-- Mapa ?? -->
    <template #mapa>
      <TheGeolocation :lat="fichaDatos.lat" :lng="fichaDatos.lng" />
    </template>
  </FichaTecnicaVue>
  <button @click="paginar">Paginar</button>
</template>

<script setup>
//Dependencias
import { ref } from "vue";
import { useStoreArbores } from "@/stores/arbores.js";
import { useStoreEspecies } from "../../stores/especies";
import FichaTecnicaVue from "./FichaTecnica.vue";
import { useStoreGeneral } from "../../stores/general";
import { paginarDatos } from "../../hook/firestore.hook"

import "@/assets/css/catalogo/catalogo.css";
import TheGeolocation from "../TheGeolocation.vue";

const storeArbores = useStoreArbores();
const storeEspecies = useStoreEspecies();
const storeGeneral = useStoreGeneral();
const mostrarFicha = ref(false);
const fichaDatos = ref(null);
const imagenesFichaTecnica = ref([]);

    // Función que sirve para limpiar el array de imagenes
    const imagenesFichaTecnicaVaciar = () => {
      while (imagenesFichaTecnica.value.length > 0)
        imagenesFichaTecnica.value.pop();
    };
    
    // Funcion para cargar datos de la ficha y sus respectivas imágenes
    const cargarDatosFicha = async (objeto) => {
        mostrarFicha.value = true;
        // Limpiamos y cargamos los datos tecnicos de la ficha
        fichaDatos.value = null;
        //fichaDatos.value= {...objeto,...especie};
        fichaDatos.value = objeto;
        // enviamos para filtrar
        // Limpiamos y cargamos las imagenes de la ficha
        imagenesFichaTecnicaVaciar()
        await storeArbores.setImagenes('Arbores/' + objeto.idDoc)
        for (let i = 0; i < storeArbores.imagenes.length; i++) {
            imagenesFichaTecnica.value.push(storeArbores.imagenes[i])
        }
    }

// Cargamos los datos y llamamos al buscador    
const loadPage = async () => {
  await storeArbores.setArbores();
  await storeArbores.getDownloadURL();
  storeGeneral.filtrarArbores();
};
loadPage();

const paginar = async () => {
  // alert('epa!')
  paginarDatos();
}
</script>
