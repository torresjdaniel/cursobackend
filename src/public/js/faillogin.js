const buttonLogIn = document.querySelector('#buttonLogIn');

buttonLogIn.addEventListener('click', async (e) =>{
    e.preventDefault();
    window.location.href = "/login";
});