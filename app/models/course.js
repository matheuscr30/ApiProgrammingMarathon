const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var courseSchema = new Schema({
    nome_instituicao: {type: String, required: true},
    nome: {type: String, required: true}
});
var Course = mongoose.model("Course", courseSchema);

module.exports = Course;