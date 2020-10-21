const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')
const dinosaurs = require('./controllers/dinosaurs')
const prehistoric_creatures = require('./controllers/prehistoric_creatures')

//middleware section
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(ejsLayouts)
// body-parser middleware (it makes req.body work)
app.use(express.urlencoded({extended: false}))
app.use('/dinosaurs', dinosaurs)
app.use('/prehistoric_creatures', prehistoric_creatures)

app.get('/', (req, res)=>{
res.render('home')
})

app.listen(8000, ()=>{
    console.log('For the 100th time Im running!!!' )
})