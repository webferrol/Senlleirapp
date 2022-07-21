// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from "pinia";
import { useStoreArbores } from "./arbores";
import { useStoreEspecies } from "./especies";
import { useStoreParques } from "./parques";
import { initPage,nextPage,previousPage,totalPages,seekItemPage,limitPage } from "../hook/pagination.firestore";
import { getDocsArray } from "../hook/firestore.hook";

export const useStoreGeneral = defineStore('busqueda', {
    state: () => {
        return {
            buscador: '',
            tmp:[],
            categoria: '',
            tmpPag: [],
            limit: 6,
            total: 0,
            actualPage: 1,
            tmpPagQuery: []
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
            const querySnapshot = await initPage("Parques", "idDoc", this.limit);
            this.tmpPagQuery = querySnapshot.docs[querySnapshot.docs.length-1];
            console.log(this.tmpPagQuery)
            this.tmpPag = getDocsArray(querySnapshot);
        },

        async setNextExperiences() {
            console.log(lastWorkExperiences)
            this.actualPage++;
            const lastWorkExperiences = await seekItemPage("Parques", this.tmpPag[this.tmpPag.length-1].ref);
            const querySnapshot = await nextPage("Parques", "idDoc", lastWorkExperiences, this.limit);
            this.tmpPag = getDocsArray(querySnapshot)

        }
    }
})