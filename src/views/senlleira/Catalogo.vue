<template>
    <FiltroBusquedaVue></FiltroBusquedaVue>
    <CatalogoUsuarioVue @mostrarFicha="mostrarFichaTecnica = true"></CatalogoUsuarioVue>
    <FichaTecnicaVue v-if="mostrarFichaTecnica" @cerrarFicha="mostrarFichaTecnica = false"></FichaTecnicaVue>
</template>

<script setup>
import {ref} from 'vue';
import CatalogoUsuarioVue from '@/components/catalogo/CatalogoUsuario.vue';
import FiltroBusquedaVue from '../../components/catalogo/FiltroBusqueda.vue';
import FichaTecnicaVue from '../../components/catalogo/FichaTecnica.vue';


const mostrarFichaTecnica = ref(false)

</script>