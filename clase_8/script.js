//API -> Aplication Programing Interfase  (intermediario entre HTML y JS)

//JS es sincronico 

const saludar=()=>{
    console.log("HOLAAA")
}


//asincronia 

// let boton=document.querySelector("button")
// boton.addEventListener('click',()=>{
//     alert("se pulsa el boton")
// })

saludar()

// callbacks -> funcion que pasamos como parametro de otra

const funcionComun=()=>{
    //codigo ...
}
addEventListener("mouseover",funcionComun)

function mostrarTexto(texto){
    let parrafo=document.querySelector("p")
    parrafo.textContent=texto
}

function calculoInfo(data1,data2,funcionCallback){
    let promedio=(data1+data2)/2

    funcionCallback(promedio)
}

calculoInfo(2,3,mostrarTexto)

//async/await -> palabras reservadas que nos permiten indicar una funcion asincrona donde informamos que debe aguardar a que 
// promesas -> accion que finaliza en un futuro y capturo con dos metodos lo que va a ejecutarse si se pudo o no cumplir dicha promesa( una accion que se resuelve en un futuro )

//metodo then se encarga de lo que hay que hacer si se cumple la promesa
//catch -> atrapa el error que tire en caso que no se pueda resolver 

let promesa= new Promise((resolve,reject)=>{
    let irAlaPlaza;
    setTimeout(()=>{
        irAlaPlaza = false
    
    if(irAlaPlaza ==true){
        resolve("Pudimos ir a la plaza")
    }else{
        reject("No pudimos ir, mal clima")
    }},10000)
});


// //ejecucion de la promesa
promesa
.then((response)=>{
    console.log("resultado exitoso:"+ response)
})
.then(()=>{
    console.log("accion siguiente ....")
})
.catch((error)=>{
    console.log("Uhhh algo salio mal:"+ error)
})

// saludar()


//funcion -> fetch() -> llamar o hacer una peticion a una URL externa 
// como parametros :
// url (direccion a la cual solicita : string)
// objeto de configuracion opcional -> si la peticion es de tipo GET no hace falta ya que por defecto hace ese tipo de peticiones 

/*
    fetch("url",{
    method: POST,
    body:...
    })
*/
const mostrar=async()=>{

    let listaPersonajes=await obtenerInformacion()
    let section=document.querySelector("section");
    for(personaje of listaPersonajes){
        let tarjeta=document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.innerHTML=`<h2>${personaje.name}</h2>
        <img  src="${personaje.image}"/>

        `
        section.appendChild(tarjeta)
    }

}
async function obtenerInformacion(){
    let resultados=await fetch("https://rickandmortyapi.com/api/character")
    .then((resp)=>{
        return resp.json();// transformar la informacion recibida a un formato que JS puede manipular y obtener la informacion
    })
    .then((data)=>{     
        console.log("salio todo ok")
        console.log(data.results)
        return data.results
    })
    .catch((err)=>{
        console.log("UHH salio algo mal")
        console.log(err)
    })    
    return resultados

}


saludar()
//peticiones protocolo HTTP 
//verbos HTTP -> el tipo de peticion
//GET -> peticion de lectura (le pido que me traiga algo)
//POST -> peticion de creacion (le mandamos contenido para crear algo)
//PUT-PATCH -> actualizar (mando contenido para actualizar)
//DELETE -> borrar /eliminar algo 

