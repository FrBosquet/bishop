const axios = require('axios')
const baseUrl = process.env.CLASH_API_URL

module.exports = {
  getAll: async () => {
    const { data } = await axios.get(baseUrl)
    const normalizedData = data.map(({name, _id}) => ({
      name,
      id: _id
    }))
    return normalizedData
  }
}