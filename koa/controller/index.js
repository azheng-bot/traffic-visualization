const { getSigns } = require("../modules/sign")
const { getCities } = require("../modules/city")

// 获取交通图标
module.exports.getSigns = async (ctx, next) => {
  const { signs, signCategaries } = await getSigns()
  signCategaries.map(categary => {
    categary.signList = signs.filter(sign => sign.cate_id == categary.cate_id)
  })

  ctx.body = { signCategaries ,signs}
  next()
}

// 获取全国省市
module.exports.getCities = async (ctx, next) => {
  const {cities,provinces} = await getCities()
  provinces.map(province => {
    province.cities = cities.filter(city => city.prov_id == province.prov_id)
  })

  ctx.body = {provinces}
  next()
}