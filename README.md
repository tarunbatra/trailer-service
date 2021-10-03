# trailer-service

The application takes a viaply URL for a movie and returns the URL to the trailer of the movie.

## Install deps

`npm i`

## Run tests

`npm t`

## Run the server

`npm start`

The `/trailer` route is behind basic authorization. Default username/password is `dev:dev`.

## Docs
The Open API 3 docs will be available on `/docs` route.

## Example

```sh
curl -X 'GET' \
  'http://0.0.0.0:3000/trailer?link=https%3A%2F%2Fcontent.viaplay.se%2Fpc-se%2Ffilm%2Farrival-2016' \
  -H 'accept: */*' \
  -H 'Authorization: Basic ZGV2OmRldg=='
```
## TODOs
- [ ] Add mocking to the tests so that we don't hit real APIs for testing
- [ ] Cache movie data since it should not change frequently (eg: [Out of band cache](https://github.com/godaddy/out-of-band-cache/)).