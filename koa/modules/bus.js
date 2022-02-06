const query = require("../utils/query")


module.exports.getBuses = async (city) => {
  let buses = await query(`select * from bus where city_name like '%${city}%'`)

  return { buses }
}