const {
  getRoadGuestData,
  getRoadGoodsData,
  getWaterGoodsData,
  getWaterGuestData,
  getGoodsTurnoverData,
  getGuestTurnoverData,
  getCenterCityData,
  getGrownData,
  getPortData,
  getTotalData
} = require("../../modules/count/province")



module.exports.getProvinceData = async (ctx, next) => {
  let prov_name = ctx.query.province || '北京';

  // 1.公路客运运输量
  let { data: roadGuestData } = await getRoadGuestData(prov_name)
  // 2.公路货运运输量
  let { data: roadGoodsData } = await getRoadGoodsData(prov_name)
  // 3.水路客运运输量
  let { data: waterGuestData } = await getWaterGuestData(prov_name)
  // 4.水路货运运输量
  let { data: waterGoodsData } = await getWaterGoodsData(prov_name)
  // 5.公路&水路客运周转量
  let { data: guestTurnoverData } = await getGuestTurnoverData(prov_name)
  // 6.公路&水路货运周转量
  let { data: goodsTurnoverData } = await getGoodsTurnoverData(prov_name)
  // 7.中心城市客运
  let { data: centerCityData } = await getCenterCityData(prov_name)
  // 8.不同运输方式每月增长速率
  let { data: grownData } = await getGrownData(prov_name)
  // 9.港口货物集中向吞吐量
  let { data: portData } = await getPortData(prov_name)
  // 10.总体运输方式数据
  let { data: totalData } = await getTotalData(prov_name)


  ctx.body = {
    roadGuestData,
    roadGoodsData,
    waterGuestData,
    waterGoodsData,
    guestTurnoverData,
    goodsTurnoverData,
    centerCityData,
    grownData,
    portData,
    totalData
  }
  next()
}

// 2 某省公路客运数据
module.exports.getNumberData = async (ctx, next) => {
  let prov_name = ctx.prov_name || '北京';
  let type = ctx.type || '旅客周转量'

  let { data } = await getNumberData(prov_name, type)

  ctx.body = { data }
  next()
}
// 3 全国/所有省公路客运总和数据
module.exports.getTotalData = async (ctx, next) => {
  let prov_name = ctx.prov_name || '北京';
  let type = ctx.type || '旅客周转量'

  let { data } = await getTotalData(prov_name, type)

  ctx.body = { data }
  next()
}