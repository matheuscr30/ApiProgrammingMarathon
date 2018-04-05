const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const express = require('express');
const consign = require('consign');

mongoose.Promise = require('bluebird'); //Fix Deprecated Error
mongoose.connect('mongodb://localhost:27017/maratona');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user:'maratonaalgar@gmail.com',
        clientId:'296578556298-gt177b6ilu05h8d6ug0nr9f68a71ltnr.apps.googleusercontent.com',
        clientSecret:'ldhWbYld4L2mlIbFoCl_UEM7',
        refreshToken:'1/uVeRLgzqQb96pWQbCWHodInbw03VAqlCb0UqaMW1-x04izkckDEWJ5jnWAgYeBOj',
        accessToken: 'ya29.GluUBWvgS0r2TTxQ-TkzpZAqgaMU6mtTaUYoYnEpFfoOLa3kZJ_dgBZC-Ujaj48rjs7yB9VkMv6OgcYBXhwS_Il0Fs7taslFYrT67UUjw7yuC52qN8fIBmRpVlBo',
        expires: 1484314697598
    }
});

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* configurar o middleware express-validator */
app.use(expressValidator());

//Preflight Request
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.locals.sendEmail = function (subject, destinatary, data, attachments = []) {
    var mailOptions = {
        from: 'maratonaalgar@gmail.com',
        to: destinatary,
        subject: subject,
        html: data,
        attachments: attachments
    };

    transporter.sendMail(mailOptions, function (err, res) {
        if(err){
            console.log(err);
            console.log('Error');
        } else {
            console.log('Email Enviado');
        }
    });
};

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app */
module.exports = app;
