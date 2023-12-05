const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const outputFile = './schema/swagger_output.json'
const endpointsFiles = [
  'app.js',
  './routes/authRoutes.js',
  './routes/userRoutes.js',
]

const doc = {
  'x-apiname': 'ecomm',
  info: {
    version: '1.0.0', // by default: '1.0.0'
    title: 'E-Comm', // by default: 'REST API'
    description: 'E-Commerce API', // by default: ''
    contact: {
      name: 'Ronak',
      email: 'admin@admin.com',
      url: 'https://ecomm-k4ks.onrender.com/api/v1',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'local server',
    },
    {
      url: 'https://ecomm-k4ks.onrender.com/api/v1',
      description: 'prod server',
    },
  ],
  security: [{ BasicAuth: [] }],
}

swaggerAutogen(outputFile, endpointsFiles, doc)
