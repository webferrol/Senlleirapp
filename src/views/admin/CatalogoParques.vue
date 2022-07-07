<template>
  <div>
    <button class="admin-add" @click="open = true">Añadir Parque</button>
    <AdminCatalogoParquesVue></AdminCatalogoParquesVue>
    <NuevoFormParque v-if="open" @cerrarForm="open = false" ></NuevoFormParque>
   
  </div>
</template>

<script setup >
import {ref} from 'vue';
import AdminCatalogoParquesVue from '@/components/admin/tablas/AdminCatalogoParques.vue';
import NuevoFormParque from '../../components/admin/forms/NuevoFormParque.vue';
const open = ref(false);

</script>
<style scoped>
.admin-add{
    background-color: var(--colorsecundario);
    color: white;
    font-size: 1.2rem;
    margin: 1rem;
    border-radius: 5px;
    transition: transform .3s linear;
    border: 2px solid black;
}
.admin-add:hover{
    transform: scale(1.1)
}
</style>

