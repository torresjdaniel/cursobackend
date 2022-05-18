const formLogin = document.querySelector('#formLogin');
const nombreLogin = document.querySelector('#formLogin input[name=nombre]');

formLogin.addEventListener('submit', async (e) =>{
    e.preventDefault();
    localStorage.setItem('nombre', nombreLogin.value)
    await fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              nombre: nombreLogin.value
            })
    });
    window.location.href = "/";
});
