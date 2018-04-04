module.exports = function(application){
    application.get('/api/courses/:nome_instituicao', function(req, res){
        application.app.controllers.courses.get(application, req, res);
    });
};
