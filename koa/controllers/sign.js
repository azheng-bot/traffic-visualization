const { getSigns } = require("../modules/sign")


// 获取交通图标
module.exports.getSigns = async (ctx, next) => {
  const { signs, signCategaries } = await getSigns()
  signCategaries.forEach(categary => {
    categary.signList = signs.filter(sign => sign.cate_id == categary.cate_id)
  })

  ctx.body = { signCategaries, signs }
  next()
}
