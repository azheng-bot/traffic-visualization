const { getSigns } = require("../modules/sign")

module.exports.getSigns = async (ctx, next) => {
  const { signs, signCategaries } = await getSigns()
  signCategaries.map(categary => {
    categary.signList = signs.filter(sign => sign.cate_id == categary.cate_id)
  })

  ctx.body = { signCategaries ,signs}
  next()
}