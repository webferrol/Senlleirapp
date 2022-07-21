<template>
  <div class="parque"  v-if="parque">
    <h1 class="title">{{ parque.nombre }}</h1>

    <button class="button1" @click="handleUpdate">Asignar especies</button>
    <button class="button1" @click="handleDelete">Eliminar especies</button>

    <div class="listado">
      <ul>
        <li v-for="item of parque.especies" :key="item.idDoc">
          <span class="item-nombre"
            >{{ item.genero }} {{ item.especie }}</span
          >
          <span class="item-numero">{{ item.numero }}</span>
        </li>
      </ul>
    </div>
    <div class="container">
      <div class="formulario" v-for="item of form" :key="item.idDoc">
        <div>
          <input
            type="checkbox"
            
            v-model="item.checked"
            :value="item.idDoc"
          />
        </div>
        <div>{{ item.genero }} {{ item.especie }}</div>
        <div class="input-number">
          <input type="number" v-model="item.number" class="number" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useStoreParques } from "../../stores/parques";
import "@/assets/css/admin-css/parqueEspeciesView.css"

const route = useRoute();
const router = useRouter();
const store = useStoreParques();
const especies = ref([]);
const parque = ref(null);
const form = ref([]);

const handleChecked = idDoc => {
  if(parque.value.especies){
    const index = parque.value.especies.find(item=>item.idDoc===idDoc);
    //console.log(index)
    if(index) return {checked:true,numero:index.numero};
  }
  return {checked:false,numero:0};
}

const handleDelete = async () => {
  if (
    confirm("De verdade que desexa eliminar as especies") &&
    parque.value.idDoc
  ) {
    try {
      await store.deleteEspeciesParque(parque.value.idDoc);
      router.push({
        name: "admin-parque",
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const handleUpdate = async () => {
  const update = form.value.reduce((acumulador, actual) => {
    if (actual.checked && actual.number > 0) {
      acumulador.push({
        idDoc: actual.idDoc,
        genero: actual.genero,
        especie: actual.especie,
        numero: actual.number,
      });
      return acumulador;
    } else return acumulador;
  }, []);
  if (update.length) {
    try {
      store.updateEspeciesParque(parque.value.idDoc, update);
      router.push({
        name: "admin-parque",
      });
    } catch (error) {
      console.log(error);
    }
  }
};

//Cargamos especies
(async () => {
  try {
    parque.value = await store.getParque(route.params.idDoc);
    especies.value = await store.getAllEspecies();
    especies.value.forEach((item) => {
      const esp = handleChecked(item.idDoc);
      form.value.push({
        checked: esp.checked,
        idDoc: item.idDoc,
        genero: item.genero,
        especie: item.especie,
        number: esp.numero,
      });
    });
    //console.log(form.value)
  } catch (error) {
    console.log(error);
  }
})();
</script>

