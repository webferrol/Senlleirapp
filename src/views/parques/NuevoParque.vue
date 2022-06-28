<template>
  <h1>Nuevo Parque</h1>

  <AltaParque @manipularFormulario="insertarParque" ></AltaParque>

</template>

<script setup>
import AltaParque from "@/components/forms/AltaParque.vue"
import { reactive, provide } from "vue";

const form = reactive({
  id: null,
  nombre: "",
  descripcion: "",
  urlficha: "",
});

provide('form',form);

const reset = () => {
  form.id = null;
  form.nombre = "";
  form.descripcion = "";
  form.urlficha = "";
};




const insertarParque = parametro => {
//       form.id = Date.now();
//   form.urlficha = `parques/${form.id}/${tmpImagenes[0].name}`;
//   await setParques.insertarParque(form);
//   if (tmpImagenes !== null && form.id) {
//     try {
//       error.value = { error: false, message: "" };
//       spinner.value = true;
//       loaded.value = true;
//       for (let i = 0, tam = tmpImagenes.length; i < tam; i++) {
//         await setParques.subirParque({
//           id: `${form.id}`,
//           file: tmpImagenes[i],
//         });
//       }
//       spinner.value = false;
//       reset();
//     } catch (e) {
//       error.value.error = true;
//       error.value.message = e.message;
//     } finally {
//       loaded.value = false;
//     }
//   }
// };

// const cargarParque = async (imagenes) => {
//   try {
//     error.value = { error: false, message: "" };
//     tmpImagenes = imagenes;
//     //await store.subirFoto(imagen);
//   } catch (e) {
//     error.value.error = true;
//     error.value.message = e.message;
//   }
}
</script>

