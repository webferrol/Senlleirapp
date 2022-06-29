<template>
  <h1>Nuevo Parque</h1>
  <AltaParque @manipularFormulario="insertarParque"></AltaParque>
</template>

<script setup>
import AltaParque from "@/components/forms/FormParque.vue";
import { useStoreParques } from "@/stores/parques";
import { ref, reactive, provide } from "vue";

//Llamada al store
const setParques = useStoreParques();

//Variables, constantes y provides
const form = reactive({
  id: null,
  nombre: "",
  descripcion: "",
  urlficha: "",
});
provide("form", form);

const error = ref({
  error: false,
  message: "",
});
provide("error", error);

const spinner = ref(false);
provide("spinner", spinner);

const loaded = ref(false);
provide("loaded", loaded);

//Finalizo el bloque de provides

const reset = () => {
  form.id = null;
  form.nombre = "";
  form.descripcion = "";
  form.urlficha = "";
};

const insertarParque = async (tmpImagenes) => {
  form.id = Date.now();
  if(tmpImagenes!==null){
    form.urlficha = `parques/${form.id}/${tmpImagenes[0].name}`;
  }
  await setParques.insertarParque(form);
  if (tmpImagenes !== null && form.id) {
    try {
      error.value = { error: false, message: "" };
      spinner.value = true;
      loaded.value = true;
      for (let i = 0, tam = tmpImagenes.length; i < tam; i++) {
        await setParques.subirParque({
          id: `${form.id}`,
          file: tmpImagenes[i],
        });
      }
      spinner.value = false;
      reset();
    } catch (e) {
      error.value.error = true;
      error.value.message = e.message;
    } finally {
      loaded.value = false;
    }
  }
}
</script>

