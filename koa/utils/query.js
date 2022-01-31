const conn = require("../db/index")

module.exports = (sql) => new Promise((resolve, reject) => {
  conn.query(sql, (err, res) => {
    if (err) {
     return reject(err)
    } else {
      return resolve(res)
    }
  })
})
