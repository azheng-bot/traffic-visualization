const fs = require("fs")
const path = require("path")
const { env } = require("process")

let envStr = fs.readFileSync(path.join(__dirname, '../', '.env')).toString('utf-8')

function getConfig() {
  let envConfig = {}
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

module.exports = getConfig;