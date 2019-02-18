const axios = require('axios')
const baseUrl = process.env.POKEMON_API_URL

module.exports = {
  getAll: async () => {
    const { data: { results: pokemons } } = await axios.get(baseUrl)
    return pokemons
  }
}