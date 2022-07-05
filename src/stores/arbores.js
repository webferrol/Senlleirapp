// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from 'pinia';
// importacion de la función del firebase para subir las fotos
<<<<<<< HEAD
import { subirFicheros, listAllUrls,getDownURL} from '@/hook/storage.hook';
import { addDocument, getDocuments, deleteDocument } from '@/hook/firestore.hook';
=======
import { subirFicheros, listAllUrls} from '@/hook/storage.hook';

import { addDocument, getDocuments, deleteDocument} from '@/hook/firestore.hook';

>>>>>>> 7a58f469ab5c7a5f4f2810e67d10a7a1936bee6f

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStoreArbores = defineStore('arbores', {
    // other options...
    state: () => {
        return {
            arbores: [],
            imagenes: []
        }
    },
    actions: {
        /**subir fotos al storage de firebase 
         * 
         * @param {*} ref hace referencia al id de cada senlleira  y su foto
         * @param {*} file referencia al nombre de cada senlleira
         */
        async subirFoto({ ref, file }) {
            await subirFicheros(file, `${ref}/${file.name}`)
        },
        //subir formulario al firestore de firebase 
        /**
         * 
         * @param {object} datos datos de la senlleira
         * @returns los datos de la senlleira que se meten y el catalogo al que se suben
         */
        async insertarArbore(datos) {
            return await addDocument("Arbores", datos)
        },
        async borrarArbore(ID){
            await deleteDocument("Arbores", ID);
        },
        
        /**
         * 
         * @returns array que contiene objetos con la informacion de las arboles senlleiras
         */
        async setArbores(){
            if (this.arbores.length > 0) //Por si el array ya está cargado
                return
            this.arbores = await getDocuments("Arbores") 
           
        },
        async setImagenes(uid) {
            this.imagenes = await listAllUrls(uid)
             
        },
     

    },
})
