import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Documentación de los endpoints', 
      version: '1.0.0', 
      description: 'Esta es la documentación de los endpoints que se necesitan para que funcione la "lista de tareas"', 
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./rutas/endpoints.js'],
};

export default swaggerJsdoc(options);
