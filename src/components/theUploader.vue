<template>
    <!-- subir una foto a firestore para luego utilizarla  -->
    <label for="subirImagen" class="subir-imagen-btn"><icono :icon="['fa', 'upload']"></icono> Subir Imagen</label>
    <input :multiple="multiple" name="subirImagen" type="file" accept="image/*" @change="subirFoto" id="subirImagen" :required="required">

</template>
<script setup>

defineProps({
    multiple:{
        type: Boolean,
        default: true,
    },
    required:{
        type: Boolean,
        default: false,
    }
});

const emits = defineEmits(['emitirFichero']);

const subirFoto = event => {
    if (event.target.files.length > 0) {
        emits('emitirFichero', event.target.files);
    }
}

</script>
<style scoped>
    .subir-imagen-btn svg{
        font-size: 1rem;
    }
</style>

