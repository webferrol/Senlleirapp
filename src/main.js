import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Iconos
import { iconsLibrary } from './hook/font-awesome-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
iconsLibrary()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("icono", FontAwesomeIcon)
app.mount('#app')
