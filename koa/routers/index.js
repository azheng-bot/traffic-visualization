const Router = require("koa-router")
const router = new Router()

const controller = require("../controller/index")

// 获取交通图标
router.get("/signs", controller.getSigns)
// 获取全国省市
router.get("/cities", controller.getCities)
// 获取城市adcode
router.get("/city/adcode", controller.getCityAdcode)
// 获取法律条文
router.get("/laws", controller.getLaws)
// 获取公交车信息
router.get("/buses", controller.getBuses)


module.exports = router 