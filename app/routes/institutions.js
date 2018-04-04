module.exports = function(application){
    application.get('/api/institutions', function(req, res){
        application.app.controllers.institutions.get(application, req, res);
    });
};
