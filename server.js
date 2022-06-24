import express, { json, urlencoded } from 'express';
import router from './routes/endPoints.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(json());
app.use(urlencoded({ extended: true }));

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

  


