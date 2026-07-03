// obtener el nodo de audio y video
//propiedades :
//  duration -> duracion en s(segundos del video/audio) 
// currentTime -> duracion en segundos del tiempo actual de reproduccion

//metodos -> play() pause()


const transformarTiempo=(tiempo)=>{
    let minutos=0
    let segundos=0

    if(tiempo>=60){
        minutos=(tiempo/60).toFixed(0)
        segundos=tiempo%60
    }else{
        minutos='00'
        if(tiempo<10){
            segundos='0'+tiempo.toFixed(0)
        }else{
             segundos=tiempo.toFixed(0)

        }
    }

    return `${minutos}:${segundos}`
}
//-------
let video=document.querySelector("#videoB");
let botonPlay=document.querySelector("#play");
let botonPause=document.querySelector("#pausa");
console.dir(video)

let mostrarTiempo=()=>{
    console.log("evento load")
    //modificamos el formato en el que nos llega
    let tiempoEditado=transformarTiempo(video.duration)

    let zonaTiempo=document.querySelector(".tiempo");

    //lo reproducimos en el HTML
    zonaTiempo.textContent=tiempoEditado;
}

let tiempoActual;
botonPlay.addEventListener("click",()=>{
    video.play();
    tiempoActual=setInterval(()=>{
        let tiempoEditado=transformarTiempo(video.currentTime);
        let zonaTiempoActual=document.querySelector("#actual");
        console.log(tiempoEditado)
        zonaTiempoActual.textContent=tiempoEditado;

    },1000)
});

botonPause.addEventListener("click",()=>{
    video.pause();
    clearInterval(tiempoActual)
});


//load - DOMContentLoaded
//setInterval(()=>{},num) ->cada cierta cantidad de ms ejecutar una funcion
//clearInterval(setInterval)
//seTimeOut(()=>{},num)) -> ejecutar una funcion luego de un delay
