import { async } from "@firebase/util";
import { ref } from "vue";

export const tmp = ref([]);

const categoria = ref('');
const enviarLetra = {
    text: ''
}
export const datos = (a) => {
    tmp.value = a;
    console.log(tmp.value)
}
export const buscador = (b,c) => {
    categoria.value = b;
    enviarLetra.text = c;
    console.log(categoria.value,enviarLetra.text)
    filtrar(tmp.value);
};
export const filtrar = (d) => {
    // console.log(a);
    tmp.value = d.filter((arbor)=>{
        return arbor[categoria.value].toLowerCase().includes(enviarLetra.text.toLowerCase())
    });
    console.log(tmp);
    return tmp;
}