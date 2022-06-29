import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useStoreUsers } from './stores/users'
import App from './App.vue'
import router from './router'

// Iconos
import { iconsLibrary } from './hook/font-awesome-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
iconsLibrary()

const app = createApp(App)

app.use(createPinia())
app.component("icono", FontAwesomeIcon)

const store = useStoreUsers();

(async() =>{
  await store.onAuthState();
  app.use(router)
  app.mount('#app');
})()