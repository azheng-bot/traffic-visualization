const { getLaws } = require("../modules/law")


// 获取法律条文
module.exports.getLaws = async (ctx, next) => {
  const { laws, lawChapters, lawItems } = await getLaws()
  lawChapters.forEach(lawChapter => {
    lawChapter.items = lawItems.filter(lawItem => lawItem.chap_id == lawChapter.chap_id)
  })
  laws.forEach(law => {
    law.chapters = lawChapters.filter(lawChapter => lawChapter.law_id == law.law_id)
  })

  ctx.body = { laws }
  next()
}