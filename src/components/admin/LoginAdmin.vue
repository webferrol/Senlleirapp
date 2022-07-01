<template>
  <div class="caja-formulario">
    <form @submit.prevent="enviarForm" action="#" id="adminForm">
      <h1>{{ store.getEmailUser }}</h1>
      <span class="admin_form_input">
        <label for="email">Usuario</label>
        <input v-model="form.email" type="email" id="email" required />
      </span>

      <span class="admin_form_input">
        <label for="password">Contraseña</label>
        <input v-model="form.password" type="password" id="password" />
      </span>

      <span class="admin_login_btn">
        <button :disabled="store.user === null ? false : true">Login</button>
        <button @click="desconectar" type="button" value="Logout">
          Logout
        </button>
      </span>

      <strong>{{ store.errores }}</strong>
      <div v-if="validacionError">Error: {{ validacionError }}</div>
    </form>
  </div>
</template>

<script setup>
// -> Importaciones <-
import { useStoreUsers } from "@/stores/users.js";
import { reactive, ref } from "vue";

// -> Inicializar pinia <- //
const store = useStoreUsers();
const form = reactive({
  email: "senlleira.app@gmail.com",
  password: "sansus2022.",
});

const validacionError = ref(false);

let usuario = ref(null);

// -> Enviar/validar form <- //
const enviarForm = async () => {
  if (!password.value || !email.value) {
    return alert(`No se admiten campos vacios`);
  }
  try {
    validacionError.value = false;
    //-> Tiene que tener await por que estamos esperando que se cumpla la promesa del user.js registrarUsuario() <-  //
    await store.signIn(form);
    // router.push("/");
  } catch (error) {
    validacionError.value = error.message;
    console.log(error);
  }
};

// -> Logout <- //
const desconectar = () => {
  store.logout();
};
</script>

<style scoped>
.caja-formulario {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 92px);
}

#adminForm {
  display: grid;
  grid-template-columns: auto;
  gap: 0.5rem;
  width: 400px;
  padding: 1rem;
  border: 2px solid black;
  border-radius: 5px;
}

.admin_form_input {
  display: grid;
  grid-template-columns: 100px 1fr;
}

#adminForm .admin_login_btn {
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  gap: 2rem;
}
#adminForm .admin_login_btn button {
  width: fit-content;
}
</style>
