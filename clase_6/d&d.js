let cohete=document.querySelector("img")
let h1=document.querySelector("#tituloUnico")
//Drag and Drop -> API que nos permite identificar momentos en que elementos se estan trasladando


// atributo draggable -> true (elemento tiene la capacidad de ser arrastrado)
//por defecto las imagenes como las anclas son arrastrables 

//7 eventos : 
// dragstart- dragend- drag (el elemento arrastrado) 
// -dragover - drop - dragleave- dragenter(el destino del elemento arrastrado)

// objeto dataTransfer -> almacenar y detectar informacion  -> se encuentra dentro del event y contiene 3 funciones(metodos)
//setData(tipo,dato) -getData(tipo) - clearData(tipo)
//dato -> siempre string - caracter alfanumerico
//tipo -> Text - URL - html/plain-text - html/uri-text

//propiedad -> files




h1.addEventListener('dragstart',(event)=>{
    console.dir(h1.id)
    //almacenar info
    // event.dataTransfer.setData("Text",h1.id)
    event.dataTransfer.setData("Text",h1.innerText)

})


//sintaxis:

//A) addEventListener()
cohete.addEventListener("dragstart",()=>{
    console.log("inicio de arrastre")
})
cohete.addEventListener("dragend",()=>{
    console.log("FIN de arrastre")
})

cohete.addEventListener("drag",()=>{
    console.log("arrastre...")
})

//B) evento como atributo en el HTML + funcion JS

const fnEntrada=()=>{
    //console.log("un elemento arrastrado ingreso")
}
const fnSlaida=()=>{
    //console.log("salio un elemento arrastrado ")

}

const fnElemSoltado=(event)=>{
    
    let info=event.dataTransfer.getData("Text");
   /* console.log("informacion obtenida: "+ info)
    let titulo=document.querySelector(`#${info}`);
    console.log(titulo)*/
    let zonaDestino=document.querySelector(".zona-destino");    
    
    if(info =='Drag and Drop'){
        console.log(info)


        zonaDestino.innerHTML=`<h1 id="tituloUnico">${info}</h1>`
        h1.style.visibility="hidden"        
    }
    if(event.dataTransfer.files.length >0){
        let docInfo=event.dataTransfer.files[0]// objeto
        //split()-> transformar un string a array 
        console.log(event.dataTransfer.files[0].type)
        let tipoDoc=docInfo.type.split("/").pop()
        if(tipoDoc =="pdf"){
            zonaDestino.innerHTML=`
            <img src="./imagenes/img-pdf.png" />
            <p>${docInfo.name}</p>`
        }else{
            zonaDestino.innerHTML=`${docInfo.name}`
        }

        
    }
    //zonaDestino.appendChild(titulo)

}
const fnContEleDestino=(e)=>{
    e.preventDefault()// no bloqueo la deteccion del evento drop
    //console.log('dragover ejecutando')
}

////--------------------
const preventRedirect=(event)=>{
    event.preventDefault()
}

// para un traslado comun -> dragstart - drop - dragover(preventDefault)

const reincio=()=>{
    window.location.reload()// refresh 
}