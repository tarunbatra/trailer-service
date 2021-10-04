# trailer-service

The application takes a viaply URL for a movie and returns the URL to the trailer of the movie.

The application is [deployed on Heroku](https://trailer-service.herokuapp.com/docs).

## Docs
The Open API 3 docs will be available on `/docs` route.

## Example

```sh
curl -X 'GET' \
  'https://trailer-service.herokuapp.com/trailer?link=https://content.viaplay.se/pc-se/film/arrival-2016' \
  -H 'Authorization: Basic ZGV2OmRldg=='
```
## Install deps

`npm i`

## Run tests

`npm t` will run the tests using `tap`.

## Run the server

`npm run dev` runs the server in dev mode using nodemon. It should just work.

`npm start` is more proper way to start the application. Don't forget to provide the required environment variable `TMDB_API_KEY` when running this way.

The `/trailer` route is behind basic authorization. Default username/password is `dev:dev`.

## Envs
|env|default|required|
|---|-------|--------|
|PORT|3000||
|NODE_ENV|local||
|BASIC_AUTH_USERNAME|dev||
|BASIC_AUTH_PASSWORD|dev||
|TMDB_API_KEY|INVALID_API_KEY|✅|

## TODOs
- [ ] Add mocking to the tests so that we don't hit real APIs for testing
- [ ] Cache movie data since it should not change frequently (eg: [Out of band cache](https://github.com/godaddy/out-of-band-cache/)).
