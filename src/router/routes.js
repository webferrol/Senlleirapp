export const routes = [
    {
      path: "/",
      name: "inicio",
      component: () => import("../views/Inicio.vue"),
    },
    {
      path: "/catalogo-arbore",
      name: "catalogoArbol",
      component: () => import("@/views/senlleira/CatalogoNuevoArbol.vue"),
    },
    {
      path: "/nova-arbore",
      name: "NuevoArbol",
      component: () => import("@/views/senlleira/NuevoArbol.vue"),
    },
    {
      path: "/catalogo",
      name: "catalogo",
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
      component: () => import("@/views/admin/CatalogoEspecies.vue"),
    },
    {
      path: "/catalogo-senlleira",
      name: "catalogosenlleira",
      meta: {
        requiereAuth:true,
      },
      component: () => import("@/views/admin/CatalogoSenlleiras.vue"),
    },
    {
      path: "/catalogo-parque",
      name: "admin-parque",
      component: () => import("@/views/admin/CatalogoParques.vue"),
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