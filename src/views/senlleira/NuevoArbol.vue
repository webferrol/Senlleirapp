<template>
   <div class="formsenlleira" v-if="loaded"> Cargando... </div>

    <form id="senlleiras" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <span class="h2-background"> <h2>Nova árbore </h2> <icono :icon="['fa', 'leaf']"></icono></span>
        
        <fieldset class="data-senlleira --localizacion">
            <legend> Datos da árbore </legend>
            <div class="senlleira-nombre-cientifico">
                 <label for="arbore" class="form-label" required> Nome da árbore <span data-set="Campo obligatorio">*</span></label>
                <input v-model="form.nombre_arbol" type="text" required name="arbore" id="arbore"
                 placeholder="indica o nome da arbore" />
            
                <label for="especie" class="form-label">Nome científico <span data-set="Campo obligatorio">*</span></label>
                <select @change="handleSelect" v-model="form.idEspecie" name="especie" id="especie" required>
                    <option class="especie-option" v-for="valor in storeEspecies.especies" :key="valor.idDoc" :value="valor.idDoc">
                        {{ valor.genero }} {{ valor.especie }}</option>
                </select>

                <label for="nome" class="form-label"> Nome en galego</label>
                <select @change="handleSelect" v-model="form.idEspecie" name="nome" id="nombre-gallego" required>
                    <option v-for="valor in storeEspecies.especies" :key="valor.idDoc" :value="valor.idDoc">
                        {{ valor.nombre_comun_gal }}
                    </option>
                </select>

                <label for="nome" class="form-label"> Nome en casteln</label>
                <select @change="handleSelect" v-model="form.idEspecie" name="nome" id="nombre-castellano" required>
                    <option v-for="valor in storeEspecies.especies" :key="valor.idDoc" :value="valor.idDoc">
                        {{ valor.nombre_comun }} </option>
                </select>
            </div>
        </fieldset>
        <fieldset class="data-senlleira">
            <legend>Ubicación</legend>

            <div class="senlleira-localizacion">
                <label for="zona" class="form-label" required> Zona xeográfica <span data-set="Campo obligatorio">*</span></label>
                <input v-model="form.zona_geografica" type="text" required name="zona" id="zona"
                    placeholder="Zona geográfica" />       

                <label for="localizacion" class="form-label"> Localizacion, Parque <span data-set="Campo obligatorio">*</span></label>
                <select
                @change="form.localizacion= $event.target.options[$event.target.selectedIndex].text"
                 v-model="form.idParque" name="localizacion" id="localizacion" required>
                    <option v-for="valor in storeParques.parques" :key="valor.idDoc" :value="valor.idDoc">
                        {{ valor.nombre }} </option>
                </select>
                <input type="hidden" v-model="form.localizacion">

                <label for="latitud" class="form-label">Latitude <span data-set="Campo obligatorio">*</span></label>
                <input v-model.number="form.latitud" type="number" required  name="latitud" id="latitud"
                    placeholder="indicar latitude" />     

                <label for="longitud" class="form-label">Lonxitude <span data-set="Campo obligatorio">*</span></label>
                <input v-model.number="form.longitud" type="number" required  name="longitud" id="longitud"
                    placeholder="indicar lonxitude" />  
            </div>
        </fieldset>
        <fieldset>

            <legend> Imaxe </legend>
            <div class="data-senlleira">
                <theUploader @emitirFichero="gestionFoto"></theUploader>
                <div v-if="error.error" class="error"> {{ error.message }} </div>
            </div>
            <div v-if="spinner" class="spinner"> Cargando.... </div>
        </fieldset>
        <button class="btn-form">Publicar Arbore</button>   
    </form>
</template>

<script setup>
import TheUploader from '@/components/theUploader.vue';
import {useStoreArbores} from '@/stores/arbores';
import {useStoreEspecies} from '@/stores/especies';
import {useStoreParques} from '@/stores/parques';
import {useStoreSenlleiras} from '@/stores/senlleiras';
import { reactive,ref } from 'vue';
import {updateDocument} from '@/hook/firestore.hook'
import "@/assets/css/formularioSenlleira.css";

// llamada del store
const storeSenlleiras = useStoreSenlleiras();
const storeEspecies = useStoreEspecies();
const storeParques = useStoreParques();
const storeArbores = useStoreArbores();

storeParques.setParques();
storeSenlleiras.setSenlleiras();
storeArbores.setArbores();

const form = reactive({
    genero: '',
    especie: '',
    idEspecie: 0,
    idParque: 0,
    nombre_arbol:'',
    nombre_comun: '',
    nombre_comun_gal: '',
    zona_geografica: '',
    localizacion: '',
    imagen_url:'',
    longitud:'',
    latitud:'',

})

// indica todos los errores que se presenten
const error = ref({
    error: false,
    message: '',
});
let tmpImagenes = null; 
const spinner = ref(false);
const loaded = ref(false);

const reset = () => {
    form.genero = '';
    form.especie = '';
    form.idEspecie = 0;
    form.idParque= 0,
    form.nombre_arbol='',
    form.nombre_comun = '';
    form.nombre_comun_gal = '';
    form.zona_geografica = '';
    form.localizacion = '';
    form.imagen_url='';
    form.latitud ='';
    form.longitud ='';
}

// esta funcion ayuda a encuentrar dentro de un array el idDoc necesario para poder obtener los datos que necesito 
const handleSelect = (e) => {
    if (storeEspecies.especies.length) {
        const especie = storeEspecies.especies.find(item => item.idDoc == e.target.value);
        // console.log('-->',especie)
        form.genero = especie?.genero;
        form.especie = especie?.especie;
        form.nombre_comun = especie?.nombre_comun;
        form.nombre_comun_gal = especie?.nombre_comun_gal;
    }
}

const gestionFoto = async (imagenes) => {
    try {
        error.value = { error: false, message: '', }
        tmpImagenes = imagenes;
    } catch (e) {
        error.value.error = true;
        error.value.message = e.message;
    }
};
const handleSubmit = async () => {
    //Se comprueban errores antes de enviar nada
    //Enviar
    if (storeEspecies.especies.length) {      
        const data = await storeArbores.insertarArbore(form);
        if(data.id){
            const imagen_url= `Arbores/${data.id}/${tmpImagenes[0].name}`
            await updateDocument(data.id,'Arbores',{'imagen_url':imagen_url});
        }
        if (tmpImagenes !== null && data.id) {
            try {
                error.value = { error: false, message: '', }
                spinner.value = true;
                loaded.value = true;
                for(let i =0,tam=tmpImagenes.length; i<tam; i++){
                await storeArbores.subirFoto({
                    ref: `Arbores/${data.id}`,
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
};

storeEspecies.setEspecies().then().catch(e => alert(e));

</script>

