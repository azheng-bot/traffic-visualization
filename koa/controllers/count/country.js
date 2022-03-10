const {
  getAirData,
  getCenterCity,
  getPortData,
  getRoadGoods,
  getRoadGoodsTurnover,
  getRoadGuest,
  getRoadGuestTurnover,
  getWaterGoods,
  getWaterGoodsTurnover,
  getWaterGuest,
  getWaterGuestTurnover,
} = require("../../modules/count/country")

// 1.获取全国数据
module.exports.getCountryData = async (ctx, next) => {
  // let roadGoods = await getRoadGoods()
  // let roadGoodsTurnover = await getRoadGoodsTurnover()
  // let roadGuest = await getRoadGuest()
  // let roadGuestTurnover = await getRoadGuestTurnover()
  // let waterGoods = await getWaterGoods()
  // let waterGoodsTurnover = await getWaterGoodsTurnover()
  // let waterGuest = await getWaterGuest()
  // let waterGuestTurnover = await getWaterGuestTurnover()
  let airData = await getAirData()
  // let centerCityData = await getCenterCity()
  // let portData = await getPortData()

  ctx.body = {
    data: {
      // roadGoods,
      // roadGoodsTurnover,
      // roadGuest,
      // roadGuestTurnover,
      // waterGoods,
      // waterGoodsTurnover,
      // waterGuest,
      // waterGuestTurnover,
      airData,
      // centerCityData,
      // portData,
    }
  }
  next()
}