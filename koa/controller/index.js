const { getSigns } = require("../modules/sign")
const { getCities } = require("../modules/city")
const { getLaws } = require("../modules/law")
const { getBuses } = require("../modules/bus")

// 获取交通图标
module.exports.getSigns = async (ctx, next) => {
  const { signs, signCategaries } = await getSigns()
  signCategaries.forEach(categary => {
    categary.signList = signs.filter(sign => sign.cate_id == categary.cate_id)
  })

  ctx.body = { signCategaries, signs }
  next()
}

// 获取全国省市
module.exports.getCities = async (ctx, next) => {
  const { cities, provinces } = await getCities()
  provinces.forEach(province => {
    province.cities = cities.filter(city => city.prov_id == province.prov_id)
  })

  ctx.body = { provinces }
  next()
}

// 获取法律条文
module.exports.getLaws = async (ctx, next) => {
  const { laws, lawChapters, lawItems } = await getLaws()
  lawChapters.forEach(lawChapter => {
    lawChapter.chapters = lawItems.filter(lawItem => lawItem.chap_id == lawChapter.chap_id)
  })
  laws.forEach(law => {
    law.chapters = lawChapters.filter(lawChapter => lawChapter.law_id == law.law_id)
  })

  ctx.body = { laws }
  next()
}

// 获取公交车信息
module.exports.getBuses = async (ctx, next) => {
  const { buses } = await getBuses(ctx.query.city)
  
  ctx.body = { buses }
  next()
}