<template>
  <h1 class="tittle-section">Catalogo especies</h1>
  <div class="catalogo-especies-component" v-if="loadGaleria">
    <div class="especie-catalogo-element" data-titulo="Mostrar" title="Máis info"
      v-for="(especie, index) in storeGeneral.tmp" :key="index" identificador="especie.id"
      @click="cargarDatosFicha(especie)">
      <div class="especie-info">
        <h4 class="arbol-lugar">{{ especie.genero }} {{ especie.especie }}</h4>
        <h5> {{ especie.nombre_comun_gal }}</h5>
      </div>
    </div>
  </div>
  <SkeletonCatalogoEspeciesVue v-else="loadGaleria"></SkeletonCatalogoEspeciesVue>
 

</template>

<script setup>
//Dependencias
import { ref } from "vue";
import { useStoreEspecies } from "../../stores/especies";
import { useStoreGeneral } from "../../stores/general";
import "@/assets/css/catalogo/catalogo-especies.css";
import SkeletonCatalogoEspeciesVue from "../skeleton/SkeletonCatalogoEspecies.vue";
import { useRouter } from "vue-router";


const loadGaleria = ref(false);
const router = useRouter();
const storeEspecies = useStoreEspecies();
const storeGeneral = useStoreGeneral();


const cargarDatosFicha = async (doc) => {
router.push({
    name: 'FichaEspecie',
    params:{
      idDoc:doc.idDoc
    }
  });

}

const loadPage = async () => {
  try {
    await storeEspecies.setEspecies();
    loadGaleria.value = true;
    storeGeneral.filtrarEspecies();
  } catch (error) {
    console.log("error--->",error);
  }
  
};
loadPage();
</script>
