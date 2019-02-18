const axios = require('axios')
const baseUrl = process.env.CLASH_API_URL
const imagesUrl = process.env.CLASH_IMAGES_URL

const mapDataToListItem = ({name, _id: id}) => ({
  name,
  id
})
const mapDataToDetail = ({ name, _id: id, idName }) => ({
  name,
  id,
  image: `${imagesUrl}${idName}.png`
})

module.exports = {
  getAll: async () => {
    const { data } = await axios.get(baseUrl)
    const normalizedData = data.map(mapDataToListItem)
    return normalizedData
  },
  get: async id => {
    const {data} = await axios.get(`${baseUrl}${id}`)
    const normalizedData = mapDataToDetail(data)
    return normalizedData
  }
}