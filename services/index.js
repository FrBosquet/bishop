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

module.exports = {
  pokemonService,
  clashService,
  driversService,
  get: async id => {
    const service = getServiceById(id)
    return await service.get(id)
  },
  getAll: async () => {
    const data = await Promise.all([
      pokemonService.getAll(),
      clashService.getAll(),
      driversService.getAll()
    ])

    return data.reduce(
      (acc, item) => [ ...acc, ...item],
      [])
  }
}