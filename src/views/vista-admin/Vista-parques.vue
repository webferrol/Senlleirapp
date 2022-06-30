<template>
  <div>
    <button class="admin-add" @click="añadirParque = true">Añadir Parque</button>
    <AdminCatalogoParquesVue></AdminCatalogoParquesVue>
    <FormParque v-if="añadirParque" @cerrarForm="añadirParque =false" @manipularFormulario="insertarParque" ></FormParque>


  </div>
</template>

<script setup >
import { ref, reactive, provide } from 'vue';
import FormParque from "@/components/admin/forms/FormParque.vue";
import AdminCatalogoParquesVue from "../../components/admin/tablas/AdminCatalogoParques.vue";
import { useStoreParques } from "@/stores/parques";
const añadirParque = ref(false)

//Llamada al store
const setParques = useStoreParques();

//Variables, constantes y provides
const form = reactive({
  id: null,
  nombre: "",
  tipoloxia: "",
  localizacion: "",
  cronoloxía: "",
  superficie: "",
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

//Finalizó el bloque de provides

const reset = () => {
  form.tipoloxia = "";
  form.localizacion = "";
  form.cronoloxía = "";
  form.superficie = "";
  form.id = null;
  form.nombre = "";
  form.descripcion = "";
  form.urlficha = "";
};

const insertarParque = async (tmpImagenes) => {
  form.id = Date.now();
  if (tmpImagenes !== null) {
    const file1 = tmpImagenes[0].name;
    const [ext, ...fileName] = file1.split('.').reverse();
    form.urlficha = `parques/${form.id}.${ext}`;
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
};

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

