const mysql = require("mysql")
const env = require("../utils/envConfig")
const { user, password, host, port, database } = env;



module.exports = (sql) => new Promise((resolve, reject) => {
  const conn = mysql.createConnection({
    user,
    password,
    host,
    database,
    port
  })
  conn.connect();
  conn.query(sql, (err, res) => {
    if (err) {
      return reject(err)
    } else {
      return resolve(res)
    }
  })
  conn.end();
})
