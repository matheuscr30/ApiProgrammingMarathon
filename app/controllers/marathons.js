const Marathon = require('../models/marathon');

module.exports.get = function (application, req, res) {
    Marathon.find({}, (err, marathons) => {
        if (err) {
            return res.status(500).json({message: "There was a problem finding the marathons"});
        }

        if (marathons.length == 0)
            return res.status(500).json({message: "Marathons not found"});

        res.status(200).json(marathons);
    });
};

module.exports.post = function (application, req, res) {
    let body = req.body;
    req.checkBody('nome', 'O campo Nome é obrigatório').notEmpty();
    req.checkBody('vagas', 'O campo Vagas é obrigatório').notEmpty();
    req.checkBody('edicao', 'O campo Edicao é obrigatório').notEmpty();
    req.checkBody('data', "O campo Data é obrigatório").notEmpty();
    req.checkBody('local', 'O campo Local é obrigatório').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        let errorsVector = [];
        for (let i = 0; i < errors.length; i++) {
            errorsVector.push(errors[i].msg);
        }
        return res.status(503).json({errors: errorsVector});
    }

    let marathon = new Marathon({
        nome: body['nome'],
        vagas: body['vagas'],
        data: body['data'],
        edicao: body['edicao'],
        local: body['local']
    });

    marathon.save(function (err, result) {
        if (err) {
            //console.log(err);
            if (err.name == "ValidationError")
                res.status(500).json({errors : err.errors});
            else if (err.code === 11000)
                res.status(409).json({message: "Marathon already exists"});
        } else {
            //console.log(result);
            res.status(200).json(result);
        }
    });
};