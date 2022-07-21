import { defineStore } from "pinia";
// import { initPage,nextPage,previousPage,totalPages,seekItemPage,limitPage } from "@/hooks/pagination.firestore";

export const useStorePaginacion = defineStore({
    id: 'profile',
    state: () => ({

        elementos: [],
        limit: 6,
        total: 0,
        actualPage: 1,


    }),
    actions: {
        
    }
})