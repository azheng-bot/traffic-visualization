const PORT = 8000;

const Koa = require('koa');
const app = new Koa();

// 跨域问题
const cors = require("koa-cors")
app.use(cors())

    
 
// 路由          
const routers = require("./routers/index")
app.use(routers.routes());
 
app.listen(PORT, () => {
  console.log(`Listen to http://localhost:${PORT}`);
});                   