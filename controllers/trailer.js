'use strict'

const viaplayResource = require('../services/viaplay')
const movieDB = require('../services/moviedb')

module.exports = {
  schema: {
    query: {
      type: 'object',
      required: ['link'],
      properties: {
        link: {
          type: 'string'
        }
      }
    }
  },

  async handler (req, reply) {
    const resource = await viaplayResource().fetch(req.query.link)
    const imbdId = resource.getImdbId()
    const movie = await movieDB().fetchMovieData(imbdId)
    const trailer = await movie.getTrailer()
    reply.status(200).send({ trailer })
  }
}
