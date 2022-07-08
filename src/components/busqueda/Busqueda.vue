<template>
<h1>Busqueda</h1>
    <span class="buscador">
        <icono :icon="['fa', 'magnifying-glass']" @click="filtrar"></icono>
        <input type="text" name="buscar" id="buscar" placeholder="Buscar" v-model.trim="enviarLetra.text" @keyup.enter="filtrar()">
        <select v-model="categoria" name="especies" id="especies">
            <option value="especie">Especie</option>
            <option value="genero">Genero</option>
            <option value="nombre_arbol">Nombre arbol</option>
            <option value="nombre_comun">Nombre común</option>
            <option value="nombre_comun_gal">Nombre común Galego</option>
            <option value="ubicacion_parque">Ubicación<nav></nav></option>
        </select>
        <button class="filtrar" @click="filtrar()">Filtrar</button>
        
    </span>
    <ul>
        <li 
            v-for="(item, index) of tmp"
            :key="index"
        >
        <!-- {{item.idDoc}}-{{item.genero}} {{item.especie}} {{item.nombre_comun}} -->
         <pre>{{item}}</pre>
        </li>
    </ul>
</template>

<script setup>
// import { busquedaDatos } from "@/hook/firestore.hook";
// import { async } from "@firebase/util";
import { ref, reactive } from "vue";
import { useStoreArbores } from "../../stores/arbores";

const categoria = ref('nombre_arbol');
const enviarLetra = reactive({
    text: ''
});
const tmp = ref([]);
const storeArbores = useStoreArbores();


const loadPage = async () => {
    await storeArbores.setArbores();
    tmp.value = storeArbores.arbores; 
}

loadPage();


const filtrar = () => {
    tmp.value = storeArbores.arbores.filter((arbor)=>{
        return arbor[categoria.value].toLowerCase().includes(enviarLetra.text.toLowerCase())
    });
}
</script>