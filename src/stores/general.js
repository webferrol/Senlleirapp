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
            limit: 3,
            total: 0,
            actualPage: 1,
            tmpNext: []
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
            const querySnapshot = await initPage("Arbores", "genero", this.limit);
            console.log(querySnapshot)
            this.tmpNext = querySnapshot.docs[querySnapshot.docs.length-1];
            // console.log(this.tmpPagQuery)
            // this.tmpPag = getDocsArray(querySnapshot);
            querySnapshot.forEach((doc) => {
                this.tmpPag.push({
                    idDoc: doc.id,
                    ...doc.data(),
                })
            })
        },

        async setNextPagination() {
            // console.log(lastWorkExperiences)
            this.actualPage++;
            // const next = await seekItemPage("Arbores", this.tmpPag[this.tmpPag.length-1]);
            // console.log(next)
            // console.log(this.tmpPag[this.tmpPag.length-1])
            const querySnapshot = await nextPage("Arbores", "genero", this.tmpNext, this.limit);
            // console.log(querySnapshot)
            querySnapshot.forEach((doc) => {
                this.tmpPag.push({
                    idDoc: doc.id,
                    ...doc.data(),
                })
            })
        },

        // async setPreviousPagination() {
        //     // this.actualPage--;
        //     //Obtenemos el primer elemento doc mostrado en la paginación
        //     // const previous = await seekItemPage("workExperience", this.workExperiences[0].ref);;           
        //     // Construct a new query starting at this document
        //     // const querySnapshot = await previousPage("workExperience",'dateEnd',this.tmpPagQuery,this.limit);
        //     // querySnapshot.forEach((doc) => {
        //     //     this.tmpPag.push({
        //     //         idDoc: doc.id,
        //     //         ...doc.data(),
        //     //     })
        //     // })
        // },
    }
})