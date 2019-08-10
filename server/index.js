const CubejsServer = require('@cubejs-backend/server')

const server = new CubejsServer()

require('dotenv').config()

server.listen().then(({ port }) => {
  console.log('process.env: ', process.env.CUBEJS_DB_NAME)
  console.log(`🚀 Cube.js server is listening on ${port}`)
})
