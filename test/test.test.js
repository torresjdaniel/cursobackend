const axios = require('axios');
const expect = require('chai').expect;

axios.defaults.baseURL = 'http://localhost:8080'

async function testGetTest(){
  try {
     const {data} = await axios.get('/api/productos-test');
     return data;
  }
  catch (error) {
    return error
  }
}

async function testGetAll(){
    try {
       const {data} = await axios.get('/api/productos');
       return data;
    }
    catch (error) {
      return error
    }
}

async function testGetById(id){
  try {
     const {data} = await axios.get(`/api/productos/${id}`);
     return data;
  }
  catch (error) {
    return error
  }
}

async function testPost(producto){
  try {
     const {data} = await axios.post(`/api/productos`, producto);
     return data;
  }
  catch (error) {
    return error
  }
}

async function testPut(id, producto){
  try {
     const {data} = await axios.put(`/api/productos/${id}`, producto);
     return data;
  }
  catch (error) {
    return error
  }
}

async function testDelete(id){
  try {
     const {data} = await axios.delete(`/api/productos/${id}`);
     return data;
  }
  catch (error) {
    return error
  }
}

describe('Prueba de API productos', () =>{

  before(() => console.log('Test iniciado'));
  after(() => console.log('Test finalizado'));

  let id;

  const producto = {
    title: "guantes test",
    price: 679,
    thumbnail: "guantes grises"
  }

  const productoUpt ={
    title: "guantes test upd",
    price: 700,
    thumbnail: "guantes grises"
  }

  it('Obtengo la lista de productos', async() =>{
    const get = await testGetAll();
    expect(get).to.be.an('array');

  })

  it('Agregar 1 producto', async () =>{
    const post = await testPost(producto);
    id = post.producto[0]._id;
    expect(post.producto[0]).to.have.property('_id');
  })

  it('Busco el producto creado', async()=>{
    const get = await testGetById(id);
    expect(get._id).to.be.equal(id);
  })

  it('Actualizo el producto creado', async() =>{
    put = await testPut(id, productoUpt);
    const get = await testGetById(id);
    expect(get.price).to.be.equal(productoUpt.price);
  })

  it('Elimino el producto creado', async () =>{
    del = await testDelete(id);
    const get = await testGetById(id);
    expect(get).to.be.a('string');
  })

})