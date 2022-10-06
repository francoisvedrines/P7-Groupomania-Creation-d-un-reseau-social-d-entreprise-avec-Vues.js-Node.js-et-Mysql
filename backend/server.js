/************************************************************/
/*********************** server *****************************/
/************************************************************/
const http = require('http')
const app = require('./app')


//normalisation du port
const normalizePort= val =>{
    const port= parseInt(val,10)
    if (isNaN(port)) {
      return val
    }
    if (port >=0){
      return port
    }
    return False
  }

const port = normalizePort(process.env.SERVER_PORT || '3000')
app.set('port', port)

// gestion des erreurs de port
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
      break
    default:
      throw error
  }
}

const server = http.createServer(app)

//affichage de l'erreur ou du bon fonctionnement du server
server.on('error', errorHandler)
server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
  console.log('Listening on ' + bind)
})

server.listen(port)