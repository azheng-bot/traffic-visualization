const query = require("../utils/query")


module.exports.getCities = async  () => {
  let cities = await query("select * from site_city")
  let provinces = await query("select * from site_province")

  return {cities,provinces}
}