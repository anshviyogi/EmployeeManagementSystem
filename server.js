const express = require('express')
const app = express()
const db = require('./modal/connection')
const engine = require('express-handlebars').engine

// Handle bars middlewares
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/connect/database',(req,res)=>{
    res.render('databaseInfo')
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/employee',require('./controllers/members'))

const PORT = 2000
app.listen(2000,()=>console.log(`Server is running at ${PORT}`))