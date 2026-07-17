// transform - transition - animation
let flag=true;
const mover=()=>{
    let cuboTranslate=document.querySelector(".translate");
    cuboTranslate.classList.toggle("translate-click")
}

let botonRotar=document.querySelector("#botonRotar");

botonRotar.addEventListener("click",()=>{
    flag=!flag
    let padre=document.querySelector(".padre");
    if(flag){
        padre.style.animation="animacion1 4s infinite ";
    }else{
        padre.style.animation=""
    }
})