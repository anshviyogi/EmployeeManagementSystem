const express = require('express')
const router = express.Router()
const db = require('../modal/connection')

router.get('/insert',(req,res)=>{
    res.render('addEmployee')
})

// Insert Employee

router.post('/insert',(req,res)=>{
    const user = {name:req.body.name,email:req.body.email,phone:req.body.phone,city:req.body.city}
    const sql = "INSERT INTO `users` SET ?"
    db.query(sql,user,(err,result)=>{
        if(err){
            res.render('databaseNotConnected')
        }
        else{
            console.log("Data Inserted Successfully")
        res.render('DataInsertedSuccessfully')
        }
    })
})

// Show all employees

router.get('/',(req,res)=>{
    const sql = "SELECT * FROM `users`"
    db.query(sql,(err,result)=>{
        if(err){
            res.render('databaseNotConnected')
        }
        else{
            res.render('EmployeeList',{rows:result})
        }
    })
})

//Show Delete Page
router.get('/delete',(req,res)=>{
  const sql = "SELECT * FROM users"
  db.query(sql,(err,result)=>{
    if(err){
        res.render('databaseNotConnected')
    }
    else{
        res.render('Delete',{rows:result})
    }
  })  
})

// Delete Employee
router.get('/finalDelete/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    let sql = `DELETE FROM users WHERE id=${id}`
    db.query(sql,(err,result)=>{
        if(err) console.log(err)
        else{
            res.render('DeleteSuccess')
        }
    })
})

// Show Update Page
router.get('/update',(req,res)=>{
    const sql = "SELECT * FROM users"
    db.query(sql,(err,result)=>{
        if(err) console.log(err)
        else res.render('update',{rows:result})
    })
})

// For update page

router.get('/detailUpdate/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    let sql = "SELECT * FROM users WHERE id=" + id
    db.query(sql,(err,result)=>{
        if(err){
            res.render('databaseNotConnected')
        }else{
            res.render('updateDetail',{emp:result[0]})
        }
    })
})

// Update Employee

router.post('/finalUpdate',(req,res)=>{
    const {name,email,phone,city,id} = req.body
    let sql = `UPDATE users SET name='${name}', phone='${phone}', email='${email}', city='${city}' where id=${parseInt(id)}`

    db.query(sql,(err,result)=>{
        if(err){
            res.render('databaseNotConnected')
        }else{
            res.render('UpdateSuccess')
        }
    })
})


module.exports = router