//POO -> Programacion Orientada a Objetos 

//Paradigma de programacion : actores , las entidades u objetos que intervienen en la ejecucion de las funciones 

//programa para una veterinaria 

//crear la entidad que puede hacer esas acciones 


//clases -> moldes donde defino caracteristicas y capacidades del actor 
//metodos y atributos 
//se escribe en singular y el nomre en mayuscula y defino entre llaves sus caracteristicas y capacidades
let perrito1={
    nombre:"Firulais",
    edad:2
}
let listaPacientesFichas=[]
let listaAtencion=[]
class Veterinario {

    constructor(correo,nombreVet){
          //caracteristicas
        this.correoElectronico=correo
        this.nombre=nombreVet
    }//funcion que se ejecuta al crear una instancia antes de armar sus caracteristicas y capacidades
  


    //capacidades

    modificarHistorial=(paciente,diaAtencion,info)=>{
        paciente["historial"]={
            dia:diaAtencion,
            observaciones:info
        }
    }

}

class Recepcionista{
    correoElectronico="veterinario@ejemplo.com"
    nombre="veterinario"
    diaTrabaja=["Lunes","Miercoles"]

    armarFicha=(nombre,dueno,edad,raza)=>{
        let pacienteNuevo={
            nombre,dueno,edad,raza
        }
        listaPacientesFichas.push(pacienteNuevo)

    }
    listaPacientesPorAtender=(nombrePaciente)=>{
        listaAtencion.push(nombrePaciente)
    }
}


// crear la entidad -> objeto que tenga la capacidad de ejecutar las funciones

// new + nombre de la clase/molde

let veterinariaPaula= new Veterinario("veterinariaPaula@ejemplo.com","Paula Sanchez");//creamos el veterinario del molde

console.log(veterinariaPaula)
veterinariaPaula.modificarHistorial(perrito1,"se le dio una vacuna...")//ejecutar sus capacidadaes
console.log(perrito1)

let veterinario2= new Veterinario("vet2@ejemplo.com","Lucas Ruiz")

veterinario2.modificarHistorial(perrito1,"le dimos un medicamento...")
console.log(perrito1)

let recepcionista= new Recepcionista();
recepcionista.armarFicha()
recepcionista.listaPacientesPorAtender

console.log(veterinariaPaula.correoElectronico)
console.log(veterinario2.correoElectronico)

// super clase -> herencia 