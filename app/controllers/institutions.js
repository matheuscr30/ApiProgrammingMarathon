const Institution = require("../models/institution");

module.exports.get = function (application, req, res) {
    Institution.find({}, (err, institutions) => {
        if (err) {
            return res.status(500).json({message: "There was a problem finding the institutions"});
        }

        if (institutions.length == 0)
            return res.status(500).json({message: "Institutions not found"});

        res.status(200).json(institutions);
    });
};