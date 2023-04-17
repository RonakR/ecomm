const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/authRoutes.js']

const doc = {
  info: {
    version: '1.0.0', // by default: '1.0.0'
    title: 'E-Comm', // by default: 'REST API'
    description: 'E-Commerce API', // by default: ''
  },
  servers: [
    {
      url: 'http://localhost:5000/',
      description: 'local server',
    },
    {
      url: 'https://ecomm-k4ks.onrender.com/',
      description: 'prod server',
    },
  ],
}

swaggerAutogen(outputFile, endpointsFiles, doc)