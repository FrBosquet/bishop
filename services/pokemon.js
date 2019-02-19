const axios = require('axios')
const baseUrl = process.env.POKEMON_API_URL

const extractId = url => url.match(/(?<=pokemon\/)\d+/)[0]
const mapDataToListItem = ({name, url}) => ({
  name,
  id: extractId(url)
})
const mapDataToDetail = ({ name, id, sprites: { front_default: image }}) => ({
  name,
  id,
  image
})

module.exports = {
  getAll: async () => {
    const { data: { results: pokemons } } = await axios.get(baseUrl)
    const normalizedData = pokemons.map(mapDataToListItem)
    return normalizedData
  },
  get: async id => {
    try{
      const {data} = await axios.get(`${baseUrl}${id}`)
      const normalizedData = mapDataToDetail(data)
      return normalizedData
    } catch(e) {
      return 'No items found!'
    }
  }
}