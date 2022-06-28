// -> Importaciones <- //
import { defineStore } from "pinia";
import { auth } from "@/hook/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import router from "../router";

export const useStoreUsers = defineStore("users", {
  state: () => {
    return {
      user: null,
    };
  },
  getters: {
    getEmailUser: (state) => {
      return state.user && state.user.email
        ? state.user.email
        : "No hay usuarios";
    },
  },
  actions: {
    // -> Funcion para iniciar sesion de cuenta creada en Firebase <- //
    async signIn({ email, password }) {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      this.user = userCredential.user;
      //-> router.push() empuja a donde se quiera una vez se haya logeado el usuario <- //
      router.push("/");
    },
    //-> Funcion para mantener la persistencia de sesion <- //
    // logged() {
    //   onAuthStateChanged(auth, (user) => {
    //     const headerValidado = document.querySelector(".header-nav-app");
    //     const footerValidado = document.querySelector(".menu-principal");
    //     if (user) {
    //       this.user = user;
    //       headerValidado.style.backgroundColor = "red";
    //       footerValidado.style.backgroundColor = "red";
    //     } else {
    //       this.user = null;
    //     }
    //   });
    // },
    //-> Funcion cerrar sesion <- //
    logout() {
        signOut(auth)
        .then(() => {
          this.user = null;
          //-> router.push() empuja a donde se quiera una vez se haya registrado el usuario <- //
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async onAuthState() {
      // -> Resuesta positiva(resolve), negativa(reject) <- //
      return new Promise((resolve, reject) => {
        // -> Observador que vigilia para que se cierre automatico la sesion pasado un tiempo o cuando salga de la sesion/cierra pestaña <- //
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.user = { email: user.email, uid: user.uid };
            } else {
              this.user = null;
            }
            resolve(user);
          },
          (e) => reject(e)
        );
        unsuscribe();
      });
    },
  },
});
