export const routes = [
  {
    path: "/",
    name: "inicio",
    component: () => import("../views/Inicio.vue"),
  },
  // {
  //   path: "/catalogo-arbore",
  //   name: "catalogoArbol",
  //   component: () => import("@/views/senlleira/CatalogoNuevoArbol.vue"),
  // },
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
    path: "/mapaParques",
    name: "MapaParques",
    component: () => import("@/views/parques/MapaParques.vue"),
  },
  {
    path:"/parque-:id",
    name:"Parque",
    component: () => import("@/views/parques/InfoParqueView.vue"),
  },
  {
    path: "/mapaSenlleiras",
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
    path: "/admin-especies",
    name: "admin-especies",
    meta: {
      requiereAuth: true,
    },
    component: () => import("@/views/admin/CatalogoEspecies.vue"),
  },
  {
    path: "/admin-senlleira",
    name: "admin-senlleira",
    meta: {
      requiereAuth: true,
    },
    component: () => import("@/views/admin/CatalogoSenlleiras.vue"),
  },
  {
    path: "/admin-parque",
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
    path: "/busqueda",
    name: "Busqueda",
    component: () => import("@/components/busqueda/Busqueda.vue"),
  },
  {
    path: "/catalogo-de-parques",
    name: "CatalogoDeParques",
    component: () => import("@/views/parques/CatalogoParques.vue"),
  },
  {
    path: "/ficha-parque/:idDoc",
    name: "FichaParque",
    component: () => import("@/views/parques/FichaParqueView.vue"),
  },
  {
    path: "/prueba",
    name: "prueba",
    component: () => import("@/components/TheGeolocation.vue"),
  },
  // {
  //   path: "/prueba2",
  //   name: "prueba2",
  //   component: () => import("@/views/Vista1.vue"),
  // },

];
