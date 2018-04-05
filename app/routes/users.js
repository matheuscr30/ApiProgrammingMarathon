module.exports = function (application) {
    application.get('/teste', function (req, res) {
        res.render('form');
    });

    application.get('/api/users', function (req, res) {
        application.app.controllers.users.get(application, req, res);
    });

    application.get('/api/users/:cpf', function (req, res) {
        application.app.controllers.users.getByCpf(application, req, res);
    });

    application.post('/api/users', function (req, res) {
        application.app.controllers.users.post(application, req, res);
    });

    application.put('/api/users', function (req, res) {
        application.app.controllers.users.put(application, req, res);
    });

    application.get('/testEmail', function (req, res) {

    });
};
