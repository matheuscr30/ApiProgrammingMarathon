const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var institutionSchema = new Schema({
    nome: {type: String, required: true}
});
var Institution = mongoose.model("Institution", institutionSchema);

module.exports = Institution;