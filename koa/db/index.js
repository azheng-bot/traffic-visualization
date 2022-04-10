const mysql = require("mysql")
const env = require("../utils/envConfig")
const { user, password, host, port, database } = env;

const conn = mysql.createConnection({
  user,
  password,
  host,
  database,
  port
})


module.exports = conn