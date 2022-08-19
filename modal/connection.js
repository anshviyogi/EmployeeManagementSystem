const mysql = require('mysql')

const db = mysql.createConnection({
    user:"root",
    password:"",
    database:"ems",
    host:"localhost"
})

db.connect(err =>{
    if(err) console.log(err)
    else console.log("Database Connected Successfully")
})

module.exports = db