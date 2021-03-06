'use strict'

const axios = require('axios')

/**
 * It represents a viaplay resource
 * @class
 */
class ViaplayResource {
  /**
   * Fetches the viaplay resource by the link
   * @param {string} link - link to the viaplay resource
   * @returns this
   */
  async fetch (link) {
    this.link = link
    const res = await axios.request({
      url: link,
      method: 'GET'
    })
    this.resource = res.data
    return this
  }

  /**
   * Prses the resource to extract imbd id
   * @returns imbdId - IMDB ID of the resource
   */
  getImdbId () {
    const imbdId = this.resource?._embedded?.['viaplay:blocks']?.[0]?._embedded?.['viaplay:product']?.content?.imdb?.id
    if (!imbdId) throw new Error('No IMBD id found in the viaplay resource')
    return imbdId
  }
}

module.exports = function () {
  return new ViaplayResource()
}
