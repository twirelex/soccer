'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/:name', async function (request, reply) {
    return reply.sendFile('video.html')
  })
}
