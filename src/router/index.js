import { createRouter, createWebHistory } from "vue-router";
import { useStoreUsers } from "../stores/users";

// -> Antes de que entre a la ruta pasa por aqui con 'beforeEnter' <- //
const requiereAuth = async (to, from, next) => {
  // -> En este caso no se puede usar el store directamente fuera de los componentes, tiene que ser dentro de un metodo como este caso <- //
  const userStore = useStoreUsers();
  // userStore.cargandoSesion = true;
  const user = await userStore.onAuthState();
  // -> Si existe el user con next va a la ruta correspondiente(InicioSesion) y else lo contrario<- //
  if (user) {
    next();
  } else {
    next("/admin");
  }
  // userStore.cargandoSesion = false;
};


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inicio",
      component: () => import("../views/Inicio.vue"),
    },
    {
      path: "/formulario",
      name: "formulario",
      component: () => import("@/views/senlleira/NuevaSenlleira.vue"),
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
    // ADMIN
    {
      path: "/admin",
      name: "administrador",
      component: () => import("@/components/admin/LoginAdmin.vue"),
    },
    {
      path: "/catalogo-especies",
      name: "catalogo-especies",
      component: () => import("@/views/vista-admin/Vista-especies.vue"),
      beforeEnter: requiereAuth,
    },
    {
      path: "/catalogo-senlleira",
      name: "catalogosenlleira",
      component: () => import("@/views/vista-admin/Vista-senlleiras.vue"),
      beforeEnter: requiereAuth,
    },
    {
      path: "/catalogo-parques",
      name: "catalogo-parques",
      component: () => import("@/views/parques/CatalogoParques.vue"),
    },
    {
      path: "/nuevo-parque",
      name: "NuevoParque",
      component: () => import("@/views/parques/NuevoParque.vue"),
    }
  ],
});

export default router;
