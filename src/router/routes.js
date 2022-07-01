export const routes = [
    {
      path: "/",
      name: "inicio",
      component: () => import("../views/Inicio.vue"),
    },
    {
      path: "/formulario",
      name: "formulario",
      component: () => import("@/views/senlleira/NuevoArbol.vue"),
    },
    
    {
      path: "/catalogo",
      name: "Catalogo",
      component: () => import("@/views/senlleira/Catalogo.vue"),
    },
    {
      path: "/mapa-senlleiras",
      name: "MapaSenlleiras",
      component: () => import("@/views/senlleira/MapaSenlleiras.vue"),
    },
    {
      path: "/lista-parques",
      name: "lista-parques",
      component: () => import("@/views/parques/ListaParques.vue"),
    },
    // ADMIN
    {
      path: "/admin",
      name: "administrador",
      component: () => import("@/components/admin/LoginAdmin.vue"),
    },
    {
      path: "/catalogo-especies",
      name: "catalogo-especies",
      meta: {
        requiereAuth:true,
      },
      component: () => import("@/views/vista-admin/Vista-especies.vue"),
    },
    {
      path: "/catalogo-senlleira",
      name: "catalogosenlleira",
      meta: {
        requiereAuth:true,
      },
      component: () => import("@/views/vista-admin/Vista-senlleiras.vue"),
    },
    {
      path: "/catalogo-parque",
      name: "admin-parque",
      component: () => import("@/views/vista-admin/Vista-parques.vue"),
    },
   
    // test
    {
      path: "/catalogo-de-especies",
      name: "CatalogoDeEspecies",
      component: () => import("@/views/especies/CatalogoEspecies.vue"),
    },
    {
    path: '/busqueda',
    name: 'Busqueda',
    component: () => import('@/components/busqueda/Busqueda.vue')
    },
  ]