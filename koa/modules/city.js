const query = require("../utils/query")


module.exports.getCities = async () => {
  let cities = await query("select * from site_city")
  let provinces = await query("select * from site_province")

  return { cities, provinces }
}

module.exports.getCityAdcode = async (cityName) => {
  let city = await query(`select * from site_city where city_name = '${cityName}'`)

  return { adcode: city[0]?.adcode ? city[0].adcode : 0 }
}