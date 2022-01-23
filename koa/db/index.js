const mysql = require("mysql")
const conn = mysql.createConnection({
  user:"traffic",
  password:"123456",
  host:"120.55.171.5",
  database:"traffic"
})