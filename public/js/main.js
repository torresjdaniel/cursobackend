const socket = io();

const containerProducts = document.querySelector('#containerProducts');
const formAddProduct = document.querySelector('#formAddProduct');
const productTitle = document.querySelector('#formAddProduct input[name=title]');
const productPrice = document.querySelector('#formAddProduct input[name=price]');
const productThumbnail = document.querySelector('#formAddProduct input[name=thumbnail]');
const divProductsList = document.createElement('div');
divProductsList.id = 'divProductsList';


const containerChat = document.querySelector('#containerChat');
const formChat = document.querySelector('#formChat');
const chatAuthor = document.querySelector('#formChat input[name=author');
const chatText = document.querySelector('#formChat textarea[name=text');
const divChat = document.createElement('div');
divChat.id = 'divChat';


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
        author: chatAuthor.value,
        date: `[${date.getDate()}/${date.getMonth()+1}/${date.getUTCFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`,
        text: chatText.value
    };
    socket.emit('newMessages', message);
});

socket.on('updateList', async (data) => {
    renderList(data);
});

socket.on('messages', async (data) => {
    renderChat(data);
});

async function renderList(data) {
    const fetchTemplateHbs = await fetch("/templates/productsList.hbs");
    const templateHbs = await fetchTemplateHbs.text();
    const template = Handlebars.compile(templateHbs);
    const html = template({ products: data });
    divProductsList.innerHTML = html;
    containerProducts.appendChild(divProductsList);
    
}

async function renderChat(data) {
    const fetchTemplateHbs = await fetch("/templates/chat.hbs");
    const templateHbs = await fetchTemplateHbs.text();
    const template = Handlebars.compile(templateHbs);
    const html = template({ messages: data });
    divChat.innerHTML = html;
    containerChat.appendChild(divChat);  
}

