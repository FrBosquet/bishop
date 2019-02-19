const { Router } = require('express');
const services = require('../services')

module.exports = new Router()
  .get('/', async (req, res) => {
    const data = await services.getAll()
    res.status(200).json(data)
  })
  .get('/:id', async (req, res) => {
    const {id} = req.params
    const data = await services.get(id)
    res.status(200).send(data)
  });
