//API arrastre de elementos 
//7 eventos : 
// drag-dragstart-dragend -> elemento a arrastrar
// drop-dragover-dragleaver-dragenter -> elemento 'destino'

// dos elementos por defecto arrastrables -> <img>| <a>

//draggable -> booleano 
//dataTransfer ->objeto que aporta la API
//almacena strings -> 3 metodos:
//setData(tipo,info) -getData(tipo) -clearData(tipo)
//'Text','URL','html/plain-text','html/uri'

//files


let titulo=document.querySelector("#tituloUnico");

titulo.addEventListener("dragstart",(event)=>{
    console.log("inicio de arrastre **")
    console.dir(titulo)
    //event.dataTransfer.setData('Text',titulo.textContent)
     event.dataTransfer.setData('Text',titulo.id)
})

// titulo.addEventListener("dragend",()=>{
//     console.log("se solto el elemento ")

// })
// titulo.addEventListener("drag",()=>{
//     console.log("estamos arrastrando el elemento")
// })

//eventos en elemento 'destino'

// drop-> suelto algo dentro de mi elemento destino
// dragover->  algo que se arrastra dentro de este elementos, continua dentro(paralelo al drag)
// -dragleaver-> se ejecuta cuando salgo de este elemento con otro que estamos arrastrando
// dragenter -> cuando algo arrastrado se posa sobre el elemento

const funcionDragenter=()=>{
    console.log("algo esta sobre zona destino")
}

const funcionDragLeave=()=>{console.log('evento dragleave')}

const dragOverFn=(e)=>{
    e.preventDefault();//cancelar su accion por defecto
   // console.log("dragover")

}

const dropFn=(e)=>{
    console.log("DROP!!!!")
    console.log(e.dataTransfer.files)
    let file=e.dataTransfer.files

    let contenedor=document.querySelector(".zona-destino");
    //opcion 1
    // let nuevoTitulo=document.createElement("h1");
    //nuevoTitulo.textContent=e.dataTransfer.getData("Text")
    //contenedor.appendChild(nuevoTitulo)
    //titulo.style.display='none'

    //opcion 2
    if(file.length == 0){
        let idTitulo=e.dataTransfer.getData("Text");
        let nuevoTitulo=document.getElementById(idTitulo)
        contenedor.appendChild(nuevoTitulo);
        contenedor.innerHTML=nuevoTitulo.outerHTML 
    }else{
       console.log( file[0])
       if(file[0].type == 'application/pdf'){
        contenedor.innerHTML=`<img src='./imagenes/img-pdf.png'/>
        <p>${file[0].name}</p>
        ` 
       }
    }
}

//cancelar una accion por defecto -> preventDefault() -> eventos

// dragstart - dragover - drop