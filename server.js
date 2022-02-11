const express = require('express');
const router = require('./routes/productos');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use((req, res) => {
  res.json({
    error: -2,
    descripcion: `ruta ${req.url} y/o metodo ${req.method} no implementados`
  })
  console.log(JSON.stringify({
    error: -2,
    descripcion: `ruta ${req.url} y/o metodo ${req.method} no implementados`
  }))
});

app.listen(PORT, () => {
  console.log(`Server UP en el puerto ${PORT}`);
});

  


