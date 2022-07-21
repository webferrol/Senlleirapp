const getScheme  = window.matchMedia('(prefers-color-scheme: dark)');

//Si el dispositivo del usuario tiene por defecto el dark-mode activado
export const comprobarDarkMode = () => {
    if(getScheme.matches){
        if(localStorage.getItem('dark-mode') == 'false'){
            document.documentElement.classList.remove('dark');
        } else{
            document.documentElement.classList.add('dark');
            localStorage.setItem('dark-mode', true);
        }
    } else{
        if(localStorage.getItem('dark-mode') == 'true'){
            localStorage.setItem('dark-mode', true)
        document.documentElement.classList.add('dark');
        } else{
            document.documentElement.classList.remove('dark');
        localStorage.setItem('dark-mode', false
        )
        }
        
        
 
    }
}
// Si el usuario ha activado o desactivado el dark-mode en el botón de la app

export const switchDarkMode = () => {
    if(localStorage.getItem('dark-mode') == 'true'){
        localStorage.setItem('dark-mode', true)
        document.documentElement.classList.add('dark');
    }else{
        localStorage.setItem('dark-mode', false)
        document.documentElement.classList.remove('dark');
    }
}