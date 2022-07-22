export const routes = [
  // Secciones
  {
    path: "/",
    name: "inicio",
    meta: {
      title: 'Senlleira'
    },
    component: () => import("../views/Inicio.vue"),
  },
  {
    path: "/nova-arbore",
    name: "NuevoArbol",
    meta: {
      title: 'Engadir árbore',
    },
    component: () => import("@/views/senlleira/NuevoArbol.vue"),
  },
  {
    path: "/catalogo-propostas",
    name: "CatalogoPropostas",
    meta: {
      title: 'Propostas cidadás',
    },
    component: () => import("@/views/senlleira/CatalogoPropostasView.vue"),
  },
  {
    path: "/catalogo-senlleiras",
    name: "CatalogoSenlleiras",
    meta: {
      title: 'Catálogo de Senlleiras'
    },
    component: () => import("@/views/senlleira/CatalogoSenlleirasView.vue"),
  },
  {
    path: "/mapa-parques",
    name: "MapaParques",
    meta: {
      title: 'Mapa dos parques',
    },
    component: () => import("@/views/parques/ParkMapView.vue"),
  },
  {
    path: "/mapa-senlleiras",
    name: "MapaSenlleiras",
    meta: {
      title: 'Catálogo de Senlleiras',
    },
    component: () => import("@/views/senlleira/SenlleiraMapView.vue"),
  },
  {
    path: "/catalogo-de-especies",
    name: "CatalogoDeEspecies",
    meta: {
      title: 'Especies',
    },
    component: () => import("@/views/especies/CatalogoEspecies.vue"),
  },
  {
    path: "/catalogo-de-parques",
    name: "CatalogoDeParques",
    meta: {
      title: 'Catálogo de parques',
    },
    component: () => import("@/views/parques/CatalogoParques.vue"),
  },
  {
    path: "/ficha-parque/:idDoc",
    name: "FichaParque",
    meta: {
      title: 'Ficha do parque',
    },
    component: () => import("@/views/parques/FichaParqueView.vue"),
  },
  {
    path: "/ficha-tecnica/:idDoc",
    name: "FichaSenlleira",
    meta: {
      title: 'Ficha da senlleira',
    },
    component: () => import("@/views/senlleira/FichaSenlleiraView.vue"),
  },
  {
    path: "/ficha-especie/:idDoc",
    name: "FichaEspecie",
    meta: {
      title: 'Ficha da especie',
    },
    component: () => import("@/views/especies/FichaEspecieView.vue"),
  },

  {
    path: "/ajustes",
    name: "ajustes",
    meta: {
      title: 'Axustes e infromación',
    },
    component: () => import("@/views/ajustes/Ajustes.vue"),
  },

  // ADMIN
  {
    path: "/adpower10",
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
    path: "/programadores",
    name: "Programadores",
    meta: {
      requiereAuth: true,
    },
    component: () => import("@/views/admin/ProgramadoresView.vue"),
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
    path: "/admin-parque-especies/:idDoc",
    name: "AdminParqueEspecies",
    meta: {
      requiereAuth: true,
    },
    component: () => import("@/views/admin/ParqueEspeciesView.vue"),
  },
  {
    path: "/admin-parque",
    name: "admin-parque",
    component: () => import("@/views/admin/CatalogoParques.vue"),
  },
  {
    path: "/prueba2",
    name: "prueba2",
    component: () => import("@/views/PaginationPrueba.vue"),
  },
];
