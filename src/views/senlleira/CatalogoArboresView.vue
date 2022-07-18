<template>
  <h1 class="tittle-section">Propostas da cidadanía</h1>
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
        <span class="lugar">
          <icono :icon="['fa', 'location-dot']"></icono>
          <h4 class="arbol-lugar">{{ senlleira.ubicacion_parque }}</h4>
        </span>
      </div>
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
    await storeArbores.setPropostasCidadas();
    storeGeneral.filtrarArbores();
    loadGaleria.value = true;
}
loadPage();
</script>