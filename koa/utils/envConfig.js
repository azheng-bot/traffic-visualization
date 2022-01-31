const fs = require("fs")
const path = require("path")

// env字符串
let envStr = fs.readFileSync(path.join(__dirname, '../', '.env')).toString('utf-8')

function getConfig() {
  let envConfig = {}
  // 把字符串格式化成对象
  envStr
    .split('\n')
    .filter(configStr => configStr.trim() != '')
    .forEach(configStr => {
      let config = configStr.split('=')
      let k = config[0].trim().replace(/^[\'|\"]$/g, '');
      let v = config[1].trim().replace(/^[\'|\"]$/g, '');
      envConfig[k] = v
    })
  return envConfig
}

module.exports = getConfig();