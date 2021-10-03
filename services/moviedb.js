const MovieDb = require('moviedb-promise').MovieDb
const API_KEY = require('../config').services.tmdb.apiKey

const moviedb = new MovieDb(API_KEY)
/**
 * It represents a movie
 * @class
 */
class Movie {

  /**
   * Fetches details of a movie using IMDB id
   * @param {string} imdbId IMDB id for a movie
   * @returns this
   */
  async fetchMovieData (imdbId) {
    this.imdbId = imdbId
    const res = await moviedb.find({
      id: this.imdbId,
      external_source: 'imdb_id'
    })
    this.movie = res.movie_results?.[0]
    if (!this.movie) throw new Error('Movie not found')
    return this
  }

  /**
   * Parses the movie data to get trailer info
   * @returns trailer - Link to youtube trailer
   */
  async getTrailer () {
    const res = await moviedb.movieInfo({
      id: this.movie.id,
      append_to_response: 'videos'
    })

    const trailer = res.videos?.results?.find(video => video.type === 'Trailer' && video.site === 'YouTube')
    if (!trailer) throw new Error('Trailer not found')
    const link = `https://youtube.com/watch?v=${trailer.key}`
    return link
  }
}

module.exports = function (imdbId) {
  return new Movie(imdbId)
}
