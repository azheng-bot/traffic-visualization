const { getGrownRate,getNumberData,getTotalData } = require("../../modules/count/road")


// 1 某省公路客运同比增速
module.exports.getGrownRate = async (ctx, next) => {
  let prov_name = ctx.prov_name || '北京';
  let type = ctx.type || '旅客周转量'

  let { data } = await getGrownRate(prov_name,type)

  ctx.body = { data }
  next()
}

// 2 某省公路客运数据
module.exports.getNumberData = async (ctx, next) => {
  let prov_name = ctx.prov_name || '北京';
  let type = ctx.type || '旅客周转量'

  let { data } = await getNumberData(prov_name,type)

  ctx.body = { data }
  next()
}
// 3 全国/所有省公路客运总和数据
module.exports.getTotalData = async (ctx, next) => {
  let prov_name = ctx.prov_name || '北京';
  let type = ctx.type || '旅客周转量'

  let {data  } = await getTotalData(prov_name,type)

  ctx.body = { data }
  next()
}