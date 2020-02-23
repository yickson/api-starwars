let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CharacterSchema = Schema({
    name: String,
    last_name: String,
    date: {type: Date, default: Date.now()},
    image: String
});

module.exports = mongoose.model('Character', CharacterSchema);