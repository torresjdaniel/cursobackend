const {buildSchema} = require('graphql');
const {graphqlHTTP} = require('express-graphql');

const {
    listarProducto,
    listarProductos,
    registrarProducto,
    actualizarProducto,
    eliminarProducto
} = require('../services/productosService');

const schema = buildSchema(`
  input ProductoInput {
    title: String
    price: Int
    thumbnail: String
  }

  type Producto {
    id: ID!
    title: String
    price: Int
    thumbnail: String
  }

  type Query {
    listarProducto(id: ID!): Producto
    listarProductos(): [Producto]
  }

  type Mutation {
    registrarProducto(datos: ProductoInput!): Producto
    actualizarProducto(id: ID!, datos: ProductoInput!): String
    eliminarProducto(id: ID!): String
  }
`)

const graphqlMdw = graphqlHTTP({
    schema: schema,
    rootValue:{
        listarProducto,
        listarProductos,
        registrarProducto,
        actualizarProducto,
        eliminarProducto
    },
    graphiql: true
})

module.exports = {graphqlMdw};