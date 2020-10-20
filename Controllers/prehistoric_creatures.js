const express = require('express');
const router = express.Router()
const fs = require('fs')

//------->prehistoric creatures index
router.get('/prehistoric_creatures', (req, res)=>{
    // take the text from prehistoric_creatures.json and store it in a variable
    let preCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(preCreatures) // convert the string to an array
    
    // handle a query string if there is one
    let typeFilter = req.query.type
    if(typeFilter){ // reassign creatureData to only be an array of creatures whose name matches the query string name (and make it ignore case)
        creatureData = creatureData.filter(creature=>{
            return creature.type.toLowerCase() === typeFilter.toLowerCase()
        })
    }
    res.render('prehistoric_creatures/index', {preCreatures: creatureData})
})

module.exports =  router;