const PORT = 8000;

const Koa = require('koa');
const app = new Koa();
const routers = require("./routers/index")

app.use(routers.routes());

app.listen(PORT, () => {
  console.log(`Listen to http://localhost:${PORT}`);
});