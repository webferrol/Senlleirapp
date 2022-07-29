// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from "pinia";
import { useStoreArbores } from "./arbores";
import { useStoreEspecies } from "./especies";
import { useStoreParques } from "./parques";
import { initPage,limitPage,nextPage,previousPage,seekItemPage,totalPages } from "../hook/pagination.firestore";

export const useStoreGeneral = defineStore('busqueda', {
    state: () => {
        return {
            buscador: '',
            tmp:[],
            categoria: '',
            tmpPag: [],
            limit: 3,
            total: 0,
            actualPage: 1,
            tmpNext: [],
            btnNext: true,
            btnPrevious: false
        }
    },
    actions:{
        filtraArboresSenlleirasPropostas(){
             // this.tmp = []
             const storeArbores = useStoreArbores();
             this.tmp = storeArbores.arboresSenlleirasPropostas.filter((arbor) => {
                 return arbor.genero.toLowerCase().includes(this.buscador.toLowerCase()) || arbor.especie.toLowerCase().includes(this.buscador.toLowerCase()) || arbor.nombre_comun.toLowerCase().includes(this.buscador.toLowerCase()) || arbor.nombre_arbol.toLowerCase().includes(this.buscador.toLowerCase())
             })
        },
        filtraArboresParticipacionCidada(){
            // this.tmp = []
            const storeArbores = useStoreArbores();
            this.tmp = storeArbores.arboresParticipacionCidada.filter((arbor) => {
                return arbor.genero.toLowerCase().includes(this.buscador.toLowerCase()) || arbor.especie.toLowerCase().includes(this.buscador.toLowerCase()) || arbor.nombre_comun.toLowerCase().includes(this.buscador.toLowerCase()) || arbor.nombre_arbol.toLowerCase().includes(this.buscador.toLowerCase())
            })    
       },
        filtrarEspecies(){
            // this.tmp = [] 
            const storeEspecies = useStoreEspecies();
            this.tmp = storeEspecies.especies.filter((especie) => {
                return especie.genero.toLowerCase().includes(this.buscador.toLowerCase()) || especie.especie.toLowerCase().includes(this.buscador.toLowerCase()) || especie.nombre_comun.toLowerCase().includes(this.buscador.toLowerCase()) || especie.nombre_comun_gal.toLowerCase().includes(this.buscador.toLowerCase())
            })
        },
        filtrarParques(){
            // this.tmp = []
            const storeParques = useStoreParques();
            this.tmp = storeParques.parques.filter((parques) => {
                return parques.nombre.toLowerCase().includes(this.buscador.toLowerCase()) || parques.tipoloxia.toLowerCase().includes(this.buscador.toLowerCase()) || parques.localizacion.toLowerCase().includes(this.buscador.toLowerCase()) || parques.cronoloxia.toLowerCase().includes(this.buscador.toLowerCase()) 
            })
        },

        // Paginación, conseguir paginar normal y el resultado de búsqueda
        async setPagination() {
            this.tmpPag = await initPage("Arbores", "genero", this.limit);
            
    
        },

        async setNextPagination(idDoc) {
            this.tmpPag = await nextPage("Arbores", "genero", idDoc, this.limit);
           
        },

        async setPreviousPagination(idDoc) {
            this.tmpPag = await previousPage("Arbores", "genero", idDoc, this.limit);

        },
        
        async setTotalPages() {
            this.total = await totalPages("Arbores");
        },

        /**
         * Paginar Una página concreta de las experiencias laborales
         */
        async setPaginationNumbers(page){
            let see = []
            const newLimit = page*this.limit;
            const index = (this.limit*page)-this.limit-1;
            // if(index<0){
            //     this.tmpPag = [];
            //     this.actualPage = page;
            //     see = await this.setPagination();
            //     return;
            // }
            see = await initPage("Arbores", "genero", newLimit);
            // const arrayLast = see.tmp[see.tmp-1]
            // this.tmpPag = await nextPage("Arbores", "genero", this.tmpPag.idDocLast, this.limit)
            console.log(see)
            console.log(arrayLast)
            // let querySnapshot = await limitPage("Arbores", "genero", newLimit);

            // const last = querySnapshot.docs[index];
            // const lastTmpPag = await seekItemPage("Arbores", last.id)

            // querySnapshot = await nextPage("Arbores", "genero", lastTmpPag, this.limit);
            // this.actualPage = page;
            // this.tmpPag = await nextPage("Arbores", "genero", this.tmpPag.idDocLast, newLimit )

            // querySnapshot.forEach((doc) => {
            //     this.tmpPag.data.push({
            //         idDoc: doc.id,
            //         ...doc.data(),
            //     })
            // })
        }
    }
})