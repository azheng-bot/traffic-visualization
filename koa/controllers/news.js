const { getNews } = require("../modules/news")


// 获取所有新闻
module.exports.getNews = async (ctx, next) => {
  const {news,newsParagraphs}= await getNews()
  
  news.forEach(nItem => {
    nItem.paragraphs = newsParagraphs.filter(pItem => pItem.news_id == nItem.news_id )
  })

  ctx.body = { news }
  next()
}
