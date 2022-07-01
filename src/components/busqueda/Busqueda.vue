<template>
<h1>Busqueda</h1>
    <span class="buscador">
        <icono :icon="['fa', 'magnifying-glass']" @click="enviar"></icono>
        <input type="text" name="buscar" id="buscar" placeholder="Buscar" v-model.trim="enviarLetra.text" @keyup.enter="enviar">
        <select v-model="colecciones" name="especies" id="especies">
            <option value="Especies">Especies</option>
            <option value="Singulares">Singulares</option>
            <option @click="selector()" value="Parques">Parques</option>
        </select>
        <select v-if="colecciones === 'Especies' || colecciones === 'Singulares'" v-model="docs" name="especies" id="especies">
            <option value="nombre_comun">Nombre común</option>
            <option value="nombre_comun_gal">Nombre común Galego</option>
            <option value="especie">Especie</option>
            <option value="genero">genero</option>
        </select>
        <select v-if="colecciones === 'Parques'" v-model="docs" name="especies" id="especies">
            <option value="nombre">Nombre</option>
        </select>
        
    </span>
    <pre>Colección seleccionado: {{colecciones}}</pre>
    <pre>Documento seleccionado : {{docs}}</pre>
    <pre>{{busquedaRef}}</pre>
</template>

<script setup>
import { busquedaDatos } from "@/hook/firestore.hook";
import { ref, reactive } from "vue";

const colecciones = ref('Especies');
const docs = ref('nombre_comun')
// const parques = ref('nombre')



const selector = () => {
    if(colecciones.value === 'Parques') {
        return docs.value = 'nombre';
    }
}

const busquedaRef = ref(null);
let enviarLetra = reactive({
    text: ''
});
const enviar = () => {
    console.log(colecciones.value, docs.value, enviarLetra.text);
    // busquedaDatos(enviarColeccion.text, enviarDoc.text, enviarLetra.text);
    (async ()=>{
    try {
        busquedaRef.value = await busquedaDatos(colecciones.value, docs.value, enviarLetra.text);
    } catch (error) {
        console.log(error)
    }

})();
// console.log(enviarLetra.text)
// console.log(busquedaRef)
}
</script>