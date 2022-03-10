const Router = require("koa-router")
const router = new Router()

const busControllers = require("../controllers/bus")
const cityControllers = require("../controllers/city")
const lawControllers = require("../controllers/law")
const newsControllers = require("../controllers/news")
const signControllers = require("../controllers/sign")
const toolControllers = require("../controllers/tool")
const countControllers = require("../controllers/count/index")

// 1. 获取交通图标
router.get("/signs", signControllers.getSigns)

// 2.1 获取全国省市 
router.get("/cities", cityControllers.getCities)
// 2.2 获取城市adcode
router.get("/city/adcode", cityControllers.getCityAdcode)

// 3. 获取法律条文
router.get("/laws", lawControllers.getLaws)

// 4. 获取公交车信息
router.get("/buses", busControllers.getBuses)

// 5. 获取所有交通工具及其分类标签
router.get("/tools", toolControllers.getTools)

// 6. 获取所有新闻
router.get("/news", newsControllers.getNews)

// 7 获取统计数据
// 7.1 某省数据
// router.get('/count/province',provinceCountControllers.getProvinceData)
router.get('/count/province',countControllers.getProvinceData)
// 7.2 全国数据
router.get('/count/country',countControllers.getCountryData)

 


module.exports = router 