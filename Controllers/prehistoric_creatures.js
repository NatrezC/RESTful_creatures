const express = require('express');
const router = express.Router()
const fs = require('fs')
const methodOverride = require('method-override')

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

//------->get Edit route
router.get('/edit/:idx', (req, res)=>{
    //res.send(`you hit the GET edit route for dino# ${req.params.idx}`)
    let creatures = fs.readFileSync('./dinosaurs.json')
    let creatureData = JSON.parse(creatures)
    res.render('./prehistoric_creatures/edit', {p: creatureData[req.params.idx], creatureId: req.params.idx})
})

router.put('/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    //reassign the dino's fields to be tha which the user input
    creatureData[req.params.idx].type = req.body.type
    creatureData[req.params.idx].img_url = req.body.img_url
    // save the edited array to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})

//--------> delete Route
router.delete('/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    //remove the deleted dinosaur from the dinosaurs array
    creatureData.splice(req.params.idx, 1)

    //save the new dinosaurs to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    res.redirect('/prehistoric_creatures')
})


module.exports =  router;