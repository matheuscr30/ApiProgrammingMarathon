const Course = require("../models/course");

module.exports.get = function (application, req, res) {
    let nome_instituicao = req.params.nome_instituicao;
    if (nome_instituicao === '') return res.status(404).json({message: "The object you are looking for was not found"});

    Course.find({nome_instituicao : nome_instituicao}, (err, courses) => {
        if (err) {
            return res.status(500).json({message: "There was a problem finding the courses"});
        }

        if (courses.length == 0)
            return res.status(204).json({message: "Courses not Found"});

        res.status(200).json(courses);
    });
};