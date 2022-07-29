<template>
    <div>
            <h1>Paginación prueba</h1>
            <br>
            <!-- <button @click="handlePaginar">ver</button>  -->
            <br>
            <div v-for="(arbol, index) in storeGeneral.tmpPag.data"
      :key="index">
                <pre>{{arbol}}</pre>
            </div>
            <br>
            <button @click="next" v-if="storeGeneral.btnNext">next</button>
            <ul>
              <li v-for="i in pages" :key="i" >
              <a v-if="storeGeneral.actualPage === i">{{i}}</a><a @click="paginationLink(i)">{{i}}</a>
              </li>
            </ul>
            <button @click="previous" v-if="storeGeneral.btnPrevious">previous</button>
            <br>

          
    </div> 
</template>

<script setup>
//Dependencias
import { async } from "@firebase/util";
import { computed } from "vue";
import { useStoreGeneral } from "../stores/general";



const storeGeneral = useStoreGeneral();



  // Cargamos los datos y llamamos a la paginación    
const loadPage = async () => {
  try {
    await storeGeneral.setPagination();
    await storeGeneral.setTotalPages(); 
    storeGeneral.filtrarEspecies();
  } catch (error) {
    console.log("error--->",error);
  }
  
};
loadPage();


const pages = computed(() => Math.ceil(storeGeneral.total/storeGeneral.limit));
const next = async () => {
  await storeGeneral.setNextPagination(storeGeneral.tmpPag.idDocLast);
  storeGeneral.actualPage++;
  if(storeGeneral.actualPage>1){
    storeGeneral.btnPrevious = true;
  }
  if(storeGeneral.actualPage===pages.value){
    storeGeneral.btnNext = false;
  }
}

const previous = async () => {
  await storeGeneral.setPreviousPagination(storeGeneral.tmpPag.idDocFirst);
  storeGeneral.actualPage--;
  if(storeGeneral.actualPage===1){
    storeGeneral.btnPrevious = false;
  }
  if(storeGeneral.actualPage<pages.value){
    storeGeneral.btnNext = true;
  }
}

const paginationLink = async (page) => {
  await storeGeneral.setPaginationNumbers(page)
}
</script>