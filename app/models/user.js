const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {type: Number},
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    data_nascimento: {type: String, required: true},
    sexo: {type: String, required: true},  // NO form.html ta Number
    telefone: {type: String, required: true},
    rg: {type: String, required: true, unique: true},
    cpf: {type: String, required: true, unique: true},
    cep: {type: String, required: true},
    cidade: {type: String, required: true},
    estado: {type: String, required: true},
    bairro: {type: String, required: true},
    endereco: {type: String, required: true},
    instituicao: {type: String, required: true},
    curso: {type: String, required: true},
    matriculado: {type: Boolean},
    periodo: {type: Number},
    tam_camiseta: {type: String, required: true}, // NO form.html ta Number
    status: {
        type: String,
        enum: ['AGUARDANDO PAGAMENTO', 'PAGAMENTO CONFIRMADO', 'LISTA DE ESPERA'],

    }
});
var User = mongoose.model("User", userSchema);

module.exports = User;