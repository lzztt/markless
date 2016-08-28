const http = require('http')
const serveStatic = require('serve-static')

// Serve up module's root folder
const serve = serveStatic('.')
const next = () => {}

// Create server
const server = http.createServer((req, res) => {
  serve(req, res, next)
})

// Listen
server.listen(9000)
