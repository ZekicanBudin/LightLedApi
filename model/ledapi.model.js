let mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://zekican:zekican@ledapidb-udcfo.mongodb.net/test?retryWrites=true&w=majority')

let ledSchema = new mongoose.Schema({

/*

  data : {
    color : string
    value : boolen
  }
  */
  red : {
    type: Boolean,
    required: true
  },
  green : {
    type: Boolean,
    required: true
  },
  yellow : {
    type: Boolean,
    required: true
  },
  blue : {
    type: Boolean,
    required: true
  } 
})

module.exports = mongoose.model('Led', ledSchema)
/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@stajmigapi-brdl6.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
module.exports = 
*/