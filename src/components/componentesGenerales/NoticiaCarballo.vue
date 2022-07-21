<template>
<div class="noticia-component">
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
</template>

<script setup>
//Descomenta estas líneas si deseas encontrar el código en la BBDD del ID del árbol de conxo o búsca este id en firestore en su base de datos
//import {busquedaDatos} from "../../hook/firestore.hook";
import('@/assets/css/componente/noticia-arbol.css');

// (async()=>{
//     const res = await busquedaDatos("Arbores","nombre_arbol","Carballo do Banquete de Conxo");
//     console.log(res[0].idDoc);
// })()

</script>