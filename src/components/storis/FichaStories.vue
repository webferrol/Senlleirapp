<template>
    <div class="modal-stories">
        <article class="ficha-parques" v-for="(parque, index) in storeParques.parques">
        <p>{{parque.nombre}}</p>
        
        
        </article>
    </div>
</template>

<script setup>
import "@/assets/css/ficha-stories.css"
import { ref } from "vue";
import { useStoreParques } from "@/stores/parques"; 

const error = ref("");
const ruta = ref([]);

const storeParques = useStoreParques();
storeParques.setParques();
</script>
