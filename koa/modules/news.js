const query = require("../utils/query")


module.exports.getNews = async  () => {
  let news  = await query("select * from news")
  let newsParagraphs = await query("select * from news_paragraph")

  return {news,newsParagraphs}
}