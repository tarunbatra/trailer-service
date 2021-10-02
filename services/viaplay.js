const axios = require('axios')

class ViaplayResource {
  async fetch (link) {
    this.link = link
    const res = await axios.request({
      url: link,
      method: 'GET'
    })
    this.resource = res.data
    return this
  }

  getImdbId () {
    const imbdId = this.resource?._embedded?.['viaplay:blocks']?.[0]?._embedded?.['viaplay:product']?.content?.imdb?.id
    if (!imbdId) throw new Error('No IMBD id found in the viaplay resource')
    return imbdId
  }
}

module.exports = function () {
  return new ViaplayResource()
}
