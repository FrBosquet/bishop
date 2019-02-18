const axios = require('axios')
const xml2js = require('xml2js')
const baseUrl = process.env.DRIVERS_API_URL

module.exports = {
  getAll: async () => {
    const {data} = await axios.get(baseUrl)
    const parsedData = await new Promise((resolve, reject) =>
      xml2js.parseString(data, (err, data) => err ?
        reject(err) :
        resolve(data.MRData.DriverTable[0].Driver)
      ) 
    )
    const normalizedData = parsedData.map(({
      $,
      GivenName,
      FamilyName
    }) => ({
      name: `${GivenName} ${FamilyName}`,
      id: $.driverId
    }))
    
    return normalizedData
  }
}