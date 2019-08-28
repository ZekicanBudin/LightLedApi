let mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://zekican:zekican@ledapidb-udcfo.mongodb.net/test?retryWrites=true&w=majority')

let textSchema = new mongoose.Schema({
  value : {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Text', textSchema)