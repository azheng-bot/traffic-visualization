let fs = require("fs")
let path = require("path")

// 1.获取省份详细数据
module.exports.getProvinceData = (ctx, next) => {
  let filePath = path.join(__dirname, "../../json/", ctx.query.province + '.json')

  fs.openSync(filePath)
  let data = fs.readFileSync(filePath)
  console.log('111', 111)
  data = JSON.parse(data)
  ctx.body = { data }

  fs.closeSync(0)
  next()  
}

// 2.获取全国数据
module.exports.getCountryData = (ctx, next) => {
  let filePath = path.join(__dirname, "../../json/全国.json")

  fs.openSync(filePath)
  let data = fs.readFileSync(filePath)
  data = JSON.parse(data )
  ctx.body = { data }

  fs.closeSync(0)
  next()
}