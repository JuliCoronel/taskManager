import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import swaggerApp from './swagger.js';
import rutasTareas from './rutas/endpoints.js';
import 'dotenv/config';


const app = express();
app.use(express.json());
app.use(cors());
rutasTareas(app);

app.use('/docEndpoints', swaggerUi.serve, swaggerUi.setup(swaggerApp));

mongoose.connect(process.env.db)
.then(() => {console.log("Servidor conectado")})
.catch (err => console.error('Error al conectar con MongoDB:', err))

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto 3000`);
})
