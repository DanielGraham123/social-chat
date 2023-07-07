import swaggerAutogen from 'swagger-autogen'

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/Auth.js', './routes/User.js']

swaggerAutogen(outputFile, endpointsFiles)