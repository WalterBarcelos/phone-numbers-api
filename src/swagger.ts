import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Phone Numbers API',
      version: '1.0.0',
      description: 'This API allows the user to allocate and deallocate numbers of an organisation.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [path.resolve(__dirname, './routes/*.ts')], // Path to the API routes
};

const specs = swaggerJsdoc(options);

export default (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
