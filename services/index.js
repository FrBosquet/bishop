const CacheController = require('../modules/cache')
const pokemonService = require('./pokemon')
const clashService = require('./clash')
const driversService = require('./drivers')

const getServiceById = id => {
  switch(true){
    //Pokemons only have numbers in its id
    case /^\d+$/.test(id): return pokemonService
    //Drivers only have letters in its id
    case /^[a-zA-Z]+$/.test(id): return driversService
    //The rest are clash cards
    default: return clashService
  }
}

const cache = new CacheController()

module.exports = {
  pokemonService,
  clashService,
  driversService,
  get: async id => {
    const cachedData = cache.get(id)
    if (cachedData) return cachedData    

    const service = getServiceById(id)
    const data = await service.get(id)
    cache.set(data)

    return data
  },
  getAll: async () => {
    const cachedData = cache.getAll()
    if (cachedData) return cachedData

    const data = await Promise.all([
      pokemonService.getAll(),
      clashService.getAll(),
      driversService.getAll()
    ])

    const flattedData = data.reduce(
      (acc, item) => [ ...acc, ...item],
      [])

    cache.setAll(flattedData)

    return flattedData
  }
}