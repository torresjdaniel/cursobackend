const socket = io();

const containerProducts = document.querySelector('#containerProducts');
const formAddProduct = document.querySelector('#formAddProduct');
const productTitle = document.querySelector('#formAddProduct input[name=title]');
const productPrice = document.querySelector('#formAddProduct input[name=price]');
const productThumbnail = document.querySelector('#formAddProduct input[name=thumbnail]');
const divProductsList = document.createElement('div');
divProductsList.id = 'divProductsList';


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

socket.on('updateList', async (data) => {
    renderList(data);
});

async function renderList(data) {
    const fetchTemplateHbs = await fetch("/templates/productsList.hbs");
    const templateHbs = await fetchTemplateHbs.text();
    const template = Handlebars.compile(templateHbs);
    const html = template({ products: data });
    divProductsList.innerHTML = html;
    containerProducts.appendChild(divProductsList);
    
}

