const { getCities, getCityAdcode } = require("../modules/city")



// 获取全国省市
module.exports.getCities = async (ctx, next) => {
  const { cities, provinces } = await getCities()
  provinces.forEach(province => {
    province.cities = cities.filter(city => city.prov_id == province.prov_id)
  })

  ctx.body = { provinces }
  next()
}

// 获取城市adcode
module.exports.getCityAdcode = async (ctx, next) => {
  const { adcode } = await getCityAdcode(ctx.query.city)
  ctx.body = { adcode }
  next()
}