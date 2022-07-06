// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from 'pinia';
// importacion de la función del firebase para subir las fotos
import { subirFicheros, listAllUrls,getDownURL, deleteFile} from '@/hook/storage.hook';

import { addDocument, getDocuments, deleteDocument, updateDocument} from '@/hook/firestore.hook';


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
         * @param {*} ref hace referencia al id de cada senlleira  
         * @param {*} file referencia al nombre de cada senlleira
         */
        async subirFoto({ ref, file }) {
            await subirFicheros(file, `${ref}/${file.name}`)
        },

        // borrar fotos del storage
         async borrarFoto(ref){
           await deleteFile(ref);
         },

        //subir formulario al firestore de firebase 
        /**
         * 
         * @param {object} datos datos de la senlleira
         * @returns los datos de la senlleira que se meten y el catalogo al que se suben
         */
        async insertarArbore(datos,fileName) {
            const data = await addDocument("Arbores", datos);
            if (data.id && fileName.length) {
                const storage_ref = `Arbores/${data.id}/${fileName}`;
                await updateDocument(data.id, "Arbores", {'storage_ref': storage_ref });//creado la referencia
            }  
            return data;
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
        async getDownloadURL (){
            for(let i=0,tam=this.arbores.length;i<tam;i++){
                 const ref = this.arbores[i].storage_ref;
                 this.arbores[i].google_url = await getDownURL(ref);
            }
         }
    },
})
