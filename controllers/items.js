const { Router } = require('express');
const { 
  pokemonService,
  clashService,
  driversService,
  getServiceById
} = require('../services')

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
  .get('/:id', async (req, res) => {
    const {id} = req.params
    const service = getServiceById(id)
    const data = await service.get(id)
    res.status(200).send(data)
  });
