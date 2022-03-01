const Router = require("koa-router")
const router = new Router()

const busControllers = require("../controllers/bus")
const cityControllers = require("../controllers/city")
const lawControllers = require("../controllers/law")
const newsControllers = require("../controllers/news")
const signControllers = require("../controllers/sign")
const toolControllers = require("../controllers/tool")

// 获取交通图标
router.get("/signs", signControllers.getSigns)
// 获取全国省市 
router.get("/cities", cityControllers.getCities)
// 获取城市adcode
router.get("/city/adcode", cityControllers.getCityAdcode)
// 获取法律条文
router.get("/laws", lawControllers.getLaws)
// 获取公交车信息
router.get("/buses", busControllers.getBuses)
// 获取所有交通工具及其分类标签
router.get("/tools", toolControllers.getTools)
// 获取所有新闻
router.get("/news", newsControllers.getNews)


module.exports = router 