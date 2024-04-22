window.onload=function(){
    const form1 = document.getElementById('formRegisterDog')
    form1.addEventListener('submit', registerDogs)
    const button1 = document.getElementById('buttonDisplayDogs')
    button1.addEventListener('click', displayDogs)

    const form2 = document.getElementById('formRegisterWalker')
    form2.addEventListener('submit', registerWalkers)
    const button2 = document.getElementById('buttonDisplayWalkers')
    button2.addEventListener('click', displayWalkers)

}


