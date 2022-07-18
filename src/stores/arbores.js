// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from 'pinia';
// importacion de la función del firebase para subir las fotos
import { subirFicheros, listAllUrls,getDownURL, deleteFile,listAllRef} from '@/hook/storage.hook';

import { addDocument, getDocuments,getDocumentsWhere,deleteDocument, updateDocument} from '@/hook/firestore.hook';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';



// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStoreArbores = defineStore('arbores', {
    // other options...
    state: () => {
        return {
            arbores: [],//Todas as árbores. Senllerias, propostas_senlleiras, y cidadás
            arboresSenlleirasPropostas: [], //Arbores que teñen a propiedade propuestas_senlleiras como true
            arboresParticipacionCidada: [], //Arbores que teñen a propiedade propuestas_senlleiras como false
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
            //console.log(`${ref}/${file.name}`)
            await subirFicheros(file, `${ref}/${file.name}`)
        },

        //borrar una foto del storage
         async borrarFoto(ref){
           await deleteFile(ref);
         },

        /**subir formulario al firestore de firebase 
         * 
         * @param {object} datos datos de la senlleira
         * @returns los datos de la senlleira que se meten y el catalogo al que se suben
         */
        async insertarArbore(datos,fileName) {
            const data = await addDocument("Arbores", datos);
            const docRef = {idDoc: data.id, ...datos};
            this.arbores.push(docRef)
            if (data.id && fileName.length) {
                const storage_ref = `Arbores/${data.id}/${fileName}`;
                await updateDocument(data.id, "Arbores", {'storage_ref': storage_ref });//creado la referencia
            }  
            return data;
            
        },
          /**
         * Actualizamos un campo "google_url" del documento de Arbores con una estructura parecida a esta "`Arbores/${data.id}/${fileName}`"
         * @param {*} storage_ref String 
         */
           async google_url_save(id,storage_ref){
            //console.log(storage_ref)
            const url = await getDownURL(storage_ref);
            //console.log(url)
            await updateDocument(id, "Arbores", {'google_url': url });//creado la referencia
        },

        // funcion para eliminar el árbol(fotos e información)
        async borrarArbore(ID){
            // borra las fotos del storage
            const refs = await listAllRef(`Arbores/${ID}`);
            refs.forEach(async (ref) => {
                await deleteFile(ref);
            });
            // borra la informacción del firestore
            await deleteDocument("Arbores", ID);
            const indice = this.arbores.findIndex(arbore => (arbore.idDoc === ID));
            this.arbores.splice(indice,1);
        },
        
        /**
         * 
         * @returns array que contiene objetos con la informacion de las arboles en general
         */
        async setArbores(publicado=false){
            // if (this.arbores.length > 0) //Por si el array ya está cargado
            //     return
            if(publicado)
                this.arbores = await getDocumentsWhere("Arbores","publicado",true); 
            else    
                this.arbores = await getDocuments("Arbores");
           
        },
        /**
         * 
         * @returns array que contiene objetos con la informacion de las arboles senlleiras
         */
         async setSenlleiras(){
            // if (this.arbores.length > 0) //Por si el array ya está cargado
            //     return
            this.arbores = await getDocumentsWhere("Arbores","senlleira",true);
           
        },
         /**
         * 
         * @returns {Array} Árbores propuestas como senlleiras
         */
          async setSenlleirasPropostas(){
            if(this.arboresSenlleirasPropostas.length)
                return;
            this.arboresSenlleirasPropostas = await getDocumentsWhere('Arbores','propuesta_senlleira',true);
        },
         /**
         * 
         * @returns {Array} Árbores que a súa propiedade propuesta_senlleira e false. Es decir las que sube un usuario ordinario o el administrador lo pone como false
         */
          async setArboresParticipacionCidada(){
            if(this.arboresParticipacionCidada.length)
                return;
            this.arboresParticipacionCidada = await getDocumentsWhere('Arbores','propuesta_senlleira',false);
        },
        async setImagenes(uid) {
            this.imagenes = await listAllUrls(uid)
             
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
