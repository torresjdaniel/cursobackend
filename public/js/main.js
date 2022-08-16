const socket = io();

const containerChat = document.querySelector('#containerChat');
const formChat = document.querySelector('#formChat');
const chatAuthor = document.querySelector('#formChat input[name=author');
const chatText = document.querySelector('#formChat textarea[name=text');
const divChat = document.createElement('div');
divChat.id = 'divChat';



formChat.addEventListener('submit', async(e) =>{
    e.preventDefault();
    const date = new Date();
    const message = {
        email: chatAuthor.value,
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


async function renderChat(data) {
    const fetchTemplateHbs = await fetch("/templates/chat.hbs");
    const templateHbs = await fetchTemplateHbs.text();
    const template = Handlebars.compile(templateHbs);
    const html = template({ messages: data });
    divChat.innerHTML = html;
    containerChat.appendChild(divChat);  
}