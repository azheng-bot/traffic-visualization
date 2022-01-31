const query = require("../utils/query")


module.exports.getSigns = async  () => {
  let signs = await query("select * from sign")
  let signCategaries = await query("select * from sign_category")

  return {signs,signCategaries}
}