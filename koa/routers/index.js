const Router = require("koa-router")
const router = new Router()

const controller = require("../controller/index")

router.get("/signs",controller.getSigns)


module.exports = router