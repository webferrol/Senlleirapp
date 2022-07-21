<template>
<div v-if="loading" class="noticia-component">
    <img src="../../assets/img/imagenes-portada/MIRADOR.jpg" alt="imagen mirador de conxo">
    <div class="noticia-block-txt">
        <h1>Carballo banquete de conxo</h1>
        <h3>Gañador árbore nacional 2022</h3>
        <router-link :to="{
            name:'FichaSenlleira',
            params:{'idDoc':'VDipVrgnJqjKrJQzn2Gc'},
        }">Ver árbore</router-link>
    </div>
</div>
<SkeletonInicioVue v-else="loading"></SkeletonInicioVue>
</template>

<script setup>
//Descomenta estas líneas si deseas encontrar el código en la BBDD del ID del árbol de conxo o búsca este id en firestore en su base de datos
//import {busquedaDatos} from "../../hook/firestore.hook";
import {ref} from 'vue';
import SkeletonInicioVue from '../skeleton/SkeletonInicio.vue';
import('@/assets/css/componente/noticia-arbol.css');

const loading = ref(false)

if(!loading.value) {
setTimeout(() => {
    loading.value = true;
}, 400);
}else{
    loading.value = true
}



// (async()=>{
//     const res = await busquedaDatos("Arbores","nombre_arbol","Carballo do Banquete de Conxo");
//     console.log(res[0].idDoc);
// })()

</script>