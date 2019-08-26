let Led = require('../model/ledapi.model')
let express = require('express')
let router = express.Router()

//Getting all
router.get('/led', async (req,res) => {
    //res.send('Hello World')
    try {
        const leds = await Led.find()
        res.json(leds)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/led/:id', getLed, (req,res) => {
    res.json(res.led)
})

//Creating
router.post('/led/create', async (req,res) => {
    const led = new Led({
        red : req.body.red,
        green : req.body.green,
        blue : req.body.blue,
        yellow : req.body.yellow
    })
    try {
        const newLed = await led.save()
        res.status(201).json(newLed)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Updating
router.post('/led/update',getLed, async (req,res) => {
    if (req.body.red != null){
        res.led.red = req.body.red
    }
    if (req.body.green != null){
        res.led.green = req.body.green
    }
    if (req.body.blue != null){
        res.led.blue = req.body.blue
    }
    if (req.body.yellow != null){
        res.led.yellow = req.body.yellow
    }
    try{
        const updatedLed = await res.led.save()
        res.json(updatedLed)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Update with passed values
router.post('/led/update/:r/:g/:b/:y',getLed, async (req,res) => {
        res.led.red = req.params.r
        res.led.green = req.params.g
        res.led.blue = req.params.b
        res.led.yellow = req.params.y
    try{
        const updatedLed = await res.led.save()
        res.json(updatedLed)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Update by parameter
router.post('/led/:id',getLedByParam, async (req,res) => {
    if (req.body.red != null){
        res.led.red = req.body.red
    }
    if (req.body.green != null){
        res.led.green = req.body.green
    }
    if (req.body.blue != null){
        res.led.blue = req.body.blue
    }
    if (req.body.yellow != null){
        res.led.yellow = req.body.yellow
    }
    try{
        const updatedLed = await res.led.save()
        res.json(updatedLed)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Deleting
router.delete('/delete/:id',getLedByParam, async (req,res) => {
    if(id == "5d5fd45895f7a90b088be283"){
        res.json({message: 'Main led cannot be deleted'})
    }
    else{
    try{
        await res.led.remove()
        res.json({message: 'Deleted!'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
    }
})

async function getLed(req,res,next) {
    let led
    try{
        led = await Led.findById("5d5fd45895f7a90b088be283")
        if(led == null){
            return res.status(404).json({message: 'Cannot find'})
        }
    }catch(err){
        res.status(500).json({message: err.message })
    }

    res.led = led
    next()
}

async function getLedByParam(req,res,next) {
    let led
    try{
        led = await Led.findById(req.params.id)
        if(led == null){
            return res.status(404).json({message: 'Cannot find'})
        }
    }catch(err){
        res.status(500).json({message: err.message })
    }

    res.led = led
    next()
}

module.exports = router