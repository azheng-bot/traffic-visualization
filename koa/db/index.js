const mysql = require("mysql")
const conn = mysql.createConnection({
  user:"root",
  password:"root",
  host:"120.55.55.55",
  database:"traffic"
})