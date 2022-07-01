Endpoints:

Carritos:

GET api/carrito/:id -> Devuelve el carrito con el id puesto en la URL con el params nombrado "id".

POST api/carrito -> Crea un carrito y lo devuelve.

POST api/carrito/:id/productos -> Almacena el producto que se envia en el body de la petición en el carrito con el id puesto en la URL con el params nombrado "id". El Content-Type debe ser "apllication/json".

{
  "nombre": "Lapiz",
  "precio": 225,
  "foto": "foto.com",
  "descripcion": "es un lapiz",
  "codigo": "l1",
  "stock": 2,
  "timestamp": "2022-05-11T14:26:48.942Z",
}


DELETE api/carrito/:id -> Elimina el carrito con el id puesto en la URL con el params nombrado "id".

DELETE api/carrito/:id/productos/:id_prod -> Elimina el producto con id puedo en la URL con el params nombrado "id_prod" que se encuentran en el carrito con id puesto en la URL con el params nombrado "id".

Productos:

GET api/productos/:id -> Devuelve el producto con el id puesto en la URL con el params nombrado "id". Sino la URL no cuenta con un params, devuelve todos los productos almacenados en la bdd

POST api/productos -> Almacena el producto que se envia en el body de la petición. El Content-Type debe ser "apllication/json".
Ejemplo:

{
  "nombre": "Lapiz",
  "precio": 225,
  "foto": "foto.com",
  "descripcion": "es un lapiz",
  "codigo": "l1",
  "stock": 2,
  "timestamp": "2022-05-11T14:26:48.942Z",
}


PUT api/productos/:id -> Actualiza el producto que se recive por la req.body con id puesto en la URL con el params nombrado "id".

DELETE api/productos/:id -> Borra el producto con el id puesto en la URL con el params nombrado "id" de la bdd.

Registro y Logueo:

POST /register -> Recibe en el body de la petición los datos para el registro del nuevo usuario, gracias al uso del middleware 'Multer" puede interpretar Content-Type: FormData, además de los Content-Type: "application/x-www-form-urlencoded" y "application/json".

Ejemplo:

Content-Type: FormData

let bodyContent = new FormData();
bodyContent.append("username", "email del usuario");
bodyContent.append("password", "Contraseña del Usuario");
bodyContent.append("nombre", "Nombre del Usuario");
bodyContent.append("edad", "Edad del usuario");
bodyContent.append("direccion", "Direccion del Usuario");
bodyContent.append("tel", "Telefono del usuario (con prefijo internacional)");
bodyContent.append("avatarImg", "Archivo de imagen del avatar")

POST /registerok -> Si el registro esta OK en /register redirecciona a esta url que por el momento solo envia un mensaje de confirmación de registro.

POST /failregister -> Si el registro falla redirecciona en /register a esta url que por el momento solo envia un mensaje de que el registro fallo.

POST /login -> Recibe en el body de la petición los datos para el log in de un usuario ya registrado. El Content-Type de la petición deben ser: "application/x-www-form-urlencoded" o "application/json". 

Ejemplo:

let bodyContent = "username=danitorres16.932@gmail.com&password=1234";

let bodyContent = {
"username": "mail@dominio",
"password": "1234"
});

POST /loginok -> Si el log in esta OK en /login redirecciona a esta url que por el momento solo envia un mensaje de confirmación de login.

POST /faillogin -> Si el log in falla en /login redireciona a esta url que por el momento solo envia un mensaje de falla de login

GET /logout -> Desloguea al usuario logueado de la sesion.

Confirmación de Pedido

POST /confirmarpedido -> Tiene varios casos de uso:

- Si el carrito tiene al menos un producto, devuelve la lista completa de productos en el carrito.
- Si el carrito no tiene ningún producto, devuelve "Tu carrito esta vacio".
- Si por algún motivo el carrito fue eliminado de la bdd, crea un nuevo carrito en la bdd y lo asigna al usuario.

En el caso de la primera opción, el servidor enviara un email y whatsapp al admin con el pedido y los datos del user. Y un SMS al usuario con la confirmación del pedido.
