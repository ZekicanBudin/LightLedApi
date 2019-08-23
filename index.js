let express = require('express')
let app = express()
let ledRoute = require('./controller/led')
let path = require('path')
let bodyParser = require('body-parser')

app.use(bodyParser.json())  

app.use((req,res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})
app.use(ledRoute)
app.use(express.static('view'))

//Handler for 404
app.use((req,res,next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, './view/404.html'))
})
//Handler for 500
app.use((err,req,res,next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, './view/500.html'))
})


const PORT = process.env.PORT || 2019
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))