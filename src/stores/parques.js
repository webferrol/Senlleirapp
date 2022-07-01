// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from 'pinia';
import { subirFicheros, listAllUrls } from '@/hook/storage.hook';
import { cargarDatosFormulario, getDatos, deleteDatos } from '@/hook/firestore.hook';


// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
import { getDownURL } from "@/hook/storage.hook.js"
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
        // -> Funcion donde introducimos los mapas de los parques y sus datos <- //
        async setParques() {
            if (this.parques.length > 0) //Por si el array ya está cargado
                return
            this.parques = await getDatos("Parques");
            for (let i = 0; i < this.parques.length; i++) {
                {
                    try {
                        if (this.parques[i].urlficha)
                            this.parques[i].url_google = await getDownURL(this.parques[i].urlficha);
                    } catch (error) {
                        console.log(error)
                    }

                }
            }
        },
        //Esta funcion es para subir la imagen de los parques con ID y su extension.
        async subirParque({ ref, file }) {
            // const file1 = file.name;
            // const [ext, ...fileName] = file1.split('.').reverse();
            await subirFicheros(file,`${ref}/${file.name}`)
            // console.log(ext)

        },
        async listarImagenes(uid) {
            this.imagenes = await listAllUrls(uid)
        },



    }
}

)