'use strict'

const { server: { auth } } = require('./config')
const fp = require('fastify-plugin')
const swagger = require('fastify-swagger')

module.exports = async function (fastify, options) {
  fastify
    .register(fp(docs))
    .get('/', (req, reply) => reply.send('OK'))
    .register(routes)
}

async function routes (fastify) {
  registerBasicAuth(fastify)
  fastify.get('/trailer', require('./controllers/trailer'))
}

function registerBasicAuth (fastify) {
  fastify.register(require('fastify-basic-auth'), {
    authenticate: { realm: 'trailer-service' },
    validate: async function (username, password) {
      if (username !== auth.username || password !== auth.password) {
        throw new Error('Unauthorized')
      }
    }
  })

  fastify.after(() => {
    fastify.addHook('onRequest', fastify.basicAuth)
  })
}

async function docs (fastify) {
  fastify.register(swagger, {
    routePrefix: '/docs',
    exposeRoute: true,
    openapi: {
      info: {
        title: 'Trailer Service',
        version: '0.1.0'
      },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      components: {
        securitySchemes: {
          basicAuth: {
            type: 'http',
            name: 'basicAuth',
            scheme: 'basic'
          }
        }
      },
      security: [{
        basicAuth: []
      }]
    }
  })
}
