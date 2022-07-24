const divInfo = document.querySelector('#divInfo');
const ulInfo = document.createElement('ul');
ulInfo.id = 'ulInfo';

fetch('/infoDatos')
    .then( response => response.json())
        .then(data => renderInfo(data));


function renderInfo(data){
    for (const i in data) {
        let li = document.createElement('li');
        li.innerHTML = `${i.replace(/([a-z](?=[A-Z]))/g, '$1 ').toLocaleUpperCase()}: ${data[i]}`;
        ulInfo.appendChild(li);
    } 
    divInfo.appendChild(ulInfo);
}