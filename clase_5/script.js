//APIS

//canvas -> API grafica incorporada desde HTML5

//API?? -> Aplication Programing Interfase 
//conjunto de facilidad que vienen a solucionar cosas complejas de una manera simple
//me pueden servir tambien para obtener cierta informacion,para gestinar algunas funcionalidades 
//API incorporadas en el codigo (solo las utilizamos cuando necesitamos
//API externas -> las incorporar /llamar desde nuestro codigo - asincronia y luego podemos utilizarlas )

//------------------------------------------------------------
const mostrar=()=>{
    console.log('ejecutando evento scroll')
    //window.innerHeight -> alto de mi ventana
    //window.innerWidth -> ancho de mi ventana
    // console.log(window.innerHeight,'alto pantalla')
    // console.log(window.scrollY,'px que se scrollearon desde el inicio')
    let nav=document.querySelector("nav")
    if(window.scrollY>window.innerHeight*0.2){
        nav.classList.add('cambioNav')
    }else{
         nav.classList.remove('cambioNav')
    }
};