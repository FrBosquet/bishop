const { Router } = require('express');
const pokemonService = require('../services/pokemon')
const clashService = require('../services/clash')
const driversService = require('../services/drivers')

module.exports = new Router()
  .get('/', async (req, res) => {
    const data = await Promise.all([
      pokemonService.getAll(),
      clashService.getAll(),
      driversService.getAll()
    ])

    const mergedData = data.reduce(
      (acc, item) => [ ...acc, ...item],
      [])
    
    res.status(200).json(mergedData)
  })
  .get('/:id', (req, res) => {
    // Code here
    res.sendStatus(200);
  });
