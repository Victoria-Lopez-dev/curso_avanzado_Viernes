//API -> Aplication Programing Interfase 

//APIs incorporadas -> canvas , geolocation, drag and drop, webstorage

//Geolocation -> APi que nos permite detectar la ubicacion del dispositivo 

//metodos getCurrentPosition (solicita 1 vez)- watchPosition ( lo pide cada cierto tiempo)
 let parrafo=document.querySelector("p");

const funcionOk =(position)=>{
    console.log(position)
    
    parrafo.innerText=` el dispositivo se encuentra en las coordenadas ${position.coords.latitude} ${position.coords.longitude}. Con un margen de error de ${position.coords.accuracy} metros `
};

const funcionErr=(error)=>{
    console.log("hubo un error")
    console.log(error)
   if(error.code ==1){
        parrafo.innerText='Nos es necasario saber su ubicacion ,le pedimos que nos de acceso,vuelva a la consola para habilitar o acepte el prompt enviado'
   }

   if(error.code ==3) parrafo.innerText='Error de config.No tubimos tiempo suficiente para encontrarte'
};

const objectoOpcional={
    enableHightAccuracy:true,
    timeout:'10ms',
    // maximumAge:1000
};
navigator.geolocation.getCurrentPosition(funcionOk,funcionErr,objectoOpcional);//solicita permiso , si le dan el ok ejecuta la busqueda y como respuesta ejecuta la funcion que paso como parametro( funcion ok o funcion error)



// objeto de error : code : 
// 1(denegaron el permiso)-
// 2- 
// 3- 
