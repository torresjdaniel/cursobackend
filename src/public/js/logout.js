const headerH1LO = document.querySelector('#headerH1LO');

headerH1LO.innerHTML = `Finalizaste la sesión, hasta luego ${localStorage.getItem('nombre')}.`;

window.setTimeout(() =>{
    window.location.href = "/login";
}, 3000)