<template>
  <h1 class="tittle-section">Catálogo de Senlleiras</h1>
  <div class="catalogo-section-component" v-if="loadGaleria">
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
        <span class="lugar" v-if="senlleira.ubicacion_parque">
          <icono :icon="['fa', 'location-dot']"></icono>
          <h4 class="arbol-lugar">{{ senlleira.ubicacion_parque }}</h4>
        </span>
      </div>
      <span class="categoria" v-if="senlleira.senlleira">
          <icono :icon="['fa', 'registered']"></icono>
          <h4 class="arbol-categoria">Rexistrado no catálogo oficial</h4>
        </span>
    </div>
  </div>
  <SkeletonCatalogoVue v-else="loadGaleria"></SkeletonCatalogoVue>

  
</template>

<script setup>
//Dependencias
import { ref } from "vue";
import { useStoreArbores } from "@/stores/arbores.js";
import { useStoreGeneral } from "@/stores/general";
import SkeletonCatalogoVue from "@/components/skeleton/SkeletonCatalogo.vue";
import "@/assets/css/catalogo/catalogo.css";
import { useRouter } from "vue-router";
const loadGaleria = ref(false)
const router = useRouter();
const storeArbores = useStoreArbores();
const storeGeneral = useStoreGeneral();


const cargarDatosFicha = async (doc) => {
    router.push({
    name: 'FichaSenlleira',
    params:{
      idDoc:doc.idDoc
    }
  });  
}


const loadPage = async () => {
    await storeArbores.setSenlleirasPropostas();
    storeGeneral.filtraArboresSenlleirasPropostas();
    loadGaleria.value = true;
}
loadPage();
</script>
