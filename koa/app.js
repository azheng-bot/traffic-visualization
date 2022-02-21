const PORT = 8000;

const Koa = require('koa');
const app = new Koa();

// 跨域问题
const cors = require("koa-cors")
app.use(cors())

const fs = require('fs')
// let images = fs.readdirSync("../react/image/traffic-tool")
// images = images.map(item => item.substr(0,item.length-4))
let images = [
  'ufo', '双层巴士', '地铁',
  '小汽车', '巴士', '帆船',
  '沙滩摩托', '游轮', '潜艇',
  '火箭', '火车', '热气球',
  '电动摩托车', '直升机', '缆车',
  '自行车', '货车', '货轮',
  '面包车', '飞机', '飞艇',
  '高铁', '黄包车'
]
let categories = ['行驶区域', '形态','其他']
let labels = [['水路', '陆路', '航空',],['大型','中型','小型'],['']]



// 路由        
const routers = require("./routers/index")
app.use(routers.routes());

app.listen(PORT, () => {
  console.log(`Listen to http://localhost:${PORT}`);
});