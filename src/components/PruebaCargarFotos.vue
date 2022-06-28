<script setup>
// para poder leer todas las fotos del storage senlleiras
import { ref } from 'vue';
import { listAllUrls } from '../hook/storage.hook';


// uso un array para que se pueda leer mas de una foto
const rutas = ref([]);
const error = ref('');


// cargar las fotos para que se lean
const leerFotos = async () => {
         try {
        error.value = '';
        rutas.value =  await listAllUrls(`senlleiras/id`);
    //  console.log(rutas.value)
    } catch (e) {
        error.value = e;
        
    }
    
    // try {
    //     error.value = '';
    //     rutas.value.length =  await listAllUrls(`senlleiras/id/`);
    // //  console.log(rutas.value)
    // } catch (e) {
    //     error.value = e;
        
    // }
}

leerFotos();

</script>

 <template>
    <div >
        <h1 class="titulo">Imagenes</h1> 
            <strong>{{ error }}</strong> 
       <img v-for="(ruta, index) in rutas" :key="index" :src="ruta" alt="no se encontraron fotos">
           {{rutas}}

   </div> 
</template>

<style scoped>
img{
    width: 200px;
    height: 200px;
    object-fit: cover;
}
</style>