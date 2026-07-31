const mostrarProductos=(productos)=>{
    let ul=document.querySelector("ul");
    for(prod of productos){
        let li=document.createElement("li");
        li.innerHTML=`<p>
        <strong> producto:</strong> ${prod.nombre}
        <strong> precio:</strong> ${prod.precio}
        </p>
        `
        ul.appendChild(li)

    }
}

const inicio=()=>{
    let tema=localStorage.getItem("theme");
    let cantidad=localStorage.getItem("cantidad");

    let span=document.querySelector("span")
    if(tema == "night"){
       let body=document.querySelector("body");
       body.classList.add("night")
    }

    if(cantidad == null){
        span.textContent=0
    }else{
        span.textContent=cantidad
    }

    let productosJSON = localStorage.getItem("productos");

    console.log(productosJSON)
    let productos=JSON.parse(productosJSON)// transformamos el JSON a un array
    console.log(productos)
    mostrarProductos(productos)//mostrarlos en el HTML
};