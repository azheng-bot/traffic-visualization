const { getSigns } = require("../modules/sign")
const { getCities, getCityAdcode } = require("../modules/city")
const { getLaws } = require("../modules/law")
const { getBuses } = require("../modules/bus")
const { getTools } = require("../modules/tool")
const { getNews } = require("../modules/news")

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

// 获取城市adcode
module.exports.getCityAdcode = async (ctx, next) => {
  const { adcode } = await getCityAdcode(ctx.query.city)
  ctx.body = { adcode }
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
  let { buses } = await getBuses(ctx.query.city)
  buses = buses.filter(item => item.bus_name.search(/^\d+[\u4e00-\u9fa5]$/) != -1)
  ctx.body = { buses }
  next()
}

// 获取所有交通工具及其分类标签
module.exports.getTools = async (ctx, next) => {
  let { tools, toolLabels, toolCategaries, toolsWithLabels } = await getTools()

  tools.forEach(item => item.name = item.tool_name)
  toolLabels.forEach(item => item.name = item.label_name)
  toolCategaries.forEach(item => item.name = item.cate_name)

  // 给所有tool&label添加其对应tool
  toolsWithLabels.forEach(tl => {
    tl.tool = tools.find(toolItem => toolItem.tool_id == tl.tool_id)
  })
  // 根据tool&label，给所有label添加上其对应的tools
  toolLabels.forEach(labelItem => {
    let targetToolsWithLabels = toolsWithLabels.filter(tl => tl.label_id == labelItem.label_id) // 对应tool&label 
    labelItem.children = targetToolsWithLabels.map(tl => tl.tool) //对应tool
  })
  // 给所有categary添加上其对应的labels
  toolCategaries.forEach(cateItem => {
    cateItem.children = toolLabels.filter(labelItem => labelItem.cate_id && labelItem.cate_id == cateItem.cate_id)
  })

  ctx.body = {
    tools,
    categaries: toolCategaries
  }
  next()
}



// 获取所有新闻
module.exports.getNews = async (ctx, next) => {
  const {news,newsParagraphs}= await getNews()
  
  news.forEach(nItem => {
    nItem.paragraphs = newsParagraphs.filter(pItem => pItem.news_id == nItem.news_id )
  })

  ctx.body = { news }
  next()
}
