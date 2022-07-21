<template>
    <div>
            <h1>Paginación prueba</h1>
            <br>
            <button @click="handlePaginar">ver</button> 
            <br>
            <div v-for="(arbol, index) in storeGeneral.tmpPag"
      :key="index">
                <pre>{{arbol}}</pre>
            </div>
            <br>
            <button @click="next">next</button>
            <!-- <button @click="previous">previous</button> -->
            <br>

          
    </div> 
</template>

<script setup>
//Dependencias
import { ref } from "vue";
import { useStoreArbores } from "@/stores/arbores.js";
import { db } from "../hook/firebase";
import { collection, addDoc, getDocs, getDoc, deleteDoc, doc, updateDoc, query, where, orderBy, limit, startAfter } from "firebase/firestore";
// import { useStoreEspecies } from "../../stores/especies";
// import FichaTecnicaVue from "./FichaTecnica.vue";
import { useStoreGeneral } from "../stores/general";
// import { paginarDatos } from "../../hook/firestore.hook"

//const storeArbores = useStoreArbores();
// const storeEspecies = useStoreEspecies();
const storeGeneral = useStoreGeneral();


// Cargamos los datos y llamamos al buscador    
// const loadPage = async () => {
//   await storeArbores.setArbores();
// //   await storeArbores.getDownloadURL();
// //   storeGeneral.filtrarArbores();
// };
// loadPage();

const handlePaginar = async () => {
  await storeGeneral.setPagination();
  console.log(storeGeneral.tmpPag);
}

const next = async () => {
  await storeGeneral.setNextPagination();
  console.log(storeGeneral.tmpPag);
}

// const previous = async () => {
//   await storeGeneral.setPreviousPagination();
//   console.log(storeGeneral.tmpPag)
// }

// let pages = null;
//   const datos = {
//     tmp: [],
//     last: []
//   }

// const handlePaginar = async() => {
//   const setData = paginarDatos();
//     pages = await setData.getFirstPage();
//     console.log(pages)
// }
// const next = async () => {
//     const setData = paginarDatos()
//     pages = await setData.nextPage(pages.last);
    
//     console.log(pages)
// }


// const paginarDatos = ($colection="Parques", $orderby="idDoc",$limit=3) => {
//   const tmp = [];
  
//     // alert('epa!')
//   const getFirstPage = async () =>{
//     //console.log(tmp)
//     const first = query(collection(db, $colection), orderBy($orderby), limit($limit));
//     const querySnapshot = await getDocs(first);
//     console.log(querySnapshot.size)
//     const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
//     querySnapshot.forEach((doc) => {
//       tmp.push({
//         idDoc: doc.id,
//         ...doc.data(),
//       });
      
//     });
//     return {
//       pages: tmp,
//       last: lastVisible
//     }
//   }
//   const nextPage = async (last) => {
//     const nexts = query(collection(db, $colection),
//     orderBy($orderby),
//     startAfter(last),
//     limit($limit));

//     // console.log(nexts)
    
//     const querySnapshot = await getDocs(nexts);
//     const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
//     querySnapshot.forEach((doc) => {
//       tmp.push({
//         idDoc: doc.id,
//         ...doc.data(),
//       });
      
//     });
//     return {
//       pages: tmp,
//       last: lastVisible
//     }
//   }

  
//   return {
//     getFirstPage, nextPage,
//   }
// }
</script>