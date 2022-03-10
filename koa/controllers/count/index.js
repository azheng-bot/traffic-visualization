let fs = require("fs")
let path = require("path")

// 1.获取省份详细数据
module.exports.getProvinceData = (ctx, next) => {
  let data = fs.readFileSync(path.join(__dirname, "../../json/", ctx.query.province + '.json'))

  data = JSON.parse(data)

  ctx.body = { data }

  next()
}

// 1.获取省份详细数据
module.exports.getCountryData = (ctx, next) => {
  let data = fs.readFileSync(path.join(__dirname, "../../json/全国.json"))

  data = JSON.parse(data)

  ctx.body = { data }

  next()
}