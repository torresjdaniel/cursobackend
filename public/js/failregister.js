const buttonFailRegister = document.querySelector('#buttonFailRegister');

buttonFailRegister.addEventListener('click', async (e) =>{
    e.preventDefault();
    window.location.href = "/register";
});