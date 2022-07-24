const formRegister = document.querySelector('#formRegister');
const emailRegister = document.querySelector('#formRegister input[name=email]');
const passwordRegister = document.querySelector('#formRegister input[name=password]');
const buttonLogIn = document.querySelector('#buttonLogIn');

formRegister.addEventListener('submit', async (e) =>{
    e.preventDefault();
    localStorage.setItem('email', emailRegister.value)
    await fetch('/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username: emailRegister.value,
              password: passwordRegister.value 
            })
    });
    // window.location.href = "/";
});

buttonLogIn.addEventListener('click', async (e) =>{
    e.preventDefault();
    window.location.href = "/login";
});