const { Router } = require('express');
const pokemonService = require('../services/pokemon')

module.exports = new Router()
  .get('/', async (req, res) => {
    const pokemons = await pokemonService.getAll()
    res.status(200).json(pokemons)
  })
  .get('/:id', (req, res) => {
    // Code here
    res.sendStatus(200);
  });
