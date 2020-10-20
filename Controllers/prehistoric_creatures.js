const express = require('express');
const router = express.Router()
const fs = require('fs')

//------->prehistoric creatures index
router.get('/', (req, res)=>{
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

// ----> DINO NEW ROUTE <------
router.get('/new', (req, res)=>{
    res.render('prehistoric_creatures/new')
})

// ----> DINO SHOW ROUTE <------
router.get('/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    // get array index from url parameter
    let creatureIndex = req.params.idx
    console.log(creatureData[creatureIndex])
    res.render('prehistoric_creatures/show', {creature: creatureData[creatureIndex], creatureId: creatureIndex})
})

// ----> precreatures POST ROUTE <------
router.post('/', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    creatureData.push(req.body) // push the new dino to the array
    // save the new dinoData array to the dinosaurs.json file
    // JSON.stringify does the opposite of JSON.parse
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    // redirect to the GET /dinosaurs route (index)
    res.redirect('/prehistoric_creatures')
})


module.exports =  router;