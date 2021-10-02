'use strict'

require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV || 'local',
  server: {
    port: process.env.PORT || '3000',
    loggingEnabled: process.env.NODE_ENV !== 'test',
    auth: {
      username: process.env.BASIC_AUTH_USERNAME || 'dev',
      password: process.env.BASIC_AUTH_PASSWORD || 'dev'
    }
  },
  services: {
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || 'INVALID_API_KEY'
    }
  }
}
