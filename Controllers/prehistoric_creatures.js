const express = require('express');
const router = express.Router()

router.get('/creatureIndex', (req, res)=>{
    res.render('prehistoric_creatures/creatureIndex.ejs')
})

module.exports =  router;