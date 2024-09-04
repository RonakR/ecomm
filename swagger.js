const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const outputFile = './schema/swagger_output.json'
const endpointsFiles = ['./routes/authRoutes.js', './routes/userRoutes.js']

const doc = {
  'x-apiname': 'ecomm',
  info: {
    version: '0.0.7',
    title: 'E-Comm',
    description: 'E-Commerce API',
    contact: {
      name: 'Ronak',
      email: 'admin@admin.com',
      url: 'https://ecomm-k4ks.onrender.com/api/v1',
    },
  },
  servers: [
    {
      url: 'https://ecomm-k4ks.onrender.com/api/v1',
      description: 'prod server',
    },
    {
      url: 'http://localhost:5000/api/v1',
      description: 'local server',
    },
  ],
  security: [{ BasicAuth: [] }],
}

swaggerAutogen(outputFile, endpointsFiles, doc)
