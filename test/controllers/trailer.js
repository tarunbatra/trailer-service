'use strict'

const t = require('tap')
const config = require('../../config')
const server = require('../../server')
const app = server.init()

t.test('/trailer', async (t) => {
  app.logger = false
  t.before(async () => {
    t.context.authHeader = 'Basic ' + Buffer.from(`${config.server.auth.username}:${config.server.auth.password}`).toString('base64')
  })
  t.test('trailer should return 401 if no auth is provided', async t => {
    const res = await app.inject({
      method: 'GET',
      url: '/trailer'
    })
    t.equal(res.statusCode, 401, 'status is 401')
  })

  t.test('trailer should return 400 if no link provided', async t => {
    const res = await app.inject({
      method: 'GET',
      url: '/trailer',
      headers: { authorization: t.context.authHeader }
    })
    t.equal(res.statusCode, 400, 'status is 400')
    t.equal(res.json().error, 'querystring should have required property \'link\'', 'correct error message returned')
  })

  t.test('trailer should return 400 if invalid link provided', async t => {
    const res = await app.inject({
      method: 'GET',
      url: '/trailer',
      query: { link: 'https://example.com' },
      headers: { authorization: t.context.authHeader }
    })
    t.equal(res.statusCode, 400, 'status is 400')
    t.equal(res.json().error, 'No IMBD id found in the viaplay resource', 'correct error message returned')
  })

  t.test('trailer should return 200 if the trailer was found', async t => {
    const res = await app.inject({
      method: 'GET',
      url: '/trailer',
      query: { link: 'https://content.viaplay.se/pc-se/film/arrival-2016' },
      headers: { authorization: t.context.authHeader }
    })
    t.equal(res.statusCode, 200, 'status is 200')
    t.equal(res.json().trailer, 'https://youtube.com/watch?v=7W1m5ER3I1Y', 'correct url returned')
  })
})
