const formLogin = document.querySelector('#formLogin');
const emailLogin = document.querySelector('#formLogin input[name=email]');
const passwordLogin = document.querySelector('#formLogin input[name=password]');
const buttonRegister = document.querySelector('#buttonRegister');

formLogin.addEventListener('submit', async (e) =>{
    e.preventDefault();
    localStorage.setItem('email', emailLogin.value)
    await fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username: emailLogin.value,
              password: passwordLogin.value 
            })
    });
    // window.location.href = "/";
});

buttonRegister.addEventListener('click', async (e) =>{
    e.preventDefault();
    window.location.href = "/register";
});