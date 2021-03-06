let express = require('express')
let app = express()
let ledRoute = require('./controller/led')
let path = require('path')
let bodyParser = require('body-parser')
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain)
var jsonParser = bodyParser.json()
app.use(bodyParser.json())  

app.use((req,res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})
app.use(ledRoute)
app.use(express.static('view'))

app.post('/led/update', jsonParser, function (req, res) {
    console.log(req.body);
    console.log('Send button clicked');
  })

// //Handler for 500
app.use((err,req,res,next) => {
  console.error(err.stack)
  res.sendFile(__dirname + '/view/500.html')
})
//404 Handler
app.get("*", function(req,res){
res.sendFile(__dirname + '/view/404.html');
})

const PORT = process.env.PORT || 2019
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))