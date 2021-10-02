'use strict'

require('dotenv').config()

module.exports = {
  server: {
    port: process.env.PORT || '3000',
    auth: {
      username: process.env.BASIC_AUTH_USERNAME || 'dev',
      password: process.env.BASIC_AUTH_PASSWORD || 'dev'
    }
  },
  services: {
    tmdb: {
      apiKey: process.env.TMBDB_API_KEY || '017bf5c0c8ff9511a85ae3f6901447af'
    }
  }
}
