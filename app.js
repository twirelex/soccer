'use strict'
const fs = require('fs').promises
const path = require('path')
const AutoLoad = require('@fastify/autoload')



module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application

  fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public')
  })

  fastify.register(require('@fastify/multipart'), {
    limits: {
      fileSize: 3000000000
    }
  })
  fastify.register(require('@fastify/compress'))
  fastify.register(require('@fastify/cors'))
  ////fastify.register(require('@fastify/helmet'))
 
  
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.setNotFoundHandler(async(request, reply) => {
    return reply.sendFile('notfound.html')
  })

 
  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
