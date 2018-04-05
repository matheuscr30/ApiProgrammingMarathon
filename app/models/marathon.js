const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var marathonSchema = new Schema({
    nome: {type: String, required: true, unique: true},
    vagas: {type: Number, required: true},
    vagas_preenchidas: {type: Number, default: 0},
    edicao: {type: String, required: true, unique: true},
    data: {type: Date, required: true},
    local: {type: String, required: true}
});
var Marathon = mongoose.model("Marathon", marathonSchema);

module.exports = Marathon;