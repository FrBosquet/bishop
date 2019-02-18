const axios = require('axios')
const baseUrl = process.env.POKEMON_API_URL

const extractId = url => url.match(/(?<=pokemon\/)\d+/)[0]

module.exports = {
  getAll: async () => {
    const { data: { results: pokemons } } = await axios.get(`${baseUrl}?limit=1000`)
    const normalizedData = pokemons.map(({name, url}) => ({
      name,
      id: extractId(url)
    }))
    return normalizedData
  }
}