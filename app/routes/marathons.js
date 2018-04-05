module.exports = function (application) {
    application.get('/api/marathons', function (req, res) {
        application.app.controllers.marathons.get(application, req, res);
    });

    application.post('/api/marathons', function (req, res) {
        application.app.controllers.marathons.post(application, req, res);
    });
};