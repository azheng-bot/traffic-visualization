const { getBuses } = require("../modules/bus")



// 获取公交车信息
module.exports.getBuses = async (ctx, next) => {
  console.log('bus')
  let { buses } = await getBuses(ctx.query.city)
  buses = buses.filter(item => item.bus_name.search(/^\d+[\u4e00-\u9fa5]$/) != -1)
  ctx.body = { buses }
  next()
}