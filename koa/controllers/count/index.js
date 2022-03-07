let fs = require("fs")
let path = require("path")

module.exports.getProvinceData = (ctx, next) => {
  let data = fs.readFileSync(path.join(__dirname,"../../json/",ctx.query.province+'.json') )
  data = JSON.parse(data)
  // fileStream.on('open', data => {
  //   console.log('open', data)
  // })
  // fileStream.on('data', data => {
  //   console.log('data', data)
  // })
  // fileStream.on('end', data => {
  //   console.log('end', data)
  // })
  // console.log('data', data)
  ctx.body = {
    data
  }

  next()
}