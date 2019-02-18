const pokemonService = require('./pokemon')
const clashService = require('./clash')
const driversService = require('./drivers')

module.exports = {
  pokemonService,
  clashService,
  driversService,
  getServiceById: id => {
    switch(true){
      //Pokemons only have numbers in its id
      case /^\d+$/.test(id): return pokemonService
      //Drivers only have letters in its id
      case /^[a-zA-Z]+$/.test(id): return driversService
      //The rest are clash cards
      default: return clashService
    }
  }
}