const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db_blockchain', {useNewUrlParser:true});
mongoose.Promise = global.Promise;

module.exports = mongoose;