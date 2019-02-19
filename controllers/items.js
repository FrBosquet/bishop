const { Router } = require('express');
const {
  get,
  getAll
} = require('../services')

module.exports = new Router()
  .get('/', async (req, res) => {
    const data = await getAll()
    res.status(200).json(data)
  })
  .get('/:id', async (req, res) => {
    const {id} = req.params
    const data = await get(id)
    res.status(200).send(data)
  });
