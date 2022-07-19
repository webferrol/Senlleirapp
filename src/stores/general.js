// importar libreria de pinia. sirve para centralizar toda la información
import { defineStore } from "pinia";
import { useStoreArbores } from "./arbores";
import { useStoreEspecies } from "./especies";
import { useStoreParques } from "./parques"

export const useStoreGeneral = defineStore('busqueda', {
    state: () => {
        return {
            buscador: '',
            tmp:[],
            categoria: '',
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
        }
    }
})