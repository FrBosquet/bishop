const axios = require('axios')
const xml2js = require('xml2js')
const baseUrl = process.env.DRIVERS_API_URL

const parseXML = data => new Promise((resolve, reject) =>
xml2js.parseString(data, (err, data) => err ?
  reject(err) :
  resolve(data.MRData.DriverTable[0].Driver)
) 
)

const mapDataToListItem = ({ $: { driverId: id}, GivenName, FamilyName}) => ({
  name: `${GivenName} ${FamilyName}`,
  id
})

const mapDataToDetail = ({ $: { driverId: id, url: image }, GivenName: [givenName], FamilyName: [familyName]}) => ({
  name: `${givenName} ${familyName}`,
  id,
  image
})

module.exports = {
  getAll: async () => {
    const {data} = await axios.get(baseUrl)
    const parsedData = await parseXML(data)
    const normalizedData = parsedData.map(mapDataToListItem)
    
    return normalizedData
  },
  get: async id => {
    try{
      const {data} = await axios.get(`${baseUrl}${id}`)
      const [parsedData] = await parseXML(data)
      const normalizedData = mapDataToDetail(parsedData)

      return normalizedData
    } catch(e) {
      return 'No items found!'
    }
  }
}