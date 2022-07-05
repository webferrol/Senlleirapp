<template>
    <div class="formsenlleira" v-if="loaded"> Cargando... </div>

    <div class="form-background">
        <form id="senlleiras" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
            <span class="h2-background"> <h2>Formulario senlleira </h2> <icono @click="cerrarForm" :icon="['fa', 'xmark']"></icono></span>
        
            <fieldset class="data-senlleira --localizacion">
                <legend> Datos senlleira </legend>
                <div class="senlleira-nombre-cientifico">
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
                    <label for="nome" class="form-label"> Nome en castelan</label>
                    <select @change="handleSelect" v-model="form.idEspecie" name="nome" id="nombre-castellano" required>
                        <option v-for="valor in storeEspecies.especies" :key="valor.idDoc" :value="valor.idDoc">
                            {{ valor.nombre_comun }} </option>
                    </select>
                    <label for="arbore" class="form-label" required> Nome da árbore <span data-set="Campo obligatorio">*</span></label>
                    <input v-model="form.nombre_arbol" type="text" required name="arbore" id="arbore"
                        placeholder="indica o nome da arbore" />
                    <label for="altura" class="form-label">Altura (metros)</label>
                    <input id="altura" name="altura" v-model.number="form.altura" type="number"
                    step="any" placeholder="31"/>
        
                    <label for="perimetroTronco" class="form-label">Diámetro do tronco (metros)</label>
                    <input id="perimetroTronco" name="perimetroTronco" v-model.number="form.diametroTronco" type="number"
                        step="any" placeholder="10,5"  />
                </div>
            </fieldset>
            <fieldset class="data-senlleira">
                <legend>Ubicación</legend>
                <div class="senlleira-localizacion">
                    <label for="zona" class="form-label" required> Zona xeográfica <span data-set="Campo obligatorio">*</span></label>
                    <input v-model="form.zona_geografica" type="text" required name="zona" id="zona"
                        placeholder="Zona geográfica" />
                    <label for="localizacion" class="form-label"> Localizacion <span data-set="Campo obligatorio">*</span></label>
                    <select 
                    @change = "form.localizacion = $event.target.options[$event.target.selectedIndex].text"                    
                    v-model="form.idParque" name="localizacion" id="localizacion" required>
                        <option v-for="valor in storeParques.parques" :key="valor.idDoc" :value="valor.idDoc">
                            {{ valor.nombre }} </option>
                    </select>
                    <input type="hidden" v-model="form.localizacion">
                </div>
            </fieldset>
            <fieldset class="data-senlleira">
                <legend>Descripción</legend>
                <div class="senlleira-localizacion">
                    <textarea v-model="form.descripcion" name="descripcion" id="descripcion" cols="30" rows="10" placeholder="breve descripción da árbore"></textarea>
                </div>
            </fieldset>
            <fieldset class="data-senlleira">
                <legend>Esta árbore é </legend>
                <div class="senlleira-arbore">
                     <input
                             type="checkbox"
                             v-model="form.senlleira"
                             name="senlleira"
                             id="senlleira"
                        />&nbsp;
                        <label class="form-label" for="senlleira">Senlleira</label>
                         <input
                             type="checkbox"
                             v-model="form.propSenlleira"
                             name="propSenlleira"
                             id="propSenlleira"
                        />&nbsp;
                        <label class="form-label" for="propSenlleira">Proposta de senlleira</label>
        
                </div>
            </fieldset>
            <fieldset>
                <legend> Imaxe </legend>
                <div class="data-senlleira">
                    <theUploader @emitirFichero="gestionFoto"></theUploader>
                    <div v-if="error.error" class="error">
                        {{ error.message }} </div>
                </div>
                <div v-if="spinner" class="spinner"> Cargando.... </div>
            </fieldset>
            <button class="btn-form">Publicar Arbol</button>
            <!-- {{form.genero}}  {{form.especie}} {{form.nombre_comun}} {{form.nombre_comun_gal}} -->
        </form>
    </div>

</template>

<script setup>
import TheUploader from '@/components/theUploader.vue';
import { useStoreSenlleiras } from '@/stores/senlleiras';
import { useStoreParques } from '@/stores/parques';
import { useStoreEspecies } from '@/stores/especies';
import { reactive, ref } from 'vue';
import "@/assets/css/formularioSenlleira.css";
import { updateDocument } from '../../../hook/firestore.hook';

const emits = defineEmits(['cerrarForm']);

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
    imagen_url: ``,
    altura:'',
    diametroTronco:'',
    descripcion:'',
    senlleira: false,
    propSenlleira: false,

})
// llamada del store
const storeSenlleiras = useStoreSenlleiras();
const storeEspecies = useStoreEspecies();
const storeParques = useStoreParques();
const loaded = ref(false);

// indica todos los errores que se presenten
const error = ref({
    error: false,
    message: '',
});



//Cargamos parques
storeParques.setParques();

let tmpImagenes = null; //variable que al principio está vacia
const spinner = ref(false);

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
    form.imagen_url = '';
    form.altura ='';
    form.diametroTronco ='';
    form.descripcion ='';
    form.senlleira = false;
    form.propSenlleira = false;

}


const gestionFoto = async (imagenes) => {
    try {
        error.value = { error: false, message: '', }
        tmpImagenes = imagenes;
        //await store.subirFoto(imagen);
    } catch (e) {
        error.value.error = true;
        error.value.message = e.message;
    }
};

// esta funcion encuentra dentro del array de espacies el id necesario para poder obtener los 
//  datos que necesito para la base de datos de senlleira
const handleSelect = (e) => {
    if (storeEspecies.especies.length) {
        const especie = storeEspecies.especies.find(item => item.idDoc == e.target.value);
        // console.log(especie)
        form.genero = especie?.genero;
        form.especie = especie?.especie;
        form.nombre_comun = especie?.nombre_comun;
        form.nombre_comun_gal = especie?.nombre_comun_gal;
    }
    //const datosEspecies = e.target.value)
}

const handleSubmit = async () => {
    //Se comprueban errores antes de enviar nada
    //Enviar
    if (storeEspecies.especies.length) {
        const data = await storeSenlleiras.insertarSenlleira(form);
        if(data.id){
            const imagen_url= `senlleiras/${data.id}/${tmpImagenes[0].name}`
            await updateDocument(data.id,"Singulares",{'imagen_url':imagen_url});
        }
        
            if (tmpImagenes !== null && data.id) {
            try {
                error.value = { error: false, message: '', }
                spinner.value = true;
                loaded.value = true;
                for(let i =0,tam=tmpImagenes.length; i<tam; i++){
                await storeSenlleiras.subirFoto({
                    ref: `senlleiras/${data.id}`,
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

const cerrarForm = () => {
    emits('cerrarForm');
}

storeEspecies.setEspecies().then().catch(e => alert(e));
</script>

