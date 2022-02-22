const Router = require("koa-router")
const router = new Router()

const controllers = require("../controllers/index")

// 获取交通图标
router.get("/signs", controllers.getSigns)
// 获取全国省市 
router.get("/cities", controllers.getCities)
// 获取城市adcode
router.get("/city/adcode", controllers.getCityAdcode)
// 获取法律条文
router.get("/laws", controllers.getLaws)
// 获取公交车信息
router.get("/buses", controllers.getBuses)
// 获取所有交通工具及其分类标签
router.get("/tools", controllers.getTools)
// 获取所有新闻
router.get("/news", controllers.getNews)


module.exports = router 