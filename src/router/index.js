import { createRouter, createWebHistory } from "vue-router";
import { useStoreUsers } from "../stores/users";
import { routes } from "./routes";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


// -> Antes de que entre a la ruta pasa por aqui con 'beforeEnter' <- //
router.beforeEach((to,from,next)=>{
  window.document.title = to.meta.title?to.meta.title:'Selleiras';
  // -> En este caso no se puede usar el store directamente fuera de los componentes, tiene que ser dentro de un metodo como este caso <- //
  const userStore = useStoreUsers();
  //console.log(userStore.user?.uid)
  // -> Si existe el user con next va a la ruta correspondiente(InicioSesion) y else lo contrario<- //
  if(to.meta.requiereAuth===true && userStore.user?.uid===undefined){
    next('/');
  }else{
    next();
  }
});

export default router;
