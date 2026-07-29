//API obtener la ubicacion del dispositivo 

//navigator.geolocation
//getCurrentPosition()
//watchPosition() -

const fnOk=(position)=>{
    console.log("se logro la ubicacion")
    console.log(position);
    let parrafo=document.querySelector("p")
    parrafo.textContent=`coordenadas de la ubicacion :${position.coords.latitude} , ${position.coords.longitude} con un margen de error de ${position.coords.accuracy.toFixed(0)} metros `
};

const fnError=(error)=>{
 console.log("NO se logro conseguir la ubicacion")
    console.log(error)
    let parrafo=document.querySelector("p")
    
    if(error.code ==1) parrafo.textContent="Nos es necesario que acepte el poder conseguir su ubicacion para poder continuar..."
    if(error.code ==3)parrafo.textContent='Ups!no tuvimos tiempo suficiente '

    if(error.code ==2)parrafo.textContent='Ups!no pudimos encontrarte '
}
const objetoConfig={
    //enableHighAccuracy-> booleano 
    enableHighAccuracy:true,
    //timeout -> ms tiempo limite de busqueda
    timeout:'20ms',
    //maximumAge -> ms - tiempo en el que tiene que volver a ejecutar el pedido 
}

navigator.geolocation.getCurrentPosition(fnOk,fnError,objetoConfig)