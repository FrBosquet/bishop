const app = require('./app')
require('dotenv').config()

app
  .use('/items', require('./controllers/items'))
  .all('*', (req, res) => res.sendStatus(404))
  .listen(3000)
