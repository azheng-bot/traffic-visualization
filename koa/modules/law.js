const query = require("../utils/query")


module.exports.getLaws = async  () => {
  let laws = await query("select * from law")
  let lawChapters = await query("select * from law_chapter")
  let lawItems = await query("select * from law_item")

  return {laws,lawChapters,lawItems}
}