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
router.get('/:id', getLed, (req,res) => {
    res.json(res.led)
})

//Creating
router.post('/create', async (req,res) => {
    const led = new Led({
        code : req.body.code
    })
    try {
        const newLed = await led.save()
        res.status(201).json(newLed)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Updating
router.patch('/:id',getLed, async (req,res) => {
    if (req.body.code != null){
        res.led.code = req.body.code
    }
    try{
        const updatedLed = await res.led.save()
        res.json(updatedLed)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Deleting
router.delete('/:id',getLed, async (req,res) => {
    try{
        await res.led.remove()
        res.json({message: 'Deleted!'})
    }catch(err){
        res.status(500).json({message: err.message})
    }

})

async function getLed(req,res,next) {
    let led
    try{
        led = await Led.findById(req.params.id)
        if(led == null){
            return res.status(404).json({message: 'Cannot find subscriber'})
        }
    }catch(err){
        res.status(500).json({message: err.message })
    }

    res.led = led
    next()
}

module.exports = router