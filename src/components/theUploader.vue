<template>
    <!-- subir una foto a firestore para luego utilizarla  -->
    <!-- <label for="subirImagen" class="subir-imagen-btn"><icono :icon="['fa', 'upload']"></icono> Subir Imagen</label> -->
    <input multiple name="subirImagen" type="file" accept="image/*" @change="subirFoto" id="subirImagen">

</template>
<script setup>

const emits = defineEmits(['emitirFichero']);

const subirFoto = event => {
    if (event.target.files.length > 0) {
        emits('emitirFichero', event.target.files);
    }
}

</script>
<style scoped>
/* #subirImagen {
    width: 0;
    height: 0;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
} */

/* .subir-imagen-btn{
    display: flex;
    width: fit-content;
    justify-content: center;
    align-items: center;
    margin:  auto;
    cursor: pointer;
    background-color: var(--colorclaro);
    border-radius: 5px;
    gap: .25rem;
    padding: .5rem .75rem;
    font-size: 1.1rem;
    box-shadow: inset -1px -1px  5px 1px rgba(150,150,150, .7);
} */
    .subir-imagen-btn svg{
        font-size: 1rem;
    }
</style>

