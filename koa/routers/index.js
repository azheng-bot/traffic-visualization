const Router = require("koa-router")
const router = new Router()

const controller = require("../controller/index")

// 获取交通图标
router.get("/signs", controller.getSigns)
// 获取全国省市
router.get("/cities", controller.getCities)


module.exports = router