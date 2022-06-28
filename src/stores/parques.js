// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from 'pinia';
import { subirFicheros, listAllUrls} from '@/hook/storage.hook';
import { cargarDatosFormulario, getDatos, deleteDatos } from '@/hook/firestore.hook';


// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStoreParques = defineStore('parques', {

    state: () => {
        return {
            parques: [],
            imagenes: []
        }

    },
    actions: {
        async insertarParque(datos) {
            return await cargarDatosFormulario("Parques", datos)
        },
        async borrarParque(ID) {
            await deleteDatos("Parques", ID);
        },
        //Esta funcion es para subir la imagen de los parques con ID y su extension.
        async subirParque({id, file}){
            const file1 = file.name;
            const [ext, ...fileName] = file1.split('.').reverse();
            await subirFicheros(file, `parques/${id}.${ext}`)
            // console.log(ext)

        },
        async listarImagenes (uid) {
            this.imagenes = await listAllUrls(uid)
        },

        

    }
}

)