'use strict'

const fastify = require('fastify')({
  logger: true
})
const logger = require('pino')()
const routes = require('./routes')
const config = require('./config')

async function start () {
  // Initialize the routes
  fastify.register(routes)
  // Register routes, set default error and 404 handler
  fastify.setErrorHandler(errorHandler)
  fastify.setNotFoundHandler(notFoundHandler)
  // Start the server
  await fastify.listen(config.server.port)
  return fastify
}

async function stop () {
  await fastify.close()
}

async function errorHandler (err, request, reply) {
  if (err.statusCode && err.statusCode !== 500) {
    return await reply.status(err.statusCode).send({
      name: err.name,
      message: err.message
    })
  }
  logger.error(err)
  return await reply.status(500).send({
    error: 'Something went wrong'
  })
}

async function notFoundHandler (request, reply) {
  return await reply.status(404).send()
}

module.exports = {
  start,
  stop
}
