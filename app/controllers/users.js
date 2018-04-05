const Marathon = require("../models/marathon");
const User = require("../models/user");
const path = require('path');
const ejs = require('ejs');

module.exports.get = function (application, req, res) {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(500).json({message: "There was a problem finding the users"});
        }

        if (users.length == 0)
            return res.status(204).json({message: "Users not found"});

        res.status(200).json(users);
    });
};

module.exports.getByCpf = function (application, req, res) {
    let cpf = req.params.cpf;
    if (cpf === '') return res.status(204).json({message: "The object you are looking for was not found"});

    User.find({cpf: cpf}, (err, user) => {
        if (err) {
            return res.status(500).json({message: "There was a problem finding the user"});
        }

        if (user.length == 0)
            return res.status(204).json({message: "User not Found"});

        res.status(200).json(user);
    });
};

module.exports.post = function (application, req, res) {
    let body = req.body;
    req.checkBody('nome', 'O campo Nome é obrigatório').notEmpty();
    req.checkBody('email', 'O campo Email é obrigatório').notEmpty();
    req.checkBody('email', 'Email Inválido').isEmail();
    req.checkBody('senha', 'O campo Senha é obrigatório').notEmpty();
    req.checkBody('data_nascimento', "O campo Data de Nascimento é obrigatório").notEmpty();
    req.checkBody('sexo', 'O campo Sexo é obrigatório').notEmpty();
    req.checkBody('telefone', 'O campo Telefone é obrigatório').notEmpty();
    req.checkBody('rg', 'O campo RG é obrigatório').notEmpty();
    req.checkBody('cpf', 'O campo CPF é obrigatório').notEmpty();
    req.checkBody('cep', 'O campo CEP é obrigatório').notEmpty();
    req.checkBody('cidade', 'O campo Cidade é obrigatório').notEmpty();
    req.checkBody('estado', 'O campo Estado é obrigatório').notEmpty();
    req.checkBody('bairro', 'O campo Bairro é obrigatório').notEmpty();
    req.checkBody('endereco', 'O campo Endereço é obrigatório').notEmpty();
    req.checkBody('instituicao', 'O campo Instituição é obrigatório').notEmpty();
    req.checkBody('curso', 'O campo Curso é obrigatório').notEmpty();
    req.checkBody('tam_camiseta', 'O campo Tamanho de Camiseta é obrigatório').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        let errorsVector = [];
        for (let i = 0; i < errors.length; i++) {
            errorsVector.push(errors[i].msg);
        }
        //console.log(errorsVector);
        return res.status(205).json({errors: errorsVector});
    }

    let user = new User({
        nome: body['nome'],
        email: body['email'],
        senha: body['senha'],
        data_nascimento: body['data_nascimento'],
        sexo: body['sexo'],
        telefone: body['telefone'],
        rg: body['rg'],
        cpf: body['cpf'],
        cep: body['cep'],
        cidade: body['cidade'],
        estado: body['estado'],
        bairro: body['bairro'],
        endereco: body['endereco'],
        instituicao: body['instituicao'],
        curso: body['curso'],
        matriculado: body['matriculado'],
        periodo: body['periodo'],
        tam_camiseta: body['tam_camiseta'],
        status: body['status']
    });

    let atualMarathon;
    Marathon.find({"nome" : "18ª MARATONA DE PROGRAMAÇÃO"}, (err, marathon) => {
        if(err) console.log(err);

        atualMarathon = marathon[0];
        //console.log(marathon[0]);

        if(atualMarathon['vagas_preenchidas'] + 1 <= atualMarathon['vagas']){
            Marathon.findByIdAndUpdate(atualMarathon['_id'], {$inc: {vagas_preenchidas:1}}, (err, result) => {
                if(err) console.log(err);

                //console.log(result);
            });
        } else {
            user.status = "LISTA DE ESPERA";
        }

        user.save(function (err, result) {
            if (err) {
                //console.log(err);
                if (err.name == "ValidationError")
                    res.status(500).json({errors : err.errors});
                else if (err.code === 11000)
                    res.status(209).json({message: "User already exists"});
            } else {
                //console.log(result);
                res.status(200).json(result);

                if(result.status == "LISTA DE ESPERA") return;

                let filePath = path.join(path.dirname(__dirname), 'views/');
                let imagesPath = path.join(path.dirname(__dirname), 'public/', 'images/');

                if(result.status == "AGUARDANDO PAGAMENTO") {
                    ejs.renderFile(filePath + 'confirmationEmail.ejs', {}, (err, data) => {
                        if (err) console.log(err);
                        else {
                            let attachments = [
                                {
                                    filename: '18a.png',
                                    path: imagesPath + '18a.png',
                                    cid: '18a.png'
                                },
                                {
                                    filename: 'letter.png',
                                    path: imagesPath + 'letter.png',
                                    cid: 'letter.png'
                                }
                            ];

                            application.locals.sendEmail("Inscrição Maratona de Programação", result['email'], data, attachments);
                        }
                    });
                }
            }
        });
    });
};

module.exports.put = function (application, req, res) {
    /*
    let cpf = req.params.cpf;
    if (cpf === '') return res.status(404).json({message: "The object you are looking for was not found"});

    let body = req.body;
    req.checkBody('nome', 'Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();
    req.checkBody('email', 'Invalid Email').isEmail();

    let errors = req.validationErrors();

    if (errors) {
        let errorsVector = [];
        for (let i = 0; i < errors.length; i++) {
            errorsVector.push(errors[i].msg);
        }
        return res.status(503).json({errors: errorsVector});
    }
    */
};
