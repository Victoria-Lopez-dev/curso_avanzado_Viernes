//Web Storage -> API incluida a partir de HTML5 -> almacenar informacion en el browser
//ciudado! nunca guardemos informacion sensible (datos de tarjeta, contraseñas,documentos,..)
//Web Storage almacena informacion de tipo texto , string

/*
2 mecanismos : sessionStorage(guarda por sesion) - LocalStorage(lo guarda hasta que le indiquemos que lo borre)
 3 metodos : 
  *  setItem(key,value)-> guardar informacion - par de clave valor
   * getItem(key) -> obtener la informacion
* removeItem(key) -> eliminar la informacion
    
 */

let lista=['prod1','prod2']
let dato="WEB STORAGE - LOCALSTORAGE-SESSIONSTORAGE & JSON"
let producto1={
    nombre:'Silla Living Signature',
    precio:3800
}

sessionStorage.setItem("nombre_usuario","Juan")

localStorage.setItem("numero",222)//lo guarde como number pero webstorage lo transforma a string
localStorage.setItem("dato",dato)

localStorage.setItem("numero",12345)// si guardo con la misma key ,sobreescribe

let infoGuardada=localStorage.getItem("numero")
console.log(typeof(infoGuardada))

//localStorage.clear()//borra TODO lo almacenado en ese mecanismo
//localStorage.removeItem("dato")

let info=sessionStorage.getItem("item_inexistente");
console.log(info) //nos devuelve null

//undefined - null 

setTimeout(()=>{
    localStorage.removeItem("dato")
},30000)//ejecuta una funcion despues de un cierto tiempo

///------------------------------------------------------------
let listaPrevia=[]
let productoCama={
    nombre:"Cama",
    precio:3800
};
let productoSillon={
    nombre:"Sillon Living Nordic",
    precio:2800
}
let productoSilla={
    nombre:"Silla Living Nocturne",
    precio:3100
};

const theme=(nodo)=>{
   let contenido= nodo.textContent;
    let body=document.querySelector("body");
   if(contenido =="DAY"){
    nodo.textContent="NIGHT"
    body.classList.add("night")

    localStorage.setItem("theme","night")// guarde la informacion el tema 

   }else{
    nodo.textContent="DAY"
    body.classList.remove("night")

    localStorage.setItem("theme","day")// guarde la informacion el tema 
   }

};
//funcion que vamos a ejecutar cada vez que carga/reproduce la pagina
const inicio=()=>{
    //tema del sitio
    let tema=localStorage.getItem("theme");
    let boton= document.querySelector("#botonTheme");
    if(tema == "night"){
       let body=document.querySelector("body");
       boton.textContent="NIGHT";
       body.classList.add("night")
    }

    //productos enchanguito de compra
    let contadorProd=document.querySelector("#count");
    let cantidad=localStorage.getItem("cantidad");
    if(cantidad !== null){
        contadorProd.textContent=cantidad
    }

};

const cargarProd=(nodo)=>{
    
    //sumar al contador productos
    let contadorProd=document.querySelector("#count");

    let contador= parseInt(contadorProd.textContent)
    console.log(contador+1)

    contadorProd.textContent=contador +1//modifica el numero en el changuito 
    
    localStorage.setItem("cantidad",contador+1)


    //hacer la lista previa

    let productoSeleccionado=nodo.id;

    console.log(productoSeleccionado)

    switch(productoSeleccionado){
        case 'cama':
            listaPrevia.push(productoCama)
            break;
        case "sillon":
            listaPrevia.push(productoSillon)
            break;
        case "silla":
            listaPrevia.push(productoSilla)
            break;
        default :
        break;
    }
    console.log(listaPrevia) // listaPrevia es un array

    let listaPreviaJSON=JSON.stringify(listaPrevia)// aca lo transformamos a un JSON 
    localStorage.setItem("productos",listaPreviaJSON)//guardo 

}



//JSON -> JavaScript Object Notation

//formato de tipo texto que distintos lenguajes pueden interpretar que se utiliza mucho para el envio de informacion  :
//liviano , es facil de leer 
//similar a un array de objeto o un objeto de objetos


//dos metodos JS viven JSON
// JSON.parse(info)  -> transformar de JSON a array/objeto
// JSON.stringify(info) -> array/objeto lo transforma a JSON


console.log(`[{
    "dato1":222,
    "dato2":"skjk"
},{
    "dato1":222,
    "dato2":"skjk"
}]`)

// `
// {
//     "productos1":{
//         "dato1":222,
//         "dato2":"skjk"
//     },
//     "productos2":{
//         "dato1":222,
//         "dato2":"skjk"
//     };
// }
// `