// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from 'pinia';
// importacion de la función del firebase para subir las fotos
import { subirFicheros, listAllUrls,getDownURL} from '@/hook/storage.hook';

import { addDocument, getDocuments, deleteDocument } from '@/hook/firestore.hook';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStoreSenlleiras = defineStore('subirFoto', {
    // other options...
    state: () => {
        return {
            senlleiras: [],
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
        async insertarSenlleira(datos) {
            return await addDocument("Singulares", datos)
        },
        async borrarSenlleira(ID){
            await deleteDocument("Singulares", ID);
        },
        
        /**
         * 
         * @returns array que contiene objetos con la informacion de las arboles senlleiras
         */
        async setSenlleiras(){
            if (this.senlleiras.length > 0) //Por si el array ya está cargado
                return
            this.senlleiras = await getDocuments("Singulares") 
            await this.getDownloadURL();
        },
        async setImagenes(uid) {
            this.imagenes = await listAllUrls(uid)
             
        },
        async getDownloadURL (){
           for(let i=0,tam=this.senlleiras.length;i<tam;i++){
                const url = this.senlleiras[i].imagen_url;
                this.senlleiras[i].google_url = await getDownURL(url);
           }
        }


    },
})