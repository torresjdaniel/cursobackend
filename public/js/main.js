const socket = io();

const headerH1 = document.querySelector('#headerH1');
const headerButton = document.querySelector('#headerButton');

const containerProducts = document.querySelector('#containerProducts');
const formAddProduct = document.querySelector('#formAddProduct');
const productTitle = document.querySelector('#formAddProduct input[name=title]');
const productPrice = document.querySelector('#formAddProduct input[name=price]');
const productThumbnail = document.querySelector('#formAddProduct input[name=thumbnail]');
const divProductsList = document.createElement('div');
divProductsList.id = 'divProductsList';

const containerFake = document.querySelector('#containerFake');
const spanChat = document.querySelector('#spanChat');
const divFakerList = document.createElement('div');
divFakerList.id = 'divFakerList';

const containerChat = document.querySelector('#containerChat');
const formChat = document.querySelector('#formChat');
const chatEmail = document.querySelector('#formChat input[name=email');
const chatNombre = document.querySelector('#formChat input[name=nombre');
const chatApellido = document.querySelector('#formChat input[name=apellido');
const chatEdad = document.querySelector('#formChat input[name=edad');
const chatAlias = document.querySelector('#formChat input[name=alias');
const chatAvatar = document.querySelector('#formChat input[name=avatar');
const chatText = document.querySelector('#formChat textarea[name=text');
const divChat = document.createElement('div');
divChat.id = 'divChat';



const autor = new normalizr.schema.Entity('autor',{},{idAttribute: 'email'});
const mensaje = new normalizr.schema.Entity('mensaje',{
    author: autor
},{idAttribute: '_id'});
const mensajes = new normalizr.schema.Entity('mensajes', {
    mensajes: [mensaje],
})

headerH1.innerHTML = `Bienvenidx ${localStorage.getItem('nombre')}`;


fetch('/api/productos-test')
    .then( response => response.json())
        .then(data => renderFakerList(data));


headerButton.addEventListener('click', async (e) =>{
    e.preventDefault();
    window.location.href = "/logout";
    await fetch('/logout', {
        method: "POST"
    });
});

formAddProduct.addEventListener('submit', async (e) =>{
    e.preventDefault();
    await fetch('/api/productos', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              title: productTitle.value,
              price: productPrice.value,
              thumbnail: productThumbnail.value
            })
    });
});

formChat.addEventListener('submit', async(e) =>{
    e.preventDefault();
    const date = new Date();
    const message = {
        author: {
            email: chatEmail.value,
            nombre: chatNombre.value,
            apellido: chatApellido.value,
            edad: chatEdad.value,
            aliass: chatAlias.value,
            avatar: chatAvatar.value 
        },
        date: `[${date.getDate()}/${date.getMonth()+1}/${date.getUTCFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`,
        text: chatText.value
    };
    socket.emit('newMessages', message);
});

socket.on('updateList', async (data) => {
    renderList(data);
});

socket.on('messages', async (data) => {
    const denormalizeData = normalizr.denormalize(data.result, mensajes, data.entities);
    const porcentaje = calculoPorcentajeCompre(data, denormalizeData);
    spanChat.innerHTML = `Compresión: ${porcentaje}%`;
    renderChat(denormalizeData.mensajes);
});

async function renderList(data) {
    const fetchTemplateHbs = await fetch("/templates/productsList.hbs");
    const templateHbs = await fetchTemplateHbs.text();
    const template = Handlebars.compile(templateHbs);
    const html = template({ products: data });
    divProductsList.innerHTML = html;
    containerProducts.appendChild(divProductsList);
    
}

async function renderFakerList(data) {
    const fetchTemplateHbs = await fetch("/templates/productFake.hbs");
    const templateHbs = await fetchTemplateHbs.text();
    const template = Handlebars.compile(templateHbs);
    const html = template({ products: data });
    divFakerList.innerHTML = html;
    containerFake.appendChild(divFakerList);
    
}

async function renderChat(data) {
    const fetchTemplateHbs = await fetch("/templates/chat.hbs");
    const templateHbs = await fetchTemplateHbs.text();
    const template = Handlebars.compile(templateHbs);
    const html = template({ messages: data });
    divChat.innerHTML = html;
    containerChat.appendChild(divChat);  
}

function calculoPorcentajeCompre(objNorm, objDesNorm){
    const primerCalculo = ((parseInt(JSON.stringify(objDesNorm).length))*100) / (parseInt(JSON.stringify(objNorm).length));
    return 100 - primerCalculo
}